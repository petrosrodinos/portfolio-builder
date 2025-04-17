"use client";
import { useState } from "react";
import ContentSection from "@/components/content-section";
import BioForm from "./components/bio-form";
import BioView from "./components/bio-view";

export default function Bio() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ContentSection title="Bio" desc="Add your bio details here.">
      {isEditing ? (
        <BioForm onCancel={() => setIsEditing(false)} />
      ) : (
        <BioView onEdit={() => setIsEditing(true)} />
      )}
    </ContentSection>
  );
}
