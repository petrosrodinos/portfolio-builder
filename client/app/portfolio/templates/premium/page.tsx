"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Calendar as CalendarIcon,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Mock data for the portfolio
const mockPortfolio = {
  user: {
    full_name: "Alex Johnson",
    country: "United States",
    date_of_birth: "1990-05-15",
    avatar: {
      url: "https://i.pravatar.cc/300",
      name: "Alex Johnson",
    },
  },
  bio: "Passionate full-stack developer with 8+ years of experience building modern web applications. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  address: "San Francisco, CA",
  welcome_message:
    "Welcome to my portfolio! I'm a full-stack developer passionate about creating beautiful, functional web applications.",
  booking_link: "https://calendly.com/alexjohnson",
  role: "Full Stack Developer",
  experiences: [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      start: "2020-01",
      finish: "Present",
      description:
        "Leading development of enterprise web applications using React, Node.js, and AWS. Mentoring junior developers and implementing CI/CD pipelines.",
      link: "https://techcorp.com",
    },
    {
      title: "Full Stack Developer",
      company: "WebSolutions LLC",
      location: "New York, NY",
      start: "2017-03",
      finish: "2019-12",
      description:
        "Developed and maintained multiple client websites and web applications. Implemented responsive designs and optimized performance.",
      link: "https://websolutions.com",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      location: "Boston, MA",
      start: "2015-06",
      finish: "2017-02",
      description:
        "Created responsive user interfaces for various clients. Collaborated with designers and backend developers to implement features.",
      link: "https://digitalagency.com",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      company: "Personal Project",
      start: "2021-03",
      finish: "2021-08",
      description:
        "Built a full-featured e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing, user authentication, and admin dashboard.",
      link: "https://github.com/alexjohnson/ecommerce",
    },
    {
      title: "Task Management App",
      company: "Freelance",
      start: "2020-09",
      finish: "2021-01",
      description:
        "Developed a task management application with real-time updates using React, Firebase, and Material UI. Features include task assignment, progress tracking, and team collaboration.",
      link: "https://github.com/alexjohnson/taskmanager",
    },
    {
      title: "Portfolio Website",
      company: "Personal Project",
      start: "2020-05",
      finish: "2020-07",
      description:
        "Created a responsive portfolio website using React and Tailwind CSS. Implemented dark mode, animations, and contact form.",
      link: "https://github.com/alexjohnson/portfolio",
    },
  ],
  educations: [
    {
      title: "Master of Science in Computer Science",
      institution: "Stanford University",
      start: "2013-09",
      finish: "2015-05",
      description:
        "Specialized in Software Engineering and Artificial Intelligence. Graduated with honors.",
      link: "https://stanford.edu",
    },
    {
      title: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      start: "2009-09",
      finish: "2013-05",
      description: "Focus on Web Technologies and Database Systems. Dean's List for all semesters.",
      link: "https://berkeley.edu",
    },
  ],
  skills: [
    { title: "React", level: "Expert" },
    { title: "Node.js", level: "Expert" },
    { title: "TypeScript", level: "Advanced" },
    { title: "JavaScript", level: "Expert" },
    { title: "HTML/CSS", level: "Expert" },
    { title: "Tailwind CSS", level: "Advanced" },
    { title: "MongoDB", level: "Advanced" },
    { title: "PostgreSQL", level: "Intermediate" },
    { title: "AWS", level: "Intermediate" },
    { title: "Docker", level: "Intermediate" },
    { title: "Git", level: "Expert" },
    { title: "CI/CD", level: "Intermediate" },
  ],
  languages: [
    { title: "English", level: "Native" },
    { title: "Spanish", level: "Advanced" },
    { title: "French", level: "Intermediate" },
  ],
  links: [
    { title: "GitHub", link: "https://github.com/alexjohnson" },
    { title: "LinkedIn", link: "https://linkedin.com/in/alexjohnson" },
    { title: "Twitter", link: "https://twitter.com/alexjohnson" },
    { title: "Blog", link: "https://alexjohnson.dev/blog" },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Custom web application development using modern technologies like React, Node.js, and cloud services.",
      price: "From $100/hour",
    },
    {
      title: "UI/UX Design",
      description:
        "User interface and experience design for web and mobile applications, focusing on usability and aesthetics.",
      price: "From $90/hour",
    },
    {
      title: "Technical Consulting",
      description:
        "Expert advice on technology stack selection, architecture design, and best practices for your projects.",
      price: "From $120/hour",
    },
  ],
  resume: {
    name: "Alex Johnson - Resume.pdf",
    url: "https://example.com/resume.pdf",
  },
};

