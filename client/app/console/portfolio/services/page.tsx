import ContentSection from "@/components/content-section";
import React from "react";
import ServiceView from "./components/service-view";

const Services = () => {
  return (
    <ContentSection title="Services" desc="Add your services here to show clients what you can do.">
      <ServiceView />
    </ContentSection>
  );
};

export default Services;
