import { getPortfolio } from "services/portfolio";
import BasicTemplate from "../templates/basic/page";
import PortfolioNotFound from "./components/not-found";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getPortfolio(id);

  return {
    title: `${data.user.full_name} | Portfolio`,
    description: data.bio,
    keywords: data.skills.map((skill) => skill.title),
    openGraph: {
      title: data.user.full_name,
      description: data.bio,
      images: [data.user.avatar.url],
    },
  };
}

export default async function Portfolio({ params }) {
  const { id } = await params;
  const data = await getPortfolio(id);

  console.log(data);

  if (!data) {
    return <PortfolioNotFound />;
  }

  // export const metadata: Metadata = {
  //   title: data.user.full_name,
  //   description: data.bio,
  //   keywords: data.skills.map((skill) => skill.title),
  //   openGraph: {
  //     title: data.user.full_name,
  //     description: data.bio,
  //     images: [data.user.avatar.url],
  //   },
  // };

  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <BasicTemplate data={data} id={id} />
    </div>
  );
}
