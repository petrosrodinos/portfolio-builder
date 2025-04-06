"use client";
import ContentSection from "../components/content-section";
import ProfileForm from "./components/profile-form";

export default function SettingsProfile() {
  return (
    <ContentSection title="Profile" desc="Add your basic informaion here.">
      <ProfileForm />
    </ContentSection>
  );
}
