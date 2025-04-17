import ContentSection from "@/components/content-section";
import React from "react";
import ProjectView from "./components/project-view";

const Projects = () => {
  return (
    <ContentSection title="Projects" desc="Add your projects here.">
      <ProjectView />
    </ContentSection>
  );
};

export default Projects;
