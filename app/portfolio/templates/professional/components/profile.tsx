import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { ProfileSectionProps } from "@/interfaces/templates";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CopyButton } from "./copy-button";
import { CountriesOptions } from "@/constants/dropdowns/countries";
import Link from "next/link";

const Profile = ({
  email,
  phone,
  address,
  welcome_message,
  role,
  avatar,
  full_name,
  country,
  booking_link,
}: ProfileSectionProps) => {
  const countryOption = CountriesOptions.find((option) => option.value === country);

  return (
    <section id="profile">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0">
              <AvatarImage src={avatar} alt="Profile" />
              <AvatarFallback>{full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full sm:text-left">
              {role && <h1 className="text-2xl sm:text-3xl font-bold">{role}</h1>}
              <h2 className="text-lg sm:text-xl font-bold">{full_name}</h2>
              {countryOption && (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base">{countryOption.label}</span>
                </div>
              )}
              {welcome_message && (
                <p className="text-sm sm:text-base text-gray-600 mt-2">{welcome_message}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                {booking_link && (
                  <Link
                    href={booking_link}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm sm:text-base">Book Me</span>
                  </Link>
                )}
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{email}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CopyButton text={email} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy email</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{phone}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CopyButton text={phone} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy phone</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
export default Profile;
