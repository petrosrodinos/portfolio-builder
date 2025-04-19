import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

interface BioSectionProps {
  bio: string;
  resume: string;
}

export const BioSection = ({ bio, resume }: BioSectionProps) => {
  return (
    <div id="about">
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold">About Me</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{bio}</p>
          <Link className="mt-4" href={resume} target="_blank">
            <LinkIcon className="mr-2 h-4 w-4" />
            View Resume
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
