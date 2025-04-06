import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { X } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type == "file") {
        const file = event.target.files?.[0];
        if (file) {
          setAvatarPreview(URL.createObjectURL(file));
        }
      }
      props.onChange?.(event);
    };

    return (
      <div className="flex items-center gap-4">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
          onChange={handleFileChange}
        />
        {avatarPreview && (
          <div className="relative">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="h-16 w-16 rounded-full object-cover border"
            />
            <button
              type="button"
              onClick={() => {
                setAvatarPreview(null);
                props.onChange(undefined);
              }}
              className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
