import React from "react";
import { User } from "@/interfaces/user";

interface UsersProps {
  users: User[];
}

const Users = ({ users }: UsersProps) => {
  return <div>Users</div>;
};

export default Users;
