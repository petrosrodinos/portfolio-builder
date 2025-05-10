"use client";

import { Button } from "@/components/ui/button";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { createPortfolioFromResume } from "@/services/portfolio";
import { useAuthStore } from "@/stores/auth";
import { useCallback, useState } from "react";
import pdfToText from "react-pdftotext";
import { Spinner } from "@/components/ui/spinner";
import { useLoadingStep } from "./loading-step";
import { createPortfolio } from "@/services/profile";
import { PortfoloAIData } from "@/interfaces/portfolio";

interface ResumeDataProps {
  onSuccess?: () => void;
}

function ResumeData({ onSuccess }: ResumeDataProps) {
  const { user_id } = useAuthStore();
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: createPortfolioMutation, isPending: isCreatingPortfolio } = useMutation({
    mutationFn: async (data: PortfoloAIData) => createPortfolio(user_id, data, files[0]),
    onSuccess: () => {
      toast({
        title: "Portfolio created",
        description: "Portfolio created successfully",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error creating portfolio",
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: string) => createPortfolioFromResume(data),
    onSuccess: (data) => {
      createPortfolioMutation(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error creating portfolio",
      });
    },
  });

  const { currentStepText } = useLoadingStep(isPending || isCreatingPortfolio);

  const onFileReject = useCallback((file: File, message: string) => {
    toast({
      title: "File rejected",
      description: message,
    });
  }, []);

  const handleCreatePortfolio = async () => {
    try {
      const text = await pdfToText(files[0]);
      mutate(text);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="space-y-4">
      {!isPending && !isCreatingPortfolio && (
        <FileUpload maxFiles={1} maxSize={5 * 1024 * 1024} accept="application/pdf" className="w-full" value={files} onValueChange={setFiles} onFileReject={onFileReject} multiple>
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
        </FileUpload>
      )}

      {(isPending || isCreatingPortfolio) && (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-muted/50">
          <Spinner size="medium" />
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">{currentStepText}</p>
            <p className="text-xs text-muted-foreground">Please wait while we process your resume</p>
          </div>
        </div>
      )}

      <Button onClick={handleCreatePortfolio} disabled={files.length === 0 || isPending || isCreatingPortfolio} className="w-full" variant="default">
        {isPending ? "Creating portfolio..." : "Create portfolio"}
      </Button>
    </div>
  );
}

export default ResumeData;
