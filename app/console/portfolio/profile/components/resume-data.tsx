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
import { useCallback, useState, useEffect } from "react";
import pdfToText from "react-pdftotext";
import { Spinner } from "@/components/ui/spinner";

const loadingSteps = [
  "Reading data from your resume...",
  "Getting personal information...",
  "Getting education history...",
  "Getting work experience...",
  "Getting skills and certifications...",
  "Getting projects...",
  "Getting services...",
  "Getting links...",
  "Getting languages...",
  "Creating your portfolio...",
];

function ResumeData() {
  const { user_id } = useAuthStore();
  const [files, setFiles] = React.useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: string) => createPortfolioFromResume(user_id, data),
    onSuccess: (data) => {
      console.log("data", data);
      toast({
        title: "Portfolio created",
        description: "Portfolio created successfully",
      });
    },
    onError: (error) => {
      console.error("Error", error);
      toast({
        title: "Error",
        description: "Error creating portfolio",
      });
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      setCurrentStep(0);
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : 0));
      }, 2000);
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [isPending]);

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
      {!isPending && (
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
        </FileUpload>
      )}

      {isPending && (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-muted/50">
          <Spinner size="medium" />
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">{loadingSteps[currentStep]}</p>
            <p className="text-xs text-muted-foreground">
              Please wait while we process your resume
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={handleCreatePortfolio}
        disabled={files.length === 0 || isPending}
        className="w-full"
        variant="default"
      >
        {isPending ? "Creating portfolio..." : "Create portfolio"}
      </Button>
    </div>
  );
}

export default ResumeData;
