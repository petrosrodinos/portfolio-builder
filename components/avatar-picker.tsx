import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Upload } from "lucide-react";
import { FC, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useAuthStore } from "stores/auth";

interface AvatarPickerProps {
  onFileChange: (file: File) => void;
  previewUrl: string;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ onFileChange, previewUrl }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { full_name } = useAuthStore((state) => state);
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarPreview || ""} alt="Profile" />
        <AvatarFallback>{full_name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={openFilePicker}
        >
          <Upload className="h-4 w-4" />
          Upload Avatar
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
    </div>
  );
};

export default AvatarPicker;
