import { getPortfolio } from "services/portfolio";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import UserMessage from "./components/user-message";
import { TemplateTypes } from "@/constants/templates";

const TEMPLATES = {
  professional: dynamic(() => import("../templates/professional/page"), { ssr: true }),
  creative: dynamic(() => import("../templates/premium/page"), { ssr: true }),
} as const;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getPortfolio(id);

  return {
    title: `${data?.user?.full_name || ""} | Portfolio`,
    description: data?.bio,
    keywords: data?.skills?.map((skill) => skill.title),
    openGraph: {
      title: data?.user?.full_name,
      description: data?.bio,
      images: [data?.user?.avatar?.url],
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { id } = await params;
  const data = await getPortfolio(id);

  if (!data) {
    return <UserMessage />;
  }

  const templateKey = data?.user?.preferences?.portfolio_theme || TemplateTypes.default;
  const Template = TEMPLATES[templateKey];

  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <Template data={data} id={id} />
    </div>
  );
}
