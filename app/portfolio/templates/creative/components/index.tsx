"use client";
import Header from "./Header";
import About from "./about";
import Services from "./Services";
import Work from "./Work";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Portfolio } from "@/interfaces/templates";
import EducationSection from "./education";
interface CreativeTemplateProps {
  data: Portfolio;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <Navbar />
      <Header
        full_name={data?.user?.full_name}
        welcome_message={data?.welcome_message}
        role={data.role}
        resume={data?.resume?.url}
        avatar={data?.user?.avatar?.url}
      />
      <About
        full_name={data?.user?.full_name}
        avatar={data?.user?.avatar?.url}
        bio={data.bio}
        experiences={data?.experiences}
        projects={data?.projects}
        education={data?.educations}
        skills={data?.skills}
        services={data?.services}
        languages={data?.languages}
      />
      <Services services={data?.services} />
      <Work projects={data?.projects} />
      <EducationSection education={data?.educations} />
      <Contact />
      <Footer
        avatar={data?.user?.avatar?.url}
        full_name={data?.user?.full_name}
        email={data?.email}
        phone={data?.phone}
        address={data?.address}
        booking_link={data?.booking_link}
        country={data?.user?.country}
        links={data?.links}
      />
    </div>
  );
}
