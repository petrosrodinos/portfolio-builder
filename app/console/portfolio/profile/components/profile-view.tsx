"use client";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/profile";
import { useAuthStore } from "stores/auth";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ExperienceSkeleton from "@/components/ui/experience-skeleton";
interface ProfileViewProps {
  onEdit: () => void;
}

export default function ProfileView({ onEdit }: ProfileViewProps) {
  const { user_id } = useAuthStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user_id),
    enabled: !!user_id,
    retry: false,
  });

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={onEdit} className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {data && !isLoading && (
        <>
          <div>
            <h3 className="font-medium">Vanity URL</h3>
            <p className="text-sm text-muted-foreground">{data.vanity_url || "No vanity URL"}</p>
          </div>
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">{data?.email || "No email"}</p>
          </div>
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-sm text-muted-foreground">{data?.phone || "No phone"}</p>
          </div>
          <div>
            <h3 className="font-medium">Address</h3>
            <p className="text-sm text-muted-foreground">{data?.address || "No address"}</p>
          </div>
          <div>
            <h3 className="font-medium">Welcome Message</h3>
            <p className="text-sm text-muted-foreground">
              {data?.welcome_message || "No welcome message"}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Booking Link</h3>
            <p className="text-sm text-muted-foreground">
              {data?.booking_link || "No booking link"}
            </p>
          </div>
        </>
      )}
      {!data && !isLoading && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Profile Incomplete</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>Please complete your profile information to get started.</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="flex items-center gap-2 w-fit"
            >
              <Pencil className="h-4 w-4" />
              Complete Your Profile
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
