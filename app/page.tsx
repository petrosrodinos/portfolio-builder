import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Rocket, Shield, Star, Users, Search } from "lucide-react";
import Plans from "./console/billing/subscription/components/plans";
import Link from "next/link";
import PortfolioTemplates from "@/components/portfolio-templates";
import { SUPPORT_EMAIL } from "@/constants/index";

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
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">Create a stunning portfolio website that showcases your work and skills. No coding or complex tools required - just choose a template and add your experience.</p>
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
              <p className="text-lg text-muted-foreground">Our templates are built with search engines in mind. Get better visibility and reach more potential clients with built-in SEO features, optimized meta tags, and fast loading speeds.</p>
            </div>
          </div>
        </section>
        <PortfolioTemplates className="m-4 mt-12 max-w-4xl mx-auto" isLandingPage />
      </div>

      {/* Pricing Section Header */}
      <div id="pricing" className="py-16 mb-4">
        <section className="relative">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground">Choose the perfect plan for your needs. Whether you&apos;re just starting out or need advanced features, we have a plan that fits your goals. All plans include a 7-day free trial.</p>
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
            <p className="text-lg text-muted-foreground">We&apos;re constantly working to bring you more features to enhance your portfolio and grow your professional presence.</p>
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

      {/* Contact Footer */}
      <footer id="contact" className="relative border-t bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-muted-foreground">We help professionals showcase their work and connect with opportunities through beautiful, customizable portfolios.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="#hero" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#templates" className="hover:text-primary transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Email: {SUPPORT_EMAIL}</li>
                <li>Hours: Mon-Fri, 9am-5pm EST</li>
                <li>
                  <Link href="https://calendly.com/petrosrodinos/30min" className="hover:text-primary transition-colors">
                    Book a Meeting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
