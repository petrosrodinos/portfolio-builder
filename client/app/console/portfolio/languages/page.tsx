import ContentSection from "@/components/content-section";
import React from "react";
import LanguageView from "./components/language-view";

const Languages = () => {
  return (
    <ContentSection title="Languages" desc="Add your speaking languages here.">
      <LanguageView />
    </ContentSection>
  );
};

export default Languages;
