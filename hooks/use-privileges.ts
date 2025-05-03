import { useAuthStore } from "@/stores/auth";
import { Privileges } from "@/constants/privileges";
import { toast } from "@/hooks/use-toast";


type PrivilegeType = 'experiences' | 'projects' | 'services' | 'education' | 'skills' | 'links' | 'languages' | 'publications' | 'awards' | 'achievements' | 'photo_collection' | 'publications' | 'blog';

export const usePrivileges = () => {
    const { plan } = useAuthStore();


    const canCreateRecord = (type: PrivilegeType, currentCount: number) => {
        if (Privileges[plan]?.[type] > currentCount) return true;

        toast({
            title: `You have reached the maximum number of ${type} records`,
            description: "You can upgrade to a higher plan to create more.",
        });

        return false;
    }

    return {
        canCreateRecord,
    }

};


