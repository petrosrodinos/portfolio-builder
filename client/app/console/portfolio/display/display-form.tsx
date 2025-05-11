import ExperienceSkeleton from "@/components/ui/experience-skeleton";
import { getProfile } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import PortfolioVisibility from "./components/portfolio-visibity";
import { useAuthStore } from "@/stores/auth";

export function DisplayForm() {
  const { user_id } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user_id),
    enabled: !!user_id,
    retry: false,
  });

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  return (
    <div>
      <PortfolioVisibility visible={data?.visible} />
    </div>
  );
}
