'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Truck, ChefHat, MapPin, Leaf, Phone } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  items: any[];
  total: number;
  totalCalories: number;
  status: string;
  estimatedTime: number;
  timestamp: string;
}

export default function TrackOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState('confirmed');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
    
    if (storedOrders.length > 0) {
      const latestOrder = storedOrders[storedOrders.length - 1];
      setCurrentOrder(latestOrder);
      setOrderStatus(latestOrder.status || 'confirmed');
    }

    // Listen for order status updates from kitchen dashboard
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'orders' || e.key === 'currentOrder') {
        const updatedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(updatedOrders);
        
        if (updatedOrders.length > 0) {
          const latestOrder = updatedOrders[updatedOrders.length - 1];
          setCurrentOrder(latestOrder);
          setOrderStatus(latestOrder.status || 'confirmed');
        }

        // Check current order specifically
        const currentOrderData = localStorage.getItem('currentOrder');
        if (currentOrderData) {
          const parsedCurrentOrder = JSON.parse(currentOrderData);
          setCurrentOrder(parsedCurrentOrder);
          setOrderStatus(parsedCurrentOrder.status || 'confirmed');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Poll for updates every 5 seconds (in case storage events don't fire)
    const interval = setInterval(() => {
      const currentOrderData = localStorage.getItem('currentOrder');
      if (currentOrderData) {
        const parsedCurrentOrder = JSON.parse(currentOrderData);
        if (parsedCurrentOrder.status !== orderStatus) {
          setCurrentOrder(parsedCurrentOrder);
          setOrderStatus(parsedCurrentOrder.status);
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [orderStatus]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: CheckCircle,
          title: 'Order Confirmed',
          description: 'Your order has been confirmed and sent to the kitchen',
          color: 'text-green-500',
          bgColor: 'bg-green-100'
        };
      case 'preparing':
        return {
          icon: ChefHat,
          title: 'Preparing Your Meal',
          description: 'Our chefs are preparing your healthy meal with fresh ingredients',
          color: 'text-orange-500',
          bgColor: 'bg-orange-100'
        };
      case 'ready':
        return {
          icon: Clock,
          title: 'Ready for Pickup',
          description: 'Your meal is ready and waiting for delivery pickup',
          color: 'text-blue-500',
          bgColor: 'bg-blue-100'
        };
      case 'out_for_delivery':
        return {
          icon: Truck,
          title: 'Out for Delivery',
          description: 'Your order is on the way to your location',
          color: 'text-purple-500',
          bgColor: 'bg-purple-100'
        };
      case 'delivered':
        return {
          icon: CheckCircle,
          title: 'Delivered',
          description: 'Your healthy meal has been delivered. Enjoy!',
          color: 'text-green-500',
          bgColor: 'bg-green-100'
        };
      default:
        return {
          icon: Clock,
          title: 'Processing',
          description: 'Processing your order',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 20;
      case 'preparing':
        return 40;
      case 'ready':
        return 60;
      case 'out_for_delivery':
        return 80;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  const statusInfo = getStatusInfo(orderStatus);
  const StatusIcon = statusInfo.icon;
  const progressPercentage = getProgressPercentage(orderStatus);

  if (!currentOrder) {
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

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-gray-400 mb-4">
            <Clock className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Active Orders</h2>
          <p className="text-gray-600 mb-8">You don't have any orders to track right now.</p>
          <Link href="/menu">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              Track Order
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 ${statusInfo.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <StatusIcon className={`w-10 h-10 ${statusInfo.color}`} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{statusInfo.title}</h1>
              <p className="text-gray-600">{statusInfo.description}</p>
              
              {orderStatus !== 'delivered' && (
                <div className="mt-4">
                  <Badge className="bg-orange-100 text-orange-800">
                    ETA: {currentOrder.estimatedTime} minutes
                  </Badge>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Order Progress</span>
                <span className="text-sm text-gray-500">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {['confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].map((status, index) => {
                  const isActive = getProgressPercentage(status) <= progressPercentage;
                  const isCurrent = status === orderStatus;
                  
                  return (
                    <div key={status} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-orange-200' : ''}`}>
                        {isActive ? '✓' : index + 1}
                      </div>
                      <span className={`text-xs mt-2 text-center ${
                        isActive ? 'text-orange-600 font-medium' : 'text-gray-400'
                      }`}>
                        {status === 'confirmed' ? 'Confirmed' :
                         status === 'preparing' ? 'Preparing' :
                         status === 'ready' ? 'Ready' :
                         status === 'out_for_delivery' ? 'Delivery' : 'Delivered'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">#{currentOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">${currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Calories:</span>
                    <span className="font-semibold text-orange-600">{currentOrder.totalCalories} cal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order Time:</span>
                    <span>{new Date(currentOrder.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className={
                      orderStatus === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      orderStatus === 'preparing' ? 'bg-orange-100 text-orange-800' :
                      orderStatus === 'ready' ? 'bg-purple-100 text-purple-800' :
                      orderStatus === 'out_for_delivery' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {statusInfo.title}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">123 Health Street</p>
                      <p className="text-gray-600">Wellness City, WC 12345</p>
                    </div>
                  </div>
                  {orderStatus === 'out_for_delivery' && (
                    <div className="flex items-center space-x-2 mt-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>Delivery Partner: +1 (555) 123-4567</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Your Healthy Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.kitchen} • {item.calories} cal each
                    </p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-orange-600">
                      {item.calories * item.quantity} cal
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        {orderStatus === 'out_for_delivery' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Live Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Live map tracking would appear here</p>
                  <p className="text-sm text-gray-500">Integration with Google Maps API</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/menu" className="flex-1">
            <Button variant="outline" className="w-full">
              Order Again
            </Button>
          </Link>
          {orderStatus === 'delivered' && (
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              Rate Your Meal
            </Button>
          )}
          <Button variant="outline" className="flex-1">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
