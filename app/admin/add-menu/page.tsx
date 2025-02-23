"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, ImagePlus, Check } from "lucide-react";

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
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    rating: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resetForm = () => {
    setNewItem({
      name: '',
      price: '',
      category: '',
      rating: '',
      description: '',
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { ...newItem, image: imageFile });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
    }, 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-3 bg-[#FE9E0C]/10 rounded-full">
          <UtensilsCrossed className="h-6 w-6 text-[#FE9E0C]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Menu Item</h1>
      </motion.div>

      <Card className="p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-lg text-center">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#FE9E0C] transition-colors cursor-pointer"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 py-8">
                    <div className="p-4 bg-[#FE9E0C]/10 rounded-full">
                      <ImagePlus className="h-8 w-8 text-[#FE9E0C]" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">Click to upload image</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2.5">
              <Label htmlFor="name" className="text-base font-medium text-gray-700">Item Name</Label>
              <Input
                id="name"
                placeholder="e.g., Chicken Burger"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="h-12 border-gray-300 focus:border-[#FE9E0C] focus:ring-[#FE9E0C] hover:border-[#FE9E0C] bg-white [&:not(:placeholder-shown)]:bg-[#FE9E0C]/5"
                required
              />
            </div>
            
            <div className="space-y-2.5">
              <Label htmlFor="price" className="text-base font-medium text-gray-700">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 199"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="h-12 border-gray-300 focus:border-[#FE9E0C] focus:ring-[#FE9E0C]"
                required
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="category" className="text-base font-medium text-gray-700">Category</Label>
              <div className="relative">
                <select
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full h-12 border border-gray-300 rounded-lg focus:border-[#FE9E0C] focus:ring-1 focus:ring-[#FE9E0C] hover:border-[#FE9E0C] bg-white appearance-none px-4 pr-10 cursor-pointer [&:not(:placeholder-shown)]:bg-[#FE9E0C]/5"
                  style={{ outline: 'none' }}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Starter">Starter</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Dessert">Dessert</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="rating" className="text-base font-medium text-gray-700">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="e.g., 4.5"
                value={newItem.rating}
                onChange={(e) => setNewItem({ ...newItem, rating: e.target.value })}
                className="h-12 border-gray-300 focus:border-[#FE9E0C] focus:ring-[#FE9E0C]"
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2.5">
              <Label htmlFor="description" className="text-base font-medium text-gray-700">Description</Label>
              <textarea
                id="description"
                placeholder="Enter item description..."
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg focus:border-[#FE9E0C] focus:ring-1 focus:ring-[#FE9E0C] hover:border-[#FE9E0C] min-h-[120px] p-4 bg-white resize-none [&:not(:placeholder-shown)]:bg-[#FE9E0C]/5"
                style={{ outline: 'none' }}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              onClick={resetForm}
              className="bg-[#FE9E0C] hover:bg-[#FE9E0C]/90 text-white px-8 h-12 text-base"
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              className="bg-[#FE9E0C] hover:bg-[#FE9E0C]/90 text-white px-8 h-12 text-base"
            >
              Add Item
            </Button>
          </div>
        </form>
      </Card>

      {/* Centered Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 flex items-center gap-3 relative z-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Success!</h3>
                <p className="text-gray-600">Item has been added successfully</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 