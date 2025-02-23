"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Package, User, DollarSign } from "lucide-react";

// Sample data with more orders
const orders = [
  {
    id: "1",
    customer: "John Doe",
    items: [
      { name: "Chicken Burger", quantity: 2, price: 199 },
      { name: "French Fries", quantity: 1, price: 99 },
      { name: "Coca Cola", quantity: 2, price: 49 }
    ],
    total: 595,
    status: "pending",
    time: "10:30 AM",
    tableNo: "A1"
  },
  {
    id: "2",
    customer: "Sarah Smith",
    items: [
      { name: "Veg Pizza", quantity: 1, price: 299 },
      { name: "Garlic Bread", quantity: 1, price: 149 }
    ],
    total: 448,
    status: "completed",
    time: "10:45 AM",
    tableNo: "B3"
  },
  {
    id: "3",
    customer: "Mike Johnson",
    items: [
      { name: "Pasta Alfredo", quantity: 2, price: 249 },
      { name: "Brownie", quantity: 1, price: 129 }
    ],
    total: 627,
    status: "pending",
    time: "11:00 AM",
    tableNo: "C2"
  },
  {
    id: "4",
    customer: "Emily Davis",
    items: [
      { name: "Grilled Sandwich", quantity: 1, price: 179 },
      { name: "Ice Tea", quantity: 2, price: 79 }
    ],
    total: 337,
    status: "completed",
    time: "11:15 AM",
    tableNo: "A4"
  },
  {
    id: "5",
    customer: "Alex Wilson",
    items: [
      { name: "Chicken Wings", quantity: 2, price: 299 },
      { name: "Mojito", quantity: 2, price: 149 }
    ],
    total: 896,
    status: "pending",
    time: "11:30 AM",
    tableNo: "D1"
  }
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">
              {orders.filter(o => o.status === "completed").length} Completed
            </span>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 font-medium">
              {orders.filter(o => o.status === "pending").length} Pending
            </span>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Orders Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Pending Orders
          </h2>
          <div className="space-y-4">
            {orders
              .filter(order => order.status === "pending")
              .map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#FE9E0C]/10 rounded-full">
                            <Package className="h-5 w-5 text-[#FE9E0C]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              {order.time}
                              <span className="px-2">•</span>
                              <User className="h-4 w-4" />
                              {order.customer}
                              <span className="px-2">•</span>
                              Table {order.tableNo}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-[#FE9E0C]/10 rounded-full flex items-center justify-center text-xs text-[#FE9E0C] font-medium">
                                  {item.quantity}
                                </span>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <span className="text-gray-600">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-[#FE9E0C]" />
                          <span className="text-xl font-bold">₹{order.total}</span>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`
                            px-4 py-2 rounded-lg border-2 cursor-pointer
                            ${order.status === 'completed' 
                              ? 'border-green-500 text-green-700 bg-green-50' 
                              : 'border-orange-500 text-orange-700 bg-orange-50'
                            }
                          `}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Completed Orders Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Completed Orders
          </h2>
          <div className="space-y-4">
            {orders
              .filter(order => order.status === "completed")
              .map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#FE9E0C]/10 rounded-full">
                            <Package className="h-5 w-5 text-[#FE9E0C]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              {order.time}
                              <span className="px-2">•</span>
                              <User className="h-4 w-4" />
                              {order.customer}
                              <span className="px-2">•</span>
                              Table {order.tableNo}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-[#FE9E0C]/10 rounded-full flex items-center justify-center text-xs text-[#FE9E0C] font-medium">
                                  {item.quantity}
                                </span>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <span className="text-gray-600">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-[#FE9E0C]" />
                          <span className="text-xl font-bold">₹{order.total}</span>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`
                            px-4 py-2 rounded-lg border-2 cursor-pointer
                            ${order.status === 'completed' 
                              ? 'border-green-500 text-green-700 bg-green-50' 
                              : 'border-orange-500 text-orange-700 bg-orange-50'
                            }
                          `}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 