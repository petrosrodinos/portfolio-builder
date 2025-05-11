"use client";
import ContentSection from "@/components/content-section";
import BankDetails from "./components/bank-details";

export default function BusinessPage() {
  return (
    <ContentSection title="Business" desc="Fill your business information here.">
      <BankDetails />
    </ContentSection>
  );
}
