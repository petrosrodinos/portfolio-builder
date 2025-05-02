import { PUBLIC_SITE_URL } from "@/constants/index";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createAffiliateCode, getAffiliateCode } from "@/services/affiliate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "../loading";
const GenerateCode = () => {
  const { user_id } = useAuthStore();
  const { toast } = useToast();
  const [affiliateLink, setAffiliateLink] = useState<string>("");

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["affiliate-code"],
    queryFn: () => getAffiliateCode(user_id),
    // retry: false,
  });

  const { mutate: generateAffiliateCode, isPending } = useMutation({
    mutationFn: () => createAffiliateCode(user_id),
    onSuccess: (data) => {
      setAffiliateLink(`${PUBLIC_SITE_URL}/auth/sign-up?ref=${data.code}`);
      toast({
        title: "Affiliate link generated",
        description: "Your new affiliate link has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Link copied",
      description: "Your affiliate link has been copied to clipboard.",
    });
  };

  useEffect(() => {
    if (!data) return;
    setAffiliateLink(`${PUBLIC_SITE_URL}/auth/sign-up?ref=${data.code}`);
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Affiliate Link</CardTitle>
        <CardDescription>
          Generate and share your unique affiliate link to earn commissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="relative flex-1 min-w-0">
            <Input
              value={affiliateLink}
              readOnly
              className="w-full font-mono text-sm pr-8 h-9"
              placeholder="Generate a link to get started"
              style={{
                whiteSpace: "nowrap",
                overflow: "auto",
                textOverflow: "unset",
              }}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={copyToClipboard}
              disabled={!affiliateLink}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex justify-start">
            <Button
              loading={isPending}
              disabled={isPending || !!affiliateLink}
              onClick={() => generateAffiliateCode()}
              className="h-9 text-sm px-3"
            >
              <Link className="h-3.5 w-3.5 mr-1.5" />
              Generate Link
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerateCode;
