import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code, LinkIcon } from "lucide-react";
import { Project } from "@/interfaces/templates";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <div id="projects">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Projects</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.company}</p>
                  <p className="text-sm text-gray-500">
                    {project.start} - {project?.finish || "Present"}
                  </p>
                  <p className="mt-2">{project.description}</p>
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className={cn(
                        "inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-4"
                      )}
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>View Project</span>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
