"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@/interfaces/templates";
import { SocialMediaOptions } from "@/constants/dropdowns/social_media";
import { Badge } from "@/components/ui/badge";
import { LinkIcon, Star } from "lucide-react";

interface LinksSectionProps {
  links?: Link[];
}

export const LinksSection = ({ links = [] }: LinksSectionProps) => {
  return (
    <section id="links">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Links</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => {
              const socialMedia = SocialMediaOptions.find((option) => option.value === link.title);
              if (!socialMedia) {
                return null;
              }
              const Icon = socialMedia.icon;
              return (
                <Badge
                  onClick={() => window.open(link.link, "_blank")}
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {socialMedia?.label}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
