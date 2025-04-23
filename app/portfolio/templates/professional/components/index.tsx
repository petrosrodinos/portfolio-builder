import Profile from "./profile";
import Bio from "./bio";
import Experience from "./experience";
import Projects from "./projects";
import Education from "./education";
import { SkillsSection } from "./skills";
import Languages from "./language";
import Services from "./services";
import { ContactSection } from "./contact";
import Links from "./links";
import NavBar from "./nav-bar";
import { Portfolio } from "@/interfaces/templates";

interface ProfessionalTemplateProps {
  data: Portfolio;
}

const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <NavBar full_name={data?.user?.full_name} />

      <div className="pt-20">
        <Profile
          full_name={data?.user?.full_name}
          welcome_message={data?.welcome_message}
          role={data.role}
          country={data?.user?.country}
          email={data?.email}
          phone={data?.phone}
          avatar={data?.user?.avatar?.url}
          address={data?.address}
          booking_link={data?.booking_link}
        />
        <Bio bio={data.bio} resume={data?.resume?.url} />
        <Experience experiences={data?.experiences} />
        <Projects projects={data?.projects} />
        <Education education={data?.educations} />
        <Services services={data?.services} />
        <SkillsSection skills={data?.skills} />
        <Languages languages={data?.languages} />
        <Links links={data?.links} />
        <ContactSection />
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
