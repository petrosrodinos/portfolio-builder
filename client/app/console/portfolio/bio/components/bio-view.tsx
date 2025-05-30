"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/auth";
import { getProfile } from "services/profile";
import { FileText, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceSkeleton from "@/components/ui/experience-skeleton";

interface BioViewProps {
  onEdit: () => void;
}

export default function BioView({ onEdit }: BioViewProps) {
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
          Edit Bio
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Role</h3>
        <p className="text-sm text-muted-foreground">{data?.role || "No role specified"}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Years of Experience</h3>
        <p className="text-sm text-muted-foreground">{data?.years_of_experience || "No years of experience specified"}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Bio</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{data?.bio || "No bio provided"}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Resume</h3>
        {data?.resume ? (
          <a href={data.resume.url as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <FileText className="h-4 w-4" />
            <span>View resume</span>
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">No resume provided</p>
        )}
      </div>
    </div>
  );
}
