"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Package, User, DollarSign, Check, X } from "lucide-react";

// Sample new orders
const newOrders = [
  {
    id: "1",
    customer: "John Doe",
    items: [
      { name: "Chicken Burger", quantity: 2, price: 199 },
      { name: "French Fries", quantity: 1, price: 99 }
    ],
    total: 497,
    time: "Just now",
    tableNo: "A1"
  },
  // Add more new orders...
];

export default function NewOrdersPage() {
  const handleAccept = (orderId: string) => {
    console.log(`Accepting order ${orderId}`);
  };

  const handleReject = (orderId: string) => {
    console.log(`Rejecting order ${orderId}`);
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-gray-900"
      >
        New Orders
      </motion.h1>

      <div className="space-y-4">
        {newOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border-2 border-[#FE9E0C]/20 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#FE9E0C]/10 rounded-full">
                      <Package className="h-5 w-5 text-[#FE9E0C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">New Order #{order.id}</h3>
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

                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#FE9E0C]" />
                    <span className="text-xl font-bold">₹{order.total}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAccept(order.id)}
                      className="bg-green-500 hover:bg-green-600 text-white gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(order.id)}
                      variant="outline"
                      className="text-red-500 border-red-500 hover:bg-red-50 gap-2"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 