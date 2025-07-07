'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CreditCard, Smartphone, Loader2, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [orderData, setOrderData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const order = localStorage.getItem('currentOrder');
    if (order) {
      setOrderData(JSON.parse(order));
      
      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus('success');
        // Store order in orders history
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(JSON.parse(order));
        localStorage.setItem('orders', JSON.stringify(existingOrders));
      }, 3000);
    } else {
      router.push('/menu');
    }
  }, [router]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  if (paymentStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
            <p className="text-gray-600">Please wait while we process your payment...</p>
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Order Total:</strong> ${orderData.total.toFixed(2)}
              </p>
              <p className="text-sm text-orange-600">
                Payment Method: {orderData.paymentMethod === 'card' ? 'Credit Card' : 'UPI'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'success') {
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
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
              <p className="text-lg text-gray-600 mb-8">
                Your healthy meal order has been confirmed and is being prepared.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-green-800 mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">#{orderData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">${orderData.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Calories:</span>
                    <span className="font-semibold text-orange-600">{orderData.totalCalories} cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="font-semibold">{orderData.estimatedTime} minutes</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/track">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Track Your Order
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button variant="outline" className="w-full">
                    Order More Food
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Thank you for choosing healthy!</strong> Your meal is being prepared with fresh, 
                  organic ingredients by our certified cloud kitchen partners.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
