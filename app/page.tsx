import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Rocket, Shield, Star, Users, Check } from "lucide-react";
import Plans from "./console/billing/subscription/components/plans";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container relative mx-auto px-4 py-32 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Trusted by 10,000+ professionals worldwide</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight sm:text-6xl">
              Build Your Professional Portfolio
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                In Minutes
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Create a stunning portfolio website that showcases your work and skills. No coding
              required - just choose a template and customize it to your needs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>10,000+ Users</span>
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
      <section className="relative bg-muted/50 py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Our Portfolio Builder?</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to create a professional portfolio that stands out
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quick Setup</h3>
              <p className="text-muted-foreground">
                Get your portfolio up and running in minutes with our intuitive builder.
              </p>
            </div>
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Beautiful Templates</h3>
              <p className="text-muted-foreground">
                Choose from professionally designed templates that look great on any device.
              </p>
            </div>
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Customizable</h3>
              <p className="text-muted-foreground">
                Customize every aspect of your portfolio to match your personal brand.
              </p>
            </div>
            <div className="group rounded-xl bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Your portfolio is hosted on our secure platform with 99.9% uptime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Plans />

      {/* CTA Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Ready to Showcase Your Work?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join thousands of professionals who have already created their dream portfolio. Start
              building yours today!
            </p>
            <Button size="lg" className="gap-2">
              Create Your Portfolio <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
