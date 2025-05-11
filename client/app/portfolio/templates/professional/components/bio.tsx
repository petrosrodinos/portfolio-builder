import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BioSectionProps } from "@/interfaces/templates";

const Bio = ({ bio, resume }: BioSectionProps) => {
  if (!bio && !resume) {
    return null;
  }

  return (
    <section id="about">
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold">About Me</h2>
        </CardHeader>
        <CardContent>
          {bio && <p className="text-gray-700">{bio}</p>}
          {resume && (
            <Link
              href={resume}
              target="_blank"
              className={cn(
                "inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-4"
              )}
            >
              <LinkIcon className="h-4 w-4" />
              <span>View Resume</span>
            </Link>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Bio;
