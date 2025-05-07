import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Rocket, Shield, Star, Users, Search } from "lucide-react";
import Plans from "./console/billing/subscription/components/plans";
import Link from "next/link";
import PortfolioTemplates from "@/components/portfolio-templates";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container relative mx-auto px-4 py-32 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Trusted by 2,000+ professionals worldwide</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight sm:text-6xl">
              Build Your Professional Portfolio
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text">In Minutes</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Create a stunning portfolio website that showcases your work and skills. No coding or complex tools required - just choose a template and add your experience.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/console/dashboard">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button size="lg" variant="outline">
                  View Templates
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>2,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative bg-muted/50 py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Our Portfolio Builder?</h2>
            <p className="text-lg text-muted-foreground">Everything you need to create a professional portfolio that stands out</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quick Setup</h3>
              <p className="text-muted-foreground">Get your portfolio up and running in minutes with out any coding.</p>
            </div>
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Beautiful Templates</h3>
              <p className="text-muted-foreground">Choose from professionally designed templates that look great on any device.</p>
            </div>
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Customizable</h3>
              <p className="text-muted-foreground">Customize every aspect of your portfolio to match your personal brand.</p>
            </div>
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">SEO Optimized</h3>
              <p className="text-muted-foreground">Built-in SEO features help your portfolio rank higher in search results and reach more potential clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section Header */}
      <div id="templates" className="py-16">
        <section className="relative">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-6 text-3xl font-bold">SEO-Friendly Templates</h2>
              <p className="text-lg text-muted-foreground">
                Our templates are built with search engines in mind. Get better visibility and reach more potential clients with built-in SEO features, optimized meta tags, and fast loading speeds.
              </p>
            </div>
          </div>
        </section>
        <PortfolioTemplates className="m-4 mt-12 max-w-4xl mx-auto" isLandingPage />
      </div>

      {/* Pricing Section Header */}
      <div id="pricing" className="py-6 mb-4">
        <section className="relative">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground">
                Choose the perfect plan for your needs. Whether you&apos;re just starting out or need advanced features, we have a plan that fits your goals. All plans include a 7-day free trial.
              </p>
            </div>
          </div>
        </section>

        <Plans redirectParam="/auth/portfolio-resume" className="m-4 max-w-4xl mx-auto" />
      </div>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-6 text-3xl font-bold">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">We're constantly working to bring you more features to enhance your portfolio and grow your professional presence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Engagement Features</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Contact Form
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  AI Chat Assistant
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Reviews & Testimonials
                </li>
              </ul>
            </div>
            <div className="group rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Professional Showcase</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Publications & Articles
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Awards & Achievements
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Photo Collections
                </li>
              </ul>
            </div>
            <div className="group rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Growth Tools</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Custom Domain Support
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Analytics Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Blog Platform
                </li>
              </ul>
            </div>
            <div className="group rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Customization & Jobs</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Template Customization
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Section Reordering
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Job Search Integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Ready to Showcase Your Work?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">Join thousands of professionals who have already created their dream portfolio. Start building yours today!</p>
            <Link href="/console/dashboard">
              <Button size="lg" className="gap-2">
                Create Your Portfolio <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
