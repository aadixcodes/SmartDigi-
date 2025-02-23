"use client";

import { motion } from "framer-motion";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with your actual data
const data = [
  { name: 'Mon', orders: 4 },
  { name: 'Tue', orders: 7 },
  { name: 'Wed', orders: 5 },
  { name: 'Thu', orders: 8 },
  { name: 'Fri', orders: 12 },
  { name: 'Sat', orders: 15 },
  { name: 'Sun', orders: 10 },
];

const stats = [
  {
    title: "Total Orders",
    value: "45",
    icon: <ClipboardList className="h-6 w-6 text-[#FE9E0C]" />,
  },
  {
    title: "Pending Orders",
    value: "12",
    icon: <Clock className="h-6 w-6 text-[#FE9E0C]" />,
  },
  {
    title: "Completed Orders",
    value: "33",
    icon: <CheckCircle className="h-6 w-6 text-[#FE9E0C]" />,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-gray-900"
      >
        Dashboard Overview
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2 text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-[#FE9E0C]/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Orders</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#FE9E0C" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}