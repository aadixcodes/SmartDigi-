"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato sauce',
    price: 399,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices',
    price: 299,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=500',
  },
];

export default function MenuPage() {
  const { items, addItem, updateQuantity, total } = useCart();
  const [selectedItems, setSelectedItems] = useState<{[key: string]: boolean}>({});

  const handleAddItem = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    setSelectedItems({ ...selectedItems, [item.id]: true });
  };

  const getItemQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Our Menu</h1>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex md:flex-col">
                <div className="w-24 h-24 md:w-full md:h-48 relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-black">₹{item.price}</span>
                    {!selectedItems[item.id] ? (
                      <Button 
                        onClick={() => handleAddItem(item)}
                        className="bg-[#FE9E0C] hover:bg-[#E08900] text-white"
                      >
                        Add
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="border-[#FE9E0C] text-[#FE9E0C] hover:bg-[#FFF5E9]"
                          onClick={() => {
                            const currentQty = getItemQuantity(item.id);
                            if (currentQty > 1) {
                              updateQuantity(item.id, currentQty - 1);
                            } else {
                              setSelectedItems({ ...selectedItems, [item.id]: false });
                            }
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-black">{getItemQuantity(item.id)}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="border-[#FE9E0C] text-[#FE9E0C] hover:bg-[#FFF5E9]"
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-black">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">{items.length} items</span>
            </div>
            <span className="font-bold text-black">₹{total()}</span>
            <Link href="/checkout">
              <Button className="bg-[#FE9E0C] hover:bg-[#E08900] text-white">
                Next
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}