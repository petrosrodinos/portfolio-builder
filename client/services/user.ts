import { createClient } from "@/lib/supabase/client";
import { UpdateUser, User, UserAvatar } from "interfaces/user";
import { SupabaseBuckets, SupabaseTables } from "@/constants/supabase";
import { deleteFile, uploadFile } from "./storage";
import { getAffiliateCodeByCode } from "./affiliate";

const supabase = createClient();

export const upsertUser = async (
    payload: UpdateUser,
    referral_code?: string,
): Promise<User> => {
    try {
        let avatar = payload.avatar as UserAvatar;

        if (payload.avatar_to_delete) {
            const { error } = await supabase
                .storage
                .from(SupabaseBuckets.files)
                .remove([payload.avatar_to_delete.name]);

            if (error) {
                throw error;
            }
        }

        if (payload.avatar && !("url" in payload.avatar)) {
            const name = `avatar-${payload.user_id}-${Date.now()}`;
            const { data, error } = await supabase
                .storage
                .from(SupabaseBuckets.files)
                .upload(name, payload.avatar as File, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (error) {
                throw error;
            }

            const { data: { publicUrl } } = supabase
                .storage
                .from(SupabaseBuckets.files)
                .getPublicUrl(data.path);
            avatar = {
                name,
                url: publicUrl,
            };
        }

        delete payload.avatar_to_delete;

        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .upsert({ ...payload, avatar }, { onConflict: "user_id" }).select()
            .single();

        try {
            if (referral_code && referral_code !== "null") {
                const affiliateCode = await getAffiliateCodeByCode(
                    referral_code,
                );
                console.log("affiliateCode", affiliateCode);
                if (affiliateCode) {
                    await supabase.from(SupabaseTables.referred_users).insert({
                        user_id: data.user_id,
                        referal_user_id: affiliateCode.user_id,
                    });
                }
            }
        } catch (error) {
        }

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
};

export const getUser = async (user_id: string): Promise<User> => {
    try {
        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .select("*")
            .eq("user_id", user_id)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .select("*,subscriptions(*,prices(*,products(*)))");

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
};
