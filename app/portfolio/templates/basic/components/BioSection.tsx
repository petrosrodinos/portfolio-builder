import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";

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
          <Button className="mt-4" variant="outline" onClick={() => window.open(resume, "_blank")}>
            <LinkIcon className="mr-2 h-4 w-4" />
            View Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
