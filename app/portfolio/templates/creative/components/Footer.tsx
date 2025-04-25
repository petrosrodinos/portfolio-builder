import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { FC } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { CountriesOptions } from "@/constants/dropdowns/countries";
import { Link } from "@/interfaces/templates";
import { getLinkLabelAndIcon } from "@/lib/utils";
interface FooterProps {
  avatar: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  booking_link: string;
  country: string;
  links: Link[];
}

const Footer: FC<FooterProps> = ({
  avatar,
  full_name,
  email,
  phone,
  address,
  booking_link,
  country,
  links,
}) => {
  const countryOption = CountriesOptions.find((option) => option.value === country);

  return (
    <section className="mt-20">
      <div className="text-center">
        <Avatar className="h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0 w-36 mx-auto mb-2">
          <AvatarImage src={avatar} alt="Profile" />
          <AvatarFallback>{full_name.charAt(0)}</AvatarFallback>
        </Avatar>

        {email && (
          <div className="w-max flex items-center gap-2 mx-auto">
            <Mail className="w-6" />
            {email}
          </div>
        )}
        {phone && (
          <div className="w-max flex items-center gap-2 mx-auto">
            <Phone className="w-6" />
            {phone}
          </div>
        )}
        {address && (
          <div className="w-max flex items-center gap-2 mx-auto">
            <MapPin className="w-6" />
            {address} {countryOption ? `, ${countryOption?.label}` : ""}
          </div>
        )}
        {booking_link && (
          <a
            href={booking_link}
            target="_blank"
            className="w-max flex items-center gap-2 mx-auto text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm sm:text-base">Book Me</span>
          </a>
        )}
      </div>

      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          {links?.map((link, index) => {
            const { label, Icon } = getLinkLabelAndIcon(link);
            return (
              <li key={index} className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                <a
                  href={link.link.startsWith("http") ? link.link : `https://${link.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Footer;
