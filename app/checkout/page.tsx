"use client";

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, Ban as Bank } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = () => {
    // Simulate payment processing
    toast({
      title: "Payment Successful!",
      description: "Your order has been placed successfully.",
    });
    clearCart();
    router.push('/');
  };

  if (items.length === 0) {
    router.push('/menu');
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-black">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-black">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-black">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-black">
                  <span>Total</span>
                  <span>₹{total()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Payment Method</h2>
            <RadioGroup
              defaultValue="card"
              className="space-y-4"
              onValueChange={setPaymentMethod}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  UPI
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="flex items-center gap-2">
                  <Bank className="h-4 w-4" />
                  Net Banking
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="mt-6">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" placeholder="username@upi" />
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="mt-6">
                <Label htmlFor="bank">Select Bank</Label>
                <select
                  id="bank"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>
            )}

            <Button
              className="w-full mt-8 bg-[#FE9E0C] hover:bg-[#E08900] text-white"
              onClick={handlePayment}
            >
              Pay ₹{total()}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}