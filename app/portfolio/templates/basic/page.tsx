import { ProfileSection } from "./components/profile";
import { BioSection } from "./components/bio";
import { ExperienceSection } from "./components/experience";
import { ProjectsSection } from "./components/projects";
import { EducationSection } from "./components/education";
import { SkillsSection } from "./components/skills";
import { LanguagesSection } from "./components/language";
import { ServicesSection } from "./components/services";
import { ContactSection } from "./components/contact";
import NavBar from "./components/nav-bar";
interface BasicTemplateProps {
  initialData: any;
  id: string;
}

const BasicTemplate = ({ initialData: data }: BasicTemplateProps) => {
  const profile = {
    email: "example@email.com",
    phone: "+1 234 567 8900",
    address: "New York, USA",
    welcome_message:
      "Welcome to my portfolio! I'm a passionate developer focused on creating impactful solutions.",
  };

  const bio = {
    role: "Full Stack Developer",
    bio: "Experienced developer with a passion for creating elegant solutions to complex problems. Specialized in modern web technologies and best practices.",
    resume: "/resume.pdf",
  };

  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      start: "2020-01",
      finish: "Present",
      description: "Leading development teams and implementing modern web solutions.",
    },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      company: "Personal Project",
      start: "2021-01",
      finish: "2021-06",
      description: "Built a full-stack e-commerce platform using Next.js and Node.js",
      link: "https://github.com/example/project",
      image: "/project-image.jpg",
    },
  ];

  const education = [
    {
      title: "Bachelor of Computer Science",
      institution: "University of Technology",
      start: "2016",
      finish: "2020",
      description: "Focused on software engineering and web development",
    },
  ];

  const services = [
    {
      title: "Web Development",
      description: "Custom web application development using modern technologies",
      price: "From $50/hour",
    },
  ];

  const skills = [
    { title: "React", level: "Expert" },
    { title: "Node.js", level: "Advanced" },
  ];

  const languages = [
    { title: "English", level: "Native" },
    { title: "Spanish", level: "Intermediate" },
  ];

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
      <ContactSection />
    </div>
  );
};

export default BasicTemplate;
