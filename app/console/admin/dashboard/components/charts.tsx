"use client";

import { Globe, Briefcase, Calendar, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@/interfaces/user";

interface ChartsProps {
  users: User[];
}

const Charts = ({ users }: ChartsProps) => {
  const ageData = [
    { age: "18-24", users: 400 },
    { age: "25-34", users: 800 },
    { age: "35-44", users: 600 },
    { age: "45-54", users: 300 },
    { age: "55+", users: 200 },
  ];

  const userCreationData = [
    { date: "2024-01", users: 100 },
    { date: "2024-02", users: 250 },
    { date: "2024-03", users: 400 },
    { date: "2024-04", users: 600 },
    { date: "2024-05", users: 800 },
    { date: "2024-06", users: 1000 },
  ];

  const professionData = [
    { name: "Software", value: 35 },
    { name: "Healthcare", value: 20 },
    { name: "Education", value: 15 },
    { name: "Business", value: 20 },
    { name: "Other", value: 10 },
  ];

  const countryData = [
    { country: "USA", users: 1000 },
    { country: "UK", users: 500 },
    { country: "Canada", users: 300 },
    { country: "Australia", users: 200 },
    { country: "Germany", users: 400 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div>
      {/* User Demographics Charts */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* User Creation Trend */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              User Creation Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userCreationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Age Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Profession Distribution */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Profession Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={professionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {professionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Country Distribution */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Country Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Charts;
