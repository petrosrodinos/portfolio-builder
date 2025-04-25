import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link as LinkType } from "@/interfaces/templates";
import { Badge } from "@/components/ui/badge";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { getLinkLabelAndIcon } from "@/lib/utils";
interface LinksSectionProps {
  links?: LinkType[];
}

const LinksSection = ({ links = [] }: LinksSectionProps) => {
  if (!links?.length) return null;
  return (
    <section id="links">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Links</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => {
              const { label, Icon } = getLinkLabelAndIcon(link);
              return (
                <Link href={link.link} target="_blank" key={index}>
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LinksSection;
