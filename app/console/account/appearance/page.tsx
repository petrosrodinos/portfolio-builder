import ContentSection from "@/components/content-section";
import { AppearanceForm } from "./components/appearance-form";

export default function SettingsAppearance() {
  return (
    <ContentSection
      title="Appearance"
      desc="Customize the appearance of your console. Automatically switch between themes, color schemes and fonts."
    >
      <AppearanceForm />
    </ContentSection>
  );
}
