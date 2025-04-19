"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Languages,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Star,
  Send,
} from "lucide-react";

const PortfolioTemplate = () => {
  // This would typically come from your database/API
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

  const links = [
    {
      title: "GitHub",
      link: "https://github.com/username",
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

  const sections = [
    { id: "profile", label: "Profile" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "languages", label: "Languages" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b mb-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold">{bio.role}</h1>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className="whitespace-nowrap"
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div id="profile">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar.jpg" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{bio.role}</h1>
                <p className="text-gray-600 mt-2">{profile.welcome_message}</p>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bio Section */}
      <div id="about">
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold">About Me</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{bio.bio}</p>
            <Button className="mt-4" variant="outline">
              <LinkIcon className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Experience Section */}
      <div id="experience">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Experience</h2>
            </div>
          </CardHeader>
          <CardContent>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-gray-600">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.start} - {exp.finish}
                </p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-600">{project.company}</p>
                    <p className="text-sm text-gray-500">
                      {project.start} - {project.finish}
                    </p>
                    <p className="mt-2">{project.description}</p>
                    {project.link && (
                      <Button className="mt-4" variant="link">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        View Project
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Education Section */}
      <div id="education">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
          </CardHeader>
          <CardContent>
            {education.map((edu, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold">{edu.title}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.start} - {edu.finish}
                </p>
                {edu.description && <p className="mt-2">{edu.description}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <div id="skills">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Skills</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill.title} • {skill.level}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Languages Section */}
      <div id="languages">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Languages</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <Badge key={index} variant="secondary">
                  {language.title} • {language.level}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Section */}
      <div id="services">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Services</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-2">{service.description}</p>
                    {service.price && <p className="mt-2 text-gray-600">{service.price}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form Section */}
      <div id="contact">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Contact Me</h2>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioTemplate;
