import { Portfolio } from "@/interfaces/templates";
import { PortfolioData } from "@/constants/templates";
import ProfessionalTemplate from "./components";
interface ProfessionalTemplatePageProps {
  data: Portfolio;
  id?: string;
}

const ProfessionalTemplatePage = ({ data }: ProfessionalTemplatePageProps) => {
  return <ProfessionalTemplate data={data || PortfolioData} />;
};

export default ProfessionalTemplatePage;
