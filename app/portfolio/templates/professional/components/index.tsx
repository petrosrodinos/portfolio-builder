import { ProfileSection } from "./profile";
import { BioSection } from "./bio";
import { ExperienceSection } from "./experience";
import { ProjectsSection } from "./projects";
import { EducationSection } from "./education";
import { SkillsSection } from "./skills";
import { LanguagesSection } from "./language";
import { ServicesSection } from "./services";
import { ContactSection } from "./contact";
import { LinksSection } from "./links";
import NavBar from "./nav-bar";
import { Portfolio } from "@/interfaces/templates";

interface ProfessionalTemplateProps {
  data: Portfolio;
  id?: string;
}

const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <NavBar full_name={data?.user?.full_name} />

      <div className="pt-20">
        <ProfileSection
          full_name={data?.user?.full_name}
          country={data?.user?.country}
          role={data.role}
          welcome_message={data?.welcome_message}
          email={data?.email}
          phone={data?.phone}
          address={data?.address}
          avatar={data?.user?.avatar?.url}
          booking_link={data?.booking_link}
        />
        <BioSection bio={data.bio} resume={data?.resume?.url} />
        <ExperienceSection experiences={data?.experiences} />
        <ProjectsSection projects={data?.projects} />
        <EducationSection education={data?.educations} />
        <ServicesSection services={data?.services} />
        <SkillsSection skills={data?.skills} />
        <LanguagesSection languages={data?.languages} />
        <LinksSection links={data?.links} />
        <ContactSection />
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
