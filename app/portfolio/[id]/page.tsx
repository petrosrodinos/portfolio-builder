import { getPortfolio } from "services/portfolio";
import BasicTemplate from "../templates/basic/page";
import PortfolioNotFound from "./components/not-found";

export default async function Portfolio({ params }) {
  const { id } = await params;
  const portfolio = await getPortfolio(id);

  if (!portfolio) {
    return <PortfolioNotFound />;
  }

  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <BasicTemplate portfolio={portfolio} id={id} />
    </div>
  );
}
