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
  portfolio: Portfolio;
}

const ProfessionalTemplate = ({ portfolio }: ProfessionalTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <NavBar full_name={portfolio?.user?.full_name} />

      <div className="pt-20">
        <Profile
          full_name={portfolio?.user?.full_name}
          welcome_message={portfolio?.welcome_message}
          role={portfolio.role}
          country={portfolio?.user?.country}
          email={portfolio?.email}
          phone={portfolio?.phone}
          avatar={portfolio?.user?.avatar?.url}
          address={portfolio?.address}
          booking_link={portfolio?.booking_link}
        />
        <Bio bio={portfolio.bio} resume={portfolio?.resume?.url} />
        <Experience experiences={portfolio?.experiences} />
        <Projects projects={portfolio?.projects} />
        <Education education={portfolio?.educations} />
        <Services services={portfolio?.services} />
        <SkillsSection skills={portfolio?.skills} />
        <Languages languages={portfolio?.languages} />
        <Links links={portfolio?.links} />
        {/* <ContactSection /> */}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
