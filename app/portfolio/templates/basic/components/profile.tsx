import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { LanguagesOptions } from "@/constants/dropdowns/languages";
import * as icons from "country-flag-icons/react/3x2";
import { ProfileSectionProps } from "@/interfaces/templates";

export const ProfileSection = ({
  email,
  phone,
  address,
  welcome_message,
  role,
  avatar,
  full_name,
  country,
}: ProfileSectionProps) => {
  const languageOption = LanguagesOptions.find((option) => option.value === country);
  if (!languageOption) {
    return null;
  }
  const Icon = icons[languageOption?.iconCode as keyof typeof icons];
  return (
    <section id="profile">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0">
              <AvatarImage src={avatar} alt="Profile" />
              <AvatarFallback>{full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="sm:text-left">
              {role && <h1 className="text-2xl sm:text-3xl font-bold">{role}</h1>}
              <h2 className="text-lg sm:text-xl font-bold">{full_name}</h2>
              {welcome_message && (
                <p className="text-sm sm:text-base text-gray-600 mt-2">{welcome_message}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{email}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{phone}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{address}</span>
                    {Icon && <Icon className="h-4 w-4" />}
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
