"use client";

import { Globe, Briefcase, Calendar, Users, CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "@/interfaces/user";
import { getUserDemographics } from "@/lib/admin_statistics";
import { PIE_CHART_COLORS } from "@/constants/charts";

interface ChartsProps {
  users: User[];
}

const Charts = ({ users }: ChartsProps) => {
  const { userCreationData, ageData, professionData, countryData, subscriptionData } = getUserDemographics(users);

  return (
    <div>
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
                      <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
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
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="users"
                    label={({ country, percent }) => `${country} ${(percent * 100).toFixed(0)}%`}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscription Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={subscriptionData} cx="50%" cy="50%" labelLine={true} outerRadius={80} innerRadius={40} fill="#8884d8" dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {subscriptionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                        style={{
                          stroke: "#fff",
                          strokeWidth: 1,
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`${value} users`, name]} />
                  <Legend verticalAlign="bottom" height={36} formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Charts;
