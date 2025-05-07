"use client";
import Header from "./Header";
import About from "./About";
import Services from "./Services";
import Work from "./Work";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import EducationSection from "./education";
import { Portfolio } from "@/interfaces/templates";
interface CreativeTemplateProps {
  portfolio: Portfolio;
}

export default function CreativeTemplate({ portfolio }: CreativeTemplateProps) {
  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <Navbar />
      <Header full_name={portfolio?.user?.full_name} welcome_message={portfolio?.welcome_message} role={portfolio.role} resume={portfolio?.resume?.url} avatar={portfolio?.user?.avatar?.url} />
      <About
        full_name={portfolio?.user?.full_name}
        avatar={portfolio?.user?.avatar?.url}
        bio={portfolio.bio}
        experiences={portfolio?.experiences}
        projects={portfolio?.projects}
        education={portfolio?.educations}
        skills={portfolio?.skills}
        services={portfolio?.services}
        languages={portfolio?.languages}
      />
      <Services services={portfolio?.services} />
      <Work projects={portfolio?.projects} />
      <EducationSection education={portfolio?.educations} />
      {/* <Contact /> */}
      <Footer
        avatar={portfolio?.user?.avatar?.url}
        full_name={portfolio?.user?.full_name}
        email={portfolio?.email}
        phone={portfolio?.phone}
        address={portfolio?.address}
        booking_link={portfolio?.booking_link}
        country={portfolio?.user?.country}
        links={portfolio?.links}
      />
    </div>
  );
}
