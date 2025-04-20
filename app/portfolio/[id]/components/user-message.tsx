"use client";

import { useAuthStore } from "stores/auth";
import { useParams } from "next/navigation";
import Incomplete from "./incomplete";
import NotFound from "./not-found";

const UserMessage = () => {
  const { user_id } = useAuthStore();
  const { id } = useParams();

  if (user_id === id) {
    return <Incomplete />;
  }

  return <NotFound />;
};

export default UserMessage;
