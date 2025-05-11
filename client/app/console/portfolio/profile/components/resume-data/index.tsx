"use client";

import { Button } from "@/components/ui/button";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { getPortfolioDataFromResume } from "@/services/resume";
import { useAuthStore } from "@/stores/auth";
import { useCallback, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // const { mutate: createPortfolioMutation, isPending: isCreatingPortfolio } = useMutation({
  //   mutationFn: async (data: PortfoloAIData) => createPortfolio(user_id, data, files[0]),
  //   onSuccess: () => {
  //     toast({
  //       title: "Portfolio created",
  //       description: "Portfolio created successfully",
  //     });
  //     onSuccess?.();
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Error",
  //       description: "Error creating portfolio",
  //     });
  //   },
  // });

  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (data: string) => getPortfolioDataFromResume(data, user_id, files[0]),
  //   onSuccess: (data) => {
  //     console.log("data", data);
  //     return;
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Error",
  //       description: "Error creating portfolio",
  //     });
  //   },
  // });

  const onFileReject = useCallback((file: File, message: string) => {
    toast({
      title: "File rejected",
      description: message,
    });
  }, []);

  const handleCreatePortfolio = async () => {
    try {
      setLoading(true);
      const text = await pdfToText(files[0]);

      await getPortfolioDataFromResume(text, user_id, files[0]);

      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        onSuccess?.();
      }, 80000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error creating portfolio",
      });
      setLoading(false);
    }
  };

  const { currentStepText } = useLoadingStep(loading);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      {!loading && (
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

      {loading && (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-muted/50">
          <Spinner size="medium" />
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">{currentStepText}</p>
            <p className="text-xs text-muted-foreground">Please wait while we process your resume</p>
          </div>
        </div>
      )}

      <Button onClick={handleCreatePortfolio} disabled={files.length === 0 || loading} className="w-full" variant="default">
        {loading ? "Creating portfolio..." : "Create portfolio"}
      </Button>
    </div>
  );
}

export default ResumeData;
