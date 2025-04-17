import ContentSection from "@/components/content-section";
import React from "react";
import ExperienceForm from "./components/experience-form";
import ExperienceView from "./components/experience-view";

const Experience = () => {
  return (
    <ContentSection title="Experience" desc="Add your experience details here.">
      <ExperienceView />
    </ContentSection>
  );
};

export default Experience;
