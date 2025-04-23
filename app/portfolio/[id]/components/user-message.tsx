"use client";

import { useAuthStore } from "stores/auth";
import { useParams } from "next/navigation";
import Incomplete from "./incomplete";
import NotFound from "./not-found";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface UserMessageProps {
  visible?: boolean;
  children?: any;
}

const UserMessage = ({ visible, children }: UserMessageProps) => {
  const { user_id } = useAuthStore();
  const { id } = useParams();

  if (!visible && user_id === id) {
    return (
      <>
        <div className="flex justify-center mt-20">
          <Alert className="max-w-md border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500">
            <AlertTitle>
              Your portfolio is private and only visible to you.
              <br />
              You can make it public by going to your{" "}
              <Link
                className="underline font-bold hover:text-yellow-500 transition-colors"
                href="/console/dashboard"
              >
                Dashboard.
              </Link>
            </AlertTitle>
          </Alert>
        </div>
        {children}
      </>
    );
  }

  if (user_id === id) {
    return <Incomplete />;
  }

  return <NotFound />;
};

export default UserMessage;
