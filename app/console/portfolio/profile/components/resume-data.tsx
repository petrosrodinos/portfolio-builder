"use client";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { createPortfolioFromResume } from "@/services/portfolio";
import { useAuthStore } from "@/stores/auth";
import { useCallback } from "react";

function ResumeData() {
  const { user_id } = useAuthStore();
  const [files, setFiles] = React.useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => createPortfolioFromResume(user_id, files[0]),
    onSuccess: (data) => {
      console.log("data", data);
      toast({
        title: "Portfolio created",
        description: "Portfolio created successfully",
      });
    },
  });

  const onFileReject = useCallback((file: File, message: string) => {
    toast({
      title: "File rejected",
      description: message,
    });
  }, []);

  const handleCreatePortfolio = () => {
    mutate();
  };

  return (
    <FileUpload
      maxFiles={1}
      maxSize={5 * 1024 * 1024}
      accept="application/pdf"
      className="w-full"
      value={files}
      onValueChange={setFiles}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop your resume here</p>
          <p className="text-muted-foreground text-xs">Or click to browse</p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
      <Button
        onClick={handleCreatePortfolio}
        disabled={files.length === 0}
        className="mt-4 w-full"
        variant="default"
      >
        Create portfolio
      </Button>
    </FileUpload>
  );
}

export default ResumeData;
