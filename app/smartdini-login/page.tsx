"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Coffee, Pizza, UtensilsCrossed, Cookie, Sandwich } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.email === "aditya@smartdini" && credentials.password === "virat@18") {
      router.push("/admin");
    } else {
      setError("Invalid email or password");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Background decorative elements
  const decorativeIcons = [
    { icon: Pizza, style: "top-20 left-20 rotate-[-15deg]" },
    { icon: Coffee, style: "top-32 right-24 rotate-12" },
    { icon: UtensilsCrossed, style: "bottom-24 left-32 rotate-[-8deg]" },
    { icon: Cookie, style: "top-1/2 right-16 rotate-12" },
    { icon: Sandwich, style: "bottom-32 right-32 rotate-[-12deg]" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden relative">
      {/* Decorative Background Icons */}
      {decorativeIcons.map((Item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
          className={`absolute text-[#FE9E0C] ${Item.style}`}
        >
          <Item.icon size={48} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 backdrop-blur-sm bg-white/95">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-[#FE9E0C]"
            >
              SmartDini
            </motion.h1>
            <p className="text-gray-600 mt-2">Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="h-12 border-gray-300 focus:border-[#FE9E0C] focus:ring-[#FE9E0C] hover:border-[#FE9E0C]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="h-12 border-gray-300 focus:border-[#FE9E0C] focus:ring-[#FE9E0C] hover:border-[#FE9E0C] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FE9E0C] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button 
              type="submit"
              className="w-full bg-[#FE9E0C] hover:bg-[#FE9E0C]/90 text-white h-12 text-base font-medium"
            >
              Login
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
} 