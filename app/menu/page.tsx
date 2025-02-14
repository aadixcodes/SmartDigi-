"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { Plus, Minus, ShoppingCart, ArrowRight, Star, Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const menuItems = [
  // Starters
  { 
    id: '1', 
    name: 'Spring Rolls', 
    category: 'Starter', 
    description: 'Crispy vegetable spring rolls served with sweet chili sauce', 
    price: 199, 
    rating: 4.2, 
    image: 'https://s.lightorangebean.com/media/20240914144947/Thai-Veggie-Spring-Rolls_done.png'
  },
  { 
    id: '2', 
    name: 'Chicken Wings', 
    category: 'Starter', 
    description: 'Spicy fried chicken wings with blue cheese dip', 
    price: 299, 
    rating: 4.5, 
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800'
  },
  // Lunch
  { 
    id: '3', 
    name: 'Grilled Chicken', 
    category: 'Lunch', 
    description: 'Herb-marinated grilled chicken with roasted vegetables', 
    price: 399, 
    rating: 4.8, 
    image: 'https://www.allrecipes.com/thmb/QYJhpLC7M7tz8aAAlel_38159So=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1017459-spicy-grilled-chicken-Lela-4x3-1-e462732541e74ceeadb8edbe62d92423.jpg'
  },
  { 
    id: '4', 
    name: 'Beef Burger', 
    category: 'Lunch', 
    description: 'Classic beef burger with cheese, lettuce, and fries', 
    price: 349, 
    rating: 4.6, 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800'
  },
  // Drinks
  { 
    id: '5', 
    name: 'Mango Lassi', 
    category: 'Drinks', 
    description: 'Traditional yogurt-based drink with mango', 
    price: 149, 
    rating: 4.7, 
    image: 'https://media.bluediamond.com/uploads/2023/01/24175942/14_Dairy-Free_Mango_Lassi-scaled.jpg'
  },
  { 
    id: '6', 
    name: 'Iced Tea', 
    category: 'Drinks', 
    description: 'Freshly brewed iced tea with lemon', 
    price: 99, 
    rating: 4.3, 
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800'
  },
  // Desserts
  { 
    id: '7', 
    name: 'Gulab Jamun', 
    category: 'Dessert', 
    description: 'Traditional Indian sweet in sugar syrup', 
    price: 129, 
    rating: 4.9, 
    image: 'https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg'
  },
];

export default function MenuPage() {
  const { items, addItem, updateQuantity, total } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Starter', 'Lunch', 'Drinks', 'Dessert'];
  
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FE9E0C] mb-2">SmartDini</h1>
          <p className="text-lg text-gray-600 mb-6">Please choose your menu</p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FE9E0C]/50 focus:border-[#FE9E0C]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-[#FE9E0C]/50 focus:border-[#FE9E0C]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </header>

        {selectedCategory === 'All' ? (
          categories.slice(1).map(category => (
            <section key={category} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {menuItems
                  .filter(item => 
                    item.category === category &&
                    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((item, index) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-lg max-w-[255px] h-[330px] mx-auto">
                          <div className="relative h-48">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          
                          <div className="p-3 h-[69px] flex flex-col justify-between">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                              <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-green-500 fill-current" />
                                <span className="text-xs font-medium text-gray-700">
                                  {item.rating}/5
                                </span>
                              </div>
                              <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                            </div>
                          </div>

                          <div className="px-3 mt-2 pb-3">
                            {quantity === 0 ? (
                              <Button
                                onClick={() => addItem({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  quantity: 1,
                                  image: item.image,
                                })}
                                className="w-full bg-[#FE9E0C] hover:bg-[#E08900] text-white rounded-lg py-1 text-xs"
                              >
                                Add to Cart
                              </Button>
                            ) : (
                              <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg py-1">
                                <Button
                                  variant="ghost"
                                  className="h-6 w-6 rounded-full text-[#FE9E0C] hover:bg-[#FFF5E9] p-0"
                                  onClick={() => updateQuantity(item.id, quantity - 1)}
                                >
                                  <Minus className="h-6 w-6" />
                                </Button>
                                <span className="text-xl mx-4 font-medium">{quantity}</span>
                                <Button
                                  variant="ghost"
                                  className="h-6 w-6 rounded-full text-[#FE9E0C] hover:bg-[#FFF5E9] p-0"
                                  onClick={() => updateQuantity(item.id, quantity + 1)}
                                >
                                  <Plus className="h-6 w-6" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
              </div>
            </section>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredItems.map((item, index) => {
              const quantity = getItemQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-lg max-w-[255px] h-[330px] mx-auto">
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="p-3 h-[69px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{item.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-green-500 fill-current" />
                          <span className="text-xs font-medium text-gray-700">
                            {item.rating}/5
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                      </div>
                    </div>

                    <div className="px-3 mt-2 pb-3">
                      {quantity === 0 ? (
                        <Button
                          onClick={() => addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            image: item.image,
                          })}
                          className="w-full bg-[#FE9E0C] hover:bg-[#E08900] text-white rounded-lg py-1 text-xs"
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg py-1">
                          <Button
                            variant="ghost"
                            className="h-6 w-6 rounded-full text-[#FE9E0C] hover:bg-[#FFF5E9] p-0"
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium">{quantity}</span>
                          <Button
                            variant="ghost"
                            className="h-6 w-6 rounded-full text-[#FE9E0C] hover:bg-[#FFF5E9] p-0"
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 py-6 shadow-2xl">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#FE9E0C]/10 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-[#FE9E0C]" />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">{items.length} Items in Cart</p>
                <p className="text-gray-600">Total: ₹{total()}</p>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="bg-[#FE9E0C] hover:bg-[#E08900] text-white rounded-full px-8 py-6 gap-2 text-lg font-medium transition-all hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                Continue to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Menu Card Component
function MenuCard({ 
  item, 
  selected, 
  onAdd, 
  quantity, 
  onUpdateQuantity, 
  onRemove 
}: {
  item: typeof menuItems[0];
  selected: boolean;
  onAdd: (item: typeof menuItems[0]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-900">{item.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
          {!selected ? (
            <Button
              onClick={() => onAdd(item)}
              className="bg-[#FE9E0C] hover:bg-[#E08900] text-white rounded-full px-6 py-2 text-base font-medium"
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-[#FE9E0C] hover:bg-[#FFF5E9] h-8 w-8"
                onClick={() => {
                  if (quantity > 1) {
                    onUpdateQuantity(item.id, quantity - 1);
                  } else {
                    onRemove();
                  }
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold text-gray-900">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-[#FE9E0C] hover:bg-[#FFF5E9] h-8 w-8"
                onClick={() => onUpdateQuantity(item.id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}