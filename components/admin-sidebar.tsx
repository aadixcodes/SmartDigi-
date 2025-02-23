"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Menu,
  X,
  Bell
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "New Orders", href: "/admin/new-orders", icon: <Bell className="h-5 w-5" /> },
    { name: "Orders", href: "/admin/orders", icon: <ClipboardList className="h-5 w-5" /> },
    { name: "Add Menu", href: "/admin/add-menu", icon: <UtensilsCrossed className="h-5 w-5" /> },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border shadow-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        } lg:hidden`}
      >
        <Menu className="h-6 w-6" />
      </button>

      <motion.nav
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (isMobile ? "-100%" : 0),
          opacity: isOpen ? 1 : (isMobile ? 0 : 1)
        }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-72 border-r bg-white z-40 shadow-lg"
      >
        <div className="h-16 px-6 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FE9E0C]">SmartDini</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center gap-3 mx-3 px-4 h-12 rounded-lg transition-all ${
                pathname === item.href
                  ? "bg-[#FE9E0C]/10 text-[#FE9E0C] font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
} 