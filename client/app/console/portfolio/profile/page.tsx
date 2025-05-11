"use client";
import { useState } from "react";
import ContentSection from "@/components/content-section";
import ProfileForm from "./components/profile-form";
import ProfileView from "./components/profile-view";

export default function SettingsProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ContentSection title="Profile" desc="Add your basic information here.">
      <div className="space-y-6">
        {isEditing ? (
          <ProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileView onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </ContentSection>
  );
}
