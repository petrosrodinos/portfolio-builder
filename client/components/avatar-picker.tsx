import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Upload, Trash2 } from "lucide-react";
import { FC, useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAuthStore } from "stores/auth";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface AvatarPickerProps {
  onFileChange: (file: File) => void;
  previewUrl: string;
  onDelete?: () => void;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ onFileChange, previewUrl, onDelete }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setAvatarPreview(null);
    if (onDelete) {
      onDelete();
    }
    setShowDeleteDialog(false);
  };

  useEffect(() => {
    setAvatarPreview(previewUrl);
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24 rounded-full overflow-hidden border">
          <AvatarImage src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
          <AvatarFallback className="h-full w-full flex items-center justify-center text-xl">{full_name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <Avatar className="h-16 w-16 rounded-full overflow-hidden border">
          <AvatarImage src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
          <AvatarFallback className="h-full w-full flex items-center justify-center text-lg">{full_name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" className="gap-2" onClick={openFilePicker}>
          <Upload className="h-4 w-4" />
          Upload Avatar
        </Button>
        {avatarPreview && (
          <Button type="button" variant="destructive" size="sm" className="gap-2" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Avatar</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete your avatar? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AvatarPicker;
