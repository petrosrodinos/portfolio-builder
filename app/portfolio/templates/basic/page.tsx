import { ProfileSection } from "./components/profile";
import { BioSection } from "./components/bio";
import { ExperienceSection } from "./components/experience";
import { ProjectsSection } from "./components/projects";
import { EducationSection } from "./components/education";
import { SkillsSection } from "./components/skills";
import { LanguagesSection } from "./components/language";
import { ServicesSection } from "./components/services";
import { ContactSection } from "./components/contact";
import { LinksSection } from "./components/links";
import NavBar from "./components/nav-bar";
interface BasicTemplateProps {
  initialData: any;
  id: string;
}

const BasicTemplate = ({ initialData: data }: BasicTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <NavBar full_name={data?.user?.full_name} />

      <ProfileSection
        full_name={data?.user?.full_name}
        country={data?.user?.country}
        role={data.role}
        welcome_message={data?.welcome_message}
        email={data?.email}
        phone={data?.phone}
        address={data?.address}
        avatar={data?.user?.avatar?.url}
      />
      <BioSection bio={data.bio} resume={data.resume.url} />
      <ExperienceSection experiences={data?.experiences} />
      <ProjectsSection projects={data?.projects} />
      <EducationSection education={data?.educations} />
      <SkillsSection skills={data?.skills} />
      <LanguagesSection languages={data?.languages} />
      <ServicesSection services={data?.services} />
      <LinksSection links={data?.links} />
      <ContactSection />
    </div>
  );
};

export default BasicTemplate;
