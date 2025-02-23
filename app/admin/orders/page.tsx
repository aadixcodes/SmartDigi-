"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle } from "lucide-react";

// Sample data - replace with your actual data
const orders = [
  {
    id: "1",
    customer: "John Doe",
    items: [
      { name: "Burger", quantity: 2, price: 199 },
      { name: "Fries", quantity: 1, price: 99 }
    ],
    total: 497,
    status: "pending",
    time: "10:30 AM"
  },
  // Add more orders...
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Implement status update logic here
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-gray-900"
      >
        Orders Management
      </motion.h1>

      {/* Status Filters */}
      <div className="flex gap-4">
        {["all", "pending", "completed"].map((status) => (
          <Button
            key={status}
            onClick={() => setSelectedStatus(status)}
            variant={selectedStatus === status ? "default" : "outline"}
            className={selectedStatus === status ? "bg-[#FE9E0C]" : ""}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.time}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">₹{order.total}</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border rounded-lg px-3 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 