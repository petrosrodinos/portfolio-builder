import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>

      {/* Getting Started Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Start Guide</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create your account and log in</li>
              <li>Choose a portfolio template that matches your style</li>
              <li>Add your personal information and projects</li>
              <li>Customize your portfolio&apos;s colors and layout</li>
              <li>Preview and publish your portfolio</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* FAQs Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I customize my portfolio?</AccordionTrigger>
              <AccordionContent>
                You can customize your portfolio by clicking on the &quot;Customize&quot; button in your dashboard. From there, you can modify colors, fonts, layouts, and add your own content.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I add custom code to my portfolio?</AccordionTrigger>
              <AccordionContent>Yes, you can add custom HTML, CSS, and JavaScript to your portfolio through the &quot;Custom Code&quot; section in the settings.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I add projects to my portfolio?</AccordionTrigger>
              <AccordionContent>
                Navigate to the &quot;Projects&quot; section in your dashboard, click &quot;Add New Project,&quot; and fill in the details including title, description, images, and links.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Support Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>If you need additional assistance, you can:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Email us at support@portfoliobuilder.com</li>
              <li>Join our Discord community for real-time support</li>
              <li>Check out our detailed documentation</li>
              <li>Schedule a 1-on-1 support call</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;
