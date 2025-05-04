import { getPortfolio } from "services/portfolio";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import UserMessage from "./components/user-message";
import { TemplateTypes } from "@/constants/templates";

const TEMPLATES: any = {
  professional: dynamic(() => import("../templates/professional/page"), { ssr: true }),
  creative: dynamic(() => import("../templates/creative/page"), { ssr: true }),
} as const;

type Props = {
  params: Promise<{ id: string }>;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const data = await getPortfolio(id);

//   return {
//     title: `${data?.user?.full_name || ""} | Portfolio`,
//     description: data?.bio,
//     keywords: [...(data?.skills?.map?.((skill) => skill.title) || []), data?.user?.full_name].filter(Boolean),
//     openGraph: {
//       title: data?.user?.full_name,
//       description: data?.bio,
//       images: [data?.user?.avatar?.url],
//     },
//   };
// }

export default async function PortfolioPage({ params }) {
  const { id } = await params;
  const data = await getPortfolio(id);

  if (!data) {
    return <UserMessage />;
  }

  const templateKey = data?.user?.preferences?.portfolio_theme || TemplateTypes.default;
  const Template: any = TEMPLATES[templateKey];

  if (!data.visible) {
    return (
      <UserMessage visible={data.visible}>
        <Template portfolio={data} />
      </UserMessage>
    );
  }

  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <Template data={data} />
    </div>
  );
}
