import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Upload, Trash2 } from "lucide-react";
import { FC, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useAuthStore } from "stores/auth";

interface AvatarPickerProps {
  onFileChange: (file: File) => void;
  previewUrl: string;
  onDelete?: () => void;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ onFileChange, previewUrl, onDelete }) => {
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

  const handleDelete = () => {
    setAvatarPreview(null);
    if (onDelete) {
      onDelete();
    }
  };

  const avatar = previewUrl || avatarPreview;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-32 w-32 rounded-full overflow-hidden">
          <AvatarImage src={avatar || ""} alt="Profile" />
          <AvatarFallback>{full_name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <Avatar className="h-24 w-24 rounded-full overflow-hidden">
          <AvatarImage src={avatar || ""} alt="Profile" />
          <AvatarFallback>{full_name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <Avatar className="h-16 w-16 rounded-full overflow-hidden">
          <AvatarImage src={avatar || ""} alt="Profile" />
          <AvatarFallback>{full_name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>
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
        {avatar && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
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
