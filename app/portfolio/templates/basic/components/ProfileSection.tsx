import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { LanguagesOptions } from "@/constants/dropdowns/languages";
import * as icons from "country-flag-icons/react/3x2";

interface ProfileSectionProps {
  avatar: string;
  email: string;
  phone: string;
  address: string;
  welcome_message: string;
  role: string;
  full_name: string;
  country: string;
}

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
  const Icon = icons[languageOption?.iconCode as keyof typeof icons];
  return (
    <div id="profile">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} alt="Profile" />
              <AvatarFallback>{full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              {role && <h1 className="text-3xl font-bold">{role}</h1>}
              <h2 className="text-xl font-bold">{full_name}</h2>
              {welcome_message && <p className="text-gray-600 mt-2">{welcome_message}</p>}
              <div className="flex gap-4 mt-4">
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{email}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{phone}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{address}</span>
                    <Icon className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
