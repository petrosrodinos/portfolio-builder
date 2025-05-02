import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import Loading from "../loading";
import { ReferredUser } from "@/interfaces/affiliate";

interface ReferedUsersProps {
  referredUsers: ReferredUser[];
  isLoading: boolean;
}

const ReferedUsers = ({ referredUsers, isLoading }: ReferedUsersProps) => {
  if (isLoading) {
    return <Loading type="table" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referred Users</CardTitle>
        <CardDescription>Track your referrals and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[180px]">Email</TableHead>
                <TableHead className="min-w-[120px]">Joined</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="text-right min-w-[100px]">Subscription</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.users.full_name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{user.users.email}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(user.created_at))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.users.subscriptions?.status === "active" ? "default" : "secondary"
                      }
                      className="whitespace-nowrap"
                    >
                      {user.users.subscriptions?.status || "No subscription"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.users.subscriptions?.prices?.products?.name || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferedUsers;
