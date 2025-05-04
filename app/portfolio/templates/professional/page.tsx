import { PortfolioData } from "@/constants/templates";
import ProfessionalTemplate from "./components";
import { Portfolio } from "@/interfaces/templates";
interface ProfessionalTemplatePageProps {
  portfolio: Portfolio;
}

const ProfessionalTemplatePage = ({ portfolio }: ProfessionalTemplatePageProps) => {
  return <ProfessionalTemplate portfolio={portfolio || PortfolioData} />;
};

export default ProfessionalTemplatePage;
