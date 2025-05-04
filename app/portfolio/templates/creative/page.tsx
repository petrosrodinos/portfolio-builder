"use client";

import { PortfolioData } from "@/constants/templates";
import CreativeTemplate from "./components";
import { Portfolio } from "@/interfaces/templates";
interface CreativeTemplatePageProps {
  portfolio: Portfolio;
}

const CreativeTemplatePage = ({ portfolio }: CreativeTemplatePageProps) => {
  return <CreativeTemplate portfolio={portfolio || PortfolioData} />;
};

export default CreativeTemplatePage;
