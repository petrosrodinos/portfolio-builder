import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface Education {
  title: string;
  institution: string;
  start: string;
  finish: string;
  description?: string;
}

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <div id="education">
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
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {edu.start} - {edu?.finish || "Present"}
              </p>
              {edu.description && <p className="mt-2">{edu.description}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
