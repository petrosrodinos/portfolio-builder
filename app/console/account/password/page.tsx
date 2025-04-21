"use client";

import ContentSection from "@/components/content-section";
import ChangePassword from "./components/change-password";

export default function AccountPassword() {
  return (
    <ContentSection
      title="Password"
      desc="Update your password. You will be logged out after updating your password."
    >
      <ChangePassword />
    </ContentSection>
  );
}
