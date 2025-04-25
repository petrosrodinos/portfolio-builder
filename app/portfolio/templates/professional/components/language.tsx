import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";
import { Language } from "@/interfaces/templates";
import { getLanguageLabelAndIcon } from "@/lib/utils";

interface LanguagesSectionProps {
  languages: Language[];
}

const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  if (!languages?.length) return null;
  return (
    <section id="languages">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Languages</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map((language, index) => {
              const { label, Icon } = getLanguageLabelAndIcon(language);
              return (
                <Badge key={index} variant="secondary">
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {label}
                  {language?.level && `• ${language?.level}`}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LanguagesSection;
