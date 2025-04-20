import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { SkillOptions } from "@/constants/dropdowns/skills";
import { Skill } from "@/interfaces/templates";

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (!skills?.length) return null;
  return (
    <section id="skills">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const skillOption = SkillOptions.find((option) => option.value === skill.title);
              return (
                <Badge key={index} variant="secondary">
                  {skillOption?.label} • {skill.level}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
