"use client";
import ContentSection from "../components/content-section";
import BioForm from "./components/bio-form";

export default function Bio() {
  return (
    <ContentSection title="Bio" desc="Add your bio details here.">
      <BioForm />
    </ContentSection>
  );
}
