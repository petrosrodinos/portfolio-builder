"use client";
import ContentSection from "@/components/content-section";
import UserProfileForm from "./components/profile-form";

export default function AccountProfile() {
  return (
    <ContentSection title="Profile" desc="Fill your profile informaion here.">
      <UserProfileForm />
    </ContentSection>
  );
}
