"use client";
import ContentSection from "@/components/content-section";
import AccountProfileForm from "./components/profile-form";

export default function AccountProfile() {
  return (
    <ContentSection title="Profile" desc="Fill your profile information here.">
      <AccountProfileForm />
    </ContentSection>
  );
}
