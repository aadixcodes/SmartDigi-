"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  DollarSign,
  Package,
} from "lucide-react";
import { useState } from "react";

// Mock data - Replace with actual API calls
const data = [
  { name: "Mon", orders: 4 },
  { name: "Tue", orders: 3 },
  { name: "Wed", orders: 7 },
  { name: "Thu", orders: 5 },
  { name: "Fri", orders: 8 },
  { name: "Sat", orders: 12 },
  { name: "Sun", orders: 10 },
];

const stats = {
  dailyOrders: 42,
  monthlyOrders: 1256,
  yearlyOrders: 15678,
  totalOrders: 45789,
  pendingPayments: 12500,
  completedPayments: 158900,
};

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r bg-card min-h-screen p-4">
          <div className="flex items-center gap-2 mb-8">
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-bold text-xl">SmartDini</span>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Customers
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <DollarSign className="h-4 w-4" />
              Payments
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Daily Orders
              </h3>
              <p className="text-2xl font-bold">{stats.dailyOrders}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Monthly Orders
              </h3>
              <p className="text-2xl font-bold">{stats.monthlyOrders}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Yearly Orders
              </h3>
              <p className="text-2xl font-bold">{stats.yearlyOrders}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Orders
              </h3>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Pending Payments
              </h3>
              <p className="text-2xl font-bold">₹{stats.pendingPayments}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Completed Payments
              </h3>
              <p className="text-2xl font-bold">₹{stats.completedPayments}</p>
            </Card>
          </div>

          {/* Charts and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}