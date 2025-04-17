"use client";

import React from "react";
import { Pencil, Trash2, MapPin, Building2, Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockExperiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    start: "2020-01",
    finish: "Present",
    description: "Led development of core platform features and mentored junior developers.",
  },
  {
    id: 2,
    title: "Software Developer",
    company: "StartUp Inc",
    location: "New York, NY",
    start: "2018-06",
    finish: "2019-12",
    description: "Developed and maintained multiple web applications using React and Node.js.",
  },
];

const ExperienceView = () => {
  const handleEdit = (id: number) => {
    console.log("Edit experience:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete experience:", id);
  };

  const handleAdd = () => {
    console.log("Add new experience");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {mockExperiences.map((experience) => (
        <Card key={experience.id} className="group">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                {experience.title}
              </h3>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(experience.id)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit experience</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(experience.id)}
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
      ))}
    </div>
  );
};

export default ExperienceView;
