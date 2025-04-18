import ContentSection from "@/components/content-section";
import React from "react";
import LinkView from "./components/link-view";

const Links = () => {
  return (
    <ContentSection title="Links" desc="Add your links here to show clients that you are active.">
      <LinkView />
    </ContentSection>
  );
};

export default Links;
