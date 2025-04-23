import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Experience } from "@/interfaces/templates";
import { Briefcase, LinkIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  if (!experiences?.length) return null;
  return (
    <section id="experience">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Experience</h2>
          </div>
        </CardHeader>
        <CardContent>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-gray-600">
                {exp.company} • {exp.location}
              </p>
              <p className="text-sm text-gray-500">
                {exp.start} - {exp?.finish || "Present"}
              </p>
              <p className="mt-2">{exp.description}</p>
              {exp.link && (
                <Link
                  href={exp.link}
                  target="_blank"
                  className={cn(
                    "inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-2"
                  )}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>View Link</span>
                </Link>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default ExperienceSection;
