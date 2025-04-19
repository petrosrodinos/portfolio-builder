import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";
import { LanguagesOptions } from "@/constants/dropdowns/languages";
import * as icons from "country-flag-icons/react/3x2";

interface Language {
  title: string;
  level: string;
}

interface LanguagesSectionProps {
  languages: Language[];
}

export const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  return (
    <div id="languages">
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
              const languageOption = LanguagesOptions.find(
                (option) => option.value === language.title
              );
              const Icon = icons[languageOption?.iconCode as keyof typeof icons];
              return (
                <Badge key={index} variant="secondary">
                  <Icon className="w-4 h-4 mr-2" />
                  {languageOption.label} • {language.level}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
