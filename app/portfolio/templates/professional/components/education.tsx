import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Education } from "@/interfaces/templates";
import { cn } from "@/lib/utils";
import { GraduationCap, LinkIcon } from "lucide-react";
import Link from "next/link";
interface EducationSectionProps {
  education: Education[];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  if (!education?.length) return null;
  return (
    <section id="education">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
        </CardHeader>
        <CardContent>
          {education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-xl font-semibold">{edu.title}</h3>

              {edu.institution && <p className="text-gray-600">{edu.institution}</p>}
              <p className="text-sm text-gray-500">
                {edu.start} - {edu?.finish || "Present"}
              </p>
              {edu.description && <p className="mt-2">{edu.description}</p>}
              {edu.link && (
                <Link
                  href={edu.link}
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
