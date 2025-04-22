import { Portfolio } from "@/interfaces/templates";
import { PortfolioData } from "@/constants/templates";
import CreativeTemplate from "./components";
interface CreativeTemplatePageProps {
  data: Portfolio;
  id?: string;
}

const CreativeTemplatePage = ({ data }: CreativeTemplatePageProps) => {
  return <CreativeTemplate data={data || PortfolioData} />;
};

export default CreativeTemplatePage;
