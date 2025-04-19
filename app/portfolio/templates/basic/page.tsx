import { Portfolio } from "@/interfaces/templates";
import BasicTemplate from "./components";
import { PortfolioData } from "@/constants/templates";
interface BasicTemplateProps {
  data: Portfolio;
  id?: string;
}

const BasicTemplatePage = ({ data }: BasicTemplateProps) => {
  return <BasicTemplate data={data || PortfolioData} />;
};

export default BasicTemplatePage;