export default function PremiumTemplatePage() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");

  // Function to get skill level color
  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "advanced":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "intermediate":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      case "beginner":
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  // Function to get language level color
  const getLanguageLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "native":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      case "advanced":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "intermediate":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      case "beginner":
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={mockPortfolio.user.avatar.url}
                alt={mockPortfolio.user.avatar.name}
              />
              <AvatarFallback>
                {mockPortfolio.user.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold">{mockPortfolio.user.full_name}</h1>
              <p className="text-xs text-muted-foreground">{mockPortfolio.role}</p>
            </div>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Experience</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={mockPortfolio.links[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={mockPortfolio.links[1].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {mockPortfolio.welcome_message}
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">{mockPortfolio.bio}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href={mockPortfolio.resume.url} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={mockPortfolio.booking_link} target="_blank" rel="noopener noreferrer">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Book a Call
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">About Me</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic details about me</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Full Name:</span>
                    <span>{mockPortfolio.user.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Country:</span>
                    <span>{mockPortfolio.user.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Date of Birth:</span>
                    <span>{new Date(mockPortfolio.user.date_of_birth).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                  <CardDescription>More about my journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    {mockPortfolio.bio}
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {mockPortfolio.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="mb-2 text-lg font-semibold">{skill.title}</h3>
                      <Badge className={cn("border", getSkillLevelColor(skill.level))}>
                        {skill.level}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Languages Section */}
        <section id="languages" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Languages</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mockPortfolio.languages.map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="mb-2 text-lg font-semibold">{language.title}</h3>
                      <Badge className={cn("border", getLanguageLevelColor(language.level))}>
                        {language.level}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Education</h2>
            <div className="relative space-y-8 pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
              {mockPortfolio.educations.map((education, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary"
                >
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{education.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {education.start} - {education.finish}
                        </Badge>
                      </div>
                      <CardDescription>{education.institution}</CardDescription>
                    </CardHeader>
                    {education.description && (
                      <CardContent>
                        <p>{education.description}</p>
                      </CardContent>
                    )}
                    {education.link && (
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={education.link} target="_blank" rel="noopener noreferrer">
                            Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Experience</h2>
            <div className="relative space-y-8 pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
              {mockPortfolio.experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary"
                >
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{experience.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {experience.start} - {experience.finish}
                        </Badge>
                      </div>
                      <CardDescription>
                        {experience.company} • {experience.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{experience.description}</p>
                    </CardContent>
                    {experience.link && (
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={experience.link} target="_blank" rel="noopener noreferrer">
                            Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockPortfolio.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2 transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {project.start} - {project.finish}
                        </Badge>
                      </div>
                      <CardDescription>{project.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{project.description}</p>
                    </CardContent>
                    {project.link && (
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockPortfolio.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2 transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                      {service.price && (
                        <CardDescription className="text-lg font-semibold text-primary">
                          {service.price}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p>{service.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <a
                          href={mockPortfolio.booking_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book Now <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Contact</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Feel free to reach out for collaborations or opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${mockPortfolio.email}`} className="hover:underline">
                      {mockPortfolio.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${mockPortfolio.phone}`} className="hover:underline">
                      {mockPortfolio.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{mockPortfolio.address}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href={mockPortfolio.booking_link} target="_blank" rel="noopener noreferrer">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Book a Call
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Connect with Me</CardTitle>
                  <CardDescription>Follow me on social media</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPortfolio.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {link.title}
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {mockPortfolio.user.full_name}. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              {mockPortfolio.links.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
