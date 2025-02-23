"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Star, X } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

// Sample data - replace with your actual data
const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh vegetables",
    price: 199,
    rating: 4.5,
    image: "/burger.jpg",
    category: "Lunch"
  },
  // Add more items...
];

export default function AddMenuPage() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement add/edit logic here
    console.log("Submitting:", newItem);
    setIsEditing(null);
    setNewItem({});
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-gray-900"
      >
        Menu Management
      </motion.h1>

      {/* Add/Edit Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newItem.name || ""}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={newItem.price || ""}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full border rounded-lg p-2"
                value={newItem.category || ""}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Starter">Starter</option>
                <option value="Lunch">Lunch</option>
                <option value="Drinks">Drinks</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={newItem.rating || ""}
                onChange={(e) => setNewItem({ ...newItem, rating: Number(e.target.value) })}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full border rounded-lg p-2"
                value={newItem.description || ""}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                accept="image/*"
                required={!isEditing}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(null);
                  setNewItem({});
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-[#FE9E0C]">
              {isEditing ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Menu Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsEditing(item.id);
                      setNewItem(item);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-[#FE9E0C]">₹{item.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{item.rating}</span>
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