import ContentSection from "@/components/content-section";
import React from "react";
import SkillView from "./components/skill-view";

const Skills = () => {
  return (
    <ContentSection
      title="Skills"
      desc="Add your skills here to show clients what you are good at."
    >
      <SkillView />
    </ContentSection>
  );
};

export default Skills;
