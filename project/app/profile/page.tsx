'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Leaf, User, MapPin, Phone, Mail, Clock, Star, Heart, Edit, Save, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserData {
  name: string;
  email: string;
  phone: string;
  id: string;
  address?: string;
  city?: string;
  zip?: string;
  joinDate?: string;
}

interface Order {
  id: string;
  items: any[];
  total: number;
  totalCalories: number;
  status: string;
  estimatedTime: number;
  timestamp: string;
  kitchen: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setEditedUser(parsedUser);

    // Load user orders
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, [router]);

  const handleSave = () => {
    if (editedUser) {
      localStorage.setItem('user', JSON.stringify(editedUser));
      setUser(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalCalories = orders.reduce((sum, order) => sum + order.totalCalories, 0);
  const avgCaloriesPerOrder = totalOrders > 0 ? Math.round(totalCalories / totalOrders) : 0;

  if (!user) {
    return <div>Loading...</div>;
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
              My Profile
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-orange-500" />
                    <span>Profile Information</span>
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">Health Enthusiast</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedUser?.name || ''}
                        onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedUser?.email || ''}
                        onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedUser?.phone || ''}
                        onChange={(e) => setEditedUser(prev => prev ? {...prev, phone: e.target.value} : null)}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={editedUser?.address || ''}
                        onChange={(e) => setEditedUser(prev => prev ? {...prev, address: e.target.value} : null)}
                        placeholder="Enter your address"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.address || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editedUser?.city || ''}
                          onChange={(e) => setEditedUser(prev => prev ? {...prev, city: e.target.value} : null)}
                          placeholder="City"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.city || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      {isEditing ? (
                        <Input
                          id="zip"
                          value={editedUser?.zip || ''}
                          onChange={(e) => setEditedUser(prev => prev ? {...prev, zip: e.target.value} : null)}
                          placeholder="ZIP"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.zip || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-orange-500" />
                  <span>Health Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{totalOrders}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{avgCaloriesPerOrder}</div>
                    <div className="text-sm text-gray-600">Avg Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">${totalSpent.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{Math.round(totalCalories / 1000)}K</div>
                    <div className="text-sm text-gray-600">Total Calories</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Order History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Clock className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">Start your healthy journey by placing your first order!</p>
                    <Link href="/menu">
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Browse Menu
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-orange-600">{order.totalCalories} cal</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-gray-500">
                                {item.calories * item.quantity} cal
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{new Date(order.timestamp).toLocaleDateString()}</span>
                          <div className="flex space-x-2">
                            <Link href="/track">
                              <Button size="sm" variant="outline">
                                Track Order
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">🥗</div>
                    <div className="text-sm font-medium">Vegetarian</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🥑</div>
                    <div className="text-sm font-medium">Keto</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">💪</div>
                    <div className="text-sm font-medium">High Protein</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-2">🌱</div>
                    <div className="text-sm font-medium">Organic</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
