import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Service } from "@/interfaces/templates";
import { Globe } from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  if (!services?.length) return null;
  return (
    <section id="services">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Services</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2">{service.description}</p>
                  {service.price && (
                    <p className="mt-2 text-gray-600">Starting from:{service.price}€</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
