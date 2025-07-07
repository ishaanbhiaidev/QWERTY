'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Leaf, MapPin, CreditCard, Smartphone, Percent, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderData, setOrderData] = useState<any>(null);
  const router = useRouter();

  const coupons = [
    { code: 'HEALTHY10', discount: 10, description: '10% off on all orders' },
    { code: 'FIRST20', discount: 20, description: '20% off for first-time users' },
    { code: 'KETO15', discount: 15, description: '15% off on keto meals' },
    { code: 'PROTEIN25', discount: 25, description: '25% off on protein bowls' }
  ];

  // Mock cart data - in real app this would come from context/state
  const cartItems = [
    {
      id: 1,
      name: 'Quinoa Power Bowl',
      calories: 420,
      price: 12.99,
      quantity: 2,
      kitchen: 'Green Bowl Kitchen'
    },
    {
      id: 2,
      name: 'Green Goddess Smoothie',
      calories: 280,
      price: 8.99,
      quantity: 1,
      kitchen: 'Smoothie Station'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCalories = cartItems.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const deliveryFee = 2.99;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const total = subtotal + deliveryFee - discount;

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePayment = () => {
    const order = {
      id: Date.now().toString(),
      items: cartItems,
      total,
      totalCalories,
      paymentMethod,
      status: 'confirmed',
      estimatedTime: 25,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('currentOrder', JSON.stringify(order));
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Leaf & Fork</span>
            </Link>
            <div className="text-sm text-gray-600">
              Checkout
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-orange-500" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.kitchen} • {item.calories} cal each
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-orange-600">
                        {item.calories * item.quantity} cal
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-orange-100 text-orange-800">
                      Total Calories: {totalCalories} cal
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coupon Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Percent className="w-5 h-5 text-orange-500" />
                  <span>Apply Coupon</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    Apply
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Available Coupons:</p>
                  {coupons.map((coupon) => (
                    <div key={coupon.code} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <div>
                        <span className="font-medium text-orange-800">{coupon.code}</span>
                        <p className="text-xs text-orange-600">{coupon.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCouponCode(coupon.code)}
                      >
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Delivery */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="Enter your delivery address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="ZIP" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Estimated delivery: 25-30 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className="flex-1"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </Button>
                    <Button
                      variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('upi')}
                      className="flex-1"
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      UPI
                    </Button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
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
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="demo@upi" />
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Demo Payment Details:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Card:</strong> 1234 5678 9012 3456, CVV: 123</p>
                      <p><strong>UPI:</strong> demo@upi</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePayment}
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
            >
              Place Order - ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
