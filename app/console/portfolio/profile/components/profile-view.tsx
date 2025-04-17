"use client";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/profile";
import { useAuthStore } from "stores/auth";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface ProfileViewProps {
  onEdit: () => void;
}

export default function ProfileView({ onEdit }: ProfileViewProps) {
  const { user_id } = useAuthStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user_id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner show={isLoading} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">Email</h3>
        <p className="text-sm text-muted-foreground">{data.email}</p>
      </div>
      <div>
        <h3 className="font-medium">Phone</h3>
        <p className="text-sm text-muted-foreground">{data.phone}</p>
      </div>
      <div>
        <h3 className="font-medium">Address</h3>
        <p className="text-sm text-muted-foreground">{data.address}</p>
      </div>
      <div>
        <h3 className="font-medium">Welcome Message</h3>
        <p className="text-sm text-muted-foreground">{data.welcome_message}</p>
      </div>
      <div className="flex justify-start pt-4">
        <Button variant="secondary" size="sm" onClick={onEdit} className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
