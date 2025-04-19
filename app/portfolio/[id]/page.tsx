import { getPortfolio } from "services/portfolio";
import BasicTemplate from "../templates/basic/page";

export default async function Portfolio({ params }) {
  const { id } = await params;
  const initialData = await getPortfolio(id);

  console.log(initialData);

  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <BasicTemplate initialData={initialData} />
    </div>
  );
}
