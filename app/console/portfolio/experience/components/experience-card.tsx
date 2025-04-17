import React from "react";
import { Pencil, Trash2, MapPin, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortfolioExperience } from "interfaces/portfolio";

interface ExperienceCardProps {
  experience: PortfolioExperience;
  onEdit: (experience: PortfolioExperience) => void;
  onDelete: (experience: PortfolioExperience) => void;
}

const ExperienceCard = ({ experience, onEdit, onDelete }: ExperienceCardProps) => {
  return (
    <Card className="group">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold leading-none tracking-tight">{experience.title}</h3>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(experience)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit experience</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(experience)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete experience</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{experience.company}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{experience.location}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {experience.start} - {experience.finish}
          </span>
        </div>

        <p className="text-muted-foreground">{experience.description}</p>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
