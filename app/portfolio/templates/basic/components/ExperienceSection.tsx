import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  location: string;
  start: string;
  finish: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <div id="experience">
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
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
