'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChefHat, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign, 
  Utensils, 
  BarChart3, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Navigation,
  Edit,
  Trash2,
  Eye,
  Package,
  Star,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  Settings,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import Link from 'next/link';

interface Dish {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  image?: string;
  createdAt: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    calories: number;
    kitchen: string;
  }>;
  total: number;
  totalCalories: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  estimatedTime: number;
  timestamp: string;
  distance?: number;
  travelTime?: number;
  isCalculating?: boolean;
}

// Mock Google Gemini API function for distance calculation
const calculateDistanceAndETA = async (customerAddress: string, kitchenAddress: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const distances = [0.8, 1.2, 1.5, 2.1, 2.8, 3.2];
  const randomDistance = distances[Math.floor(Math.random() * distances.length)];
  const baseTime = 15;
  const travelTime = Math.round(randomDistance * 8);
  const totalETA = baseTime + travelTime;
  
  return {
    distance: randomDistance,
    eta: totalETA,
    travelTime: travelTime
  };
};

export default function CloudKitchenPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    prepTime: '',
    price: '',
    category: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDishes = localStorage.getItem('kitchenDishes');
    const savedOrders = localStorage.getItem('kitchenOrders');
    
    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
    } else {
      // Initialize with some default dishes
      const defaultDishes: Dish[] = [
        {
          id: 1,
          name: 'Quinoa Power Bowl',
          description: 'Nutritious quinoa bowl with fresh vegetables and protein',
          calories: 420,
          protein: 35,
          carbs: 45,
          fat: 18,
          prepTime: 15,
          price: 299,
          category: 'Protein Bowls',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Green Goddess Smoothie',
          description: 'Refreshing green smoothie packed with nutrients',
          calories: 280,
          protein: 20,
          carbs: 35,
          fat: 8,
          prepTime: 5,
          price: 199,
          category: 'Smoothies',
          status: 'active',
          createdAt: new Date().toISOString()
        }
      ];
      setDishes(defaultDishes);
      localStorage.setItem('kitchenDishes', JSON.stringify(defaultDishes));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    // Listen for new orders from customer app
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentOrder') {
        const newOrder = e.newValue ? JSON.parse(e.newValue) : null;
        if (newOrder && newOrder.status === 'confirmed') {
          const kitchenOrder: Order = {
            id: newOrder.id,
            customerName: 'Customer ' + newOrder.id.slice(-4),
            customerEmail: 'customer@example.com',
            customerPhone: '+91 98765 43210',
            customerAddress: '123 Health Street, Wellness City',
            items: newOrder.items,
            total: newOrder.total,
            totalCalories: newOrder.totalCalories,
            status: 'confirmed',
            estimatedTime: newOrder.estimatedTime || 25,
            timestamp: newOrder.timestamp,
          };
          
          setOrders(prev => {
            const updated = [...prev, kitchenOrder];
            localStorage.setItem('kitchenOrders', JSON.stringify(updated));
            return updated;
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAddDish = () => {
    if (newDish.name && newDish.calories && newDish.price) {
      const dish: Dish = {
        id: Date.now(),
        name: newDish.name,
        description: newDish.description,
        calories: parseInt(newDish.calories),
        protein: parseInt(newDish.protein) || 0,
        carbs: parseInt(newDish.carbs) || 0,
        fat: parseInt(newDish.fat) || 0,
        prepTime: parseInt(newDish.prepTime) || 15,
        price: parseFloat(newDish.price),
        category: newDish.category || 'Other',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      const updatedDishes = [...dishes, dish];
      setDishes(updatedDishes);
      localStorage.setItem('kitchenDishes', JSON.stringify(updatedDishes));
      
      setNewDish({
        name: '',
        description: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        prepTime: '',
        price: '',
        category: ''
      });
      setActiveTab('menu');
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, customerAddress?: string) => {
    setOrders(prevOrders => {
      const updated = prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as any, isCalculating: newStatus === 'preparing' }
          : order
      );
      localStorage.setItem('kitchenOrders', JSON.stringify(updated));
      return updated;
    });

    if (newStatus === 'preparing' && customerAddress) {
      try {
        const kitchenAddress = "123 Kitchen Street, Jaipur";
        const result = await calculateDistanceAndETA(customerAddress, kitchenAddress);
        
        setOrders(prevOrders => {
          const updated = prevOrders.map(order => 
            order.id === orderId 
              ? { 
                  ...order, 
                  status: newStatus as any,
                  distance: result.distance,
                  estimatedTime: result.eta,
                  travelTime: result.travelTime,
                  isCalculating: false
                }
              : order
          );
          localStorage.setItem('kitchenOrders', JSON.stringify(updated));
          return updated;
        });
      } catch (error) {
        console.error('Error calculating distance:', error);
      }
    }

    // Update customer tracking
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedCustomerOrders = storedOrders.map((order: any) => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedCustomerOrders));

    const currentOrder = localStorage.getItem('currentOrder');
    if (currentOrder) {
      const parsedCurrentOrder = JSON.parse(currentOrder);
      if (parsedCurrentOrder.id === orderId) {
        localStorage.setItem('currentOrder', JSON.stringify({
          ...parsedCurrentOrder,
          status: newStatus
        }));
      }
    }
  };

  const toggleDishStatus = (dishId: number) => {
    const updatedDishes = dishes.map(dish => 
      dish.id === dishId 
        ? { ...dish, status: (dish.status === 'active' ? 'inactive' : 'active') as 'active' | 'inactive' }
        : dish
    );
    setDishes(updatedDishes);
    localStorage.setItem('kitchenDishes', JSON.stringify(updatedDishes));
  };

  const deleteDish = (dishId: number) => {
    const updatedDishes = dishes.filter(dish => dish.id !== dishId);
    setDishes(updatedDishes);
    localStorage.setItem('kitchenDishes', JSON.stringify(updatedDishes));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'out_for_delivery':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'New Order';
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

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'confirmed':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'out_for_delivery';
      case 'out_for_delivery':
        return 'delivered';
      default:
        return currentStatus;
    }
  };

  const getNextStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case 'confirmed':
        return 'Start Preparing';
      case 'preparing':
        return 'Mark Ready';
      case 'ready':
        return 'Out for Delivery';
      case 'out_for_delivery':
        return 'Mark Delivered';
      default:
        return 'Update';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const kitchenStats = {
    totalOrders: orders.length,
    todayOrders: orders.filter(order => {
      const today = new Date().toDateString();
      return new Date(order.timestamp).toDateString() === today;
    }).length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    todayRevenue: orders.filter(order => {
      const today = new Date().toDateString();
      return new Date(order.timestamp).toDateString() === today;
    }).reduce((sum, order) => sum + order.total, 0),
    avgRating: 4.7,
    activeMenuItems: dishes.filter(dish => dish.status === 'active').length
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Kitchen Dashboard
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  Sign in to manage your cloud kitchen
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <Button 
                  onClick={() => signIn('google')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </Button>
                
                <div className="text-center text-sm text-gray-500 pt-4">
                  <p>Secure authentication powered by Google</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Green Bowl Kitchen</h1>
                  <p className="text-xs text-gray-500">Cloud Kitchen Dashboard</p>
                </div>
              </div>
              
              <nav className="hidden md:flex space-x-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'orders', label: 'Orders', icon: Package },
                  { id: 'menu', label: 'Menu', icon: Utensils }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id 
                          ? 'bg-orange-100 text-orange-700 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {orders.filter(o => o.status === 'confirmed').length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                )}
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>
              
              <Button
                onClick={() => signOut()}
                variant="outline"
                size="sm"
                className="border-gray-200 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Monitor your kitchen performance and orders</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{kitchenStats.totalOrders}</p>
                      <p className="text-sm text-green-600 mt-1">+{kitchenStats.todayOrders} today</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">₹{kitchenStats.totalRevenue.toFixed(0)}</p>
                      <p className="text-sm text-green-600 mt-1">+₹{kitchenStats.todayRevenue.toFixed(0)} today</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
                      <p className="text-3xl font-bold text-gray-900">{kitchenStats.avgRating}★</p>
                      <p className="text-sm text-gray-600 mt-1">Based on reviews</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Active Items</p>
                      <p className="text-3xl font-bold text-gray-900">{kitchenStats.activeMenuItems}</p>
                      <p className="text-sm text-gray-600 mt-1">Menu items</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600">Orders will appear here when customers place them</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-900">#{order.id.slice(-6)}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                <div className="text-sm text-gray-500">{order.customerEmail}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {order.items.map(item => item.name).join(', ')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">₹{order.total.toFixed(0)}</div>
                              <div className="text-sm text-orange-600">{order.totalCalories} cal</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {getTimeAgo(order.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600 mt-1">Track and update order status</p>
              </div>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders by ID or customer..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="confirmed">New Orders</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600">
                      {orders.length === 0 
                        ? "Orders from customers will appear here" 
                        : "Try adjusting your search or filter criteria"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</div>
                                <div className="text-sm text-gray-500">{getTimeAgo(order.timestamp)}</div>
                                {order.distance && (
                                  <div className="text-xs text-blue-600 mt-1">
                                    {order.distance}km • ETA: {order.estimatedTime}min
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                <div className="text-sm text-gray-500">{order.customerPhone}</div>
                                <div className="text-xs text-gray-400 mt-1">{order.customerAddress}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                {order.items.map((item, index) => (
                                  <div key={index} className="text-sm">
                                    <span className="text-gray-900">{item.name}</span>
                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">₹{order.total.toFixed(0)}</div>
                                <div className="text-sm text-orange-600">{order.totalCalories} cal</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(order.status)}>
                                  {getStatusText(order.status)}
                                </Badge>
                                {order.isCalculating && (
                                  <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {order.status !== 'delivered' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, getNextStatus(order.status), order.customerAddress)}
                                  className="bg-orange-500 hover:bg-orange-600"
                                  disabled={order.isCalculating}
                                >
                                  {order.isCalculating ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                  ) : (
                                    getNextStatusText(order.status)
                                  )}
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
                <p className="text-gray-600 mt-1">Manage your healthy menu items</p>
              </div>
              <Button
                onClick={() => setActiveTab('add-dish')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Dish
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <Card key={dish.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
                      </div>
                      <Badge 
                        className={dish.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                        }
                      >
                        {dish.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Calories:</span>
                          <span className="font-medium text-orange-600">{dish.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Protein:</span>
                          <span className="font-medium">{dish.protein}g</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">₹{dish.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prep:</span>
                          <span className="font-medium">{dish.prepTime}min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 hover:bg-orange-50"
                        onClick={() => toggleDishStatus(dish.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {dish.status === 'active' ? 'Hide' : 'Show'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="hover:bg-red-50 hover:text-red-600"
                        onClick={() => deleteDish(dish.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add-dish' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Dish</h1>
                <p className="text-gray-600 mt-1">Create a new healthy menu item</p>
              </div>
              <Button
                onClick={() => setActiveTab('menu')}
                variant="outline"
              >
                Back to Menu
              </Button>
            </div>

            <Card className="max-w-2xl border-0 shadow-md">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dishName" className="text-sm font-medium text-gray-700">Dish Name</Label>
                      <Input
                        id="dishName"
                        value={newDish.name}
                        onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                        placeholder="e.g., Quinoa Power Bowl"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                      <Input
                        id="category"
                        value={newDish.category}
                        onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                        placeholder="e.g., Protein Bowls"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                    <Textarea
                      id="description"
                      value={newDish.description}
                      onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                      placeholder="Describe your healthy dish..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="calories" className="text-sm font-medium text-gray-700">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newDish.calories}
                        onChange={(e) => setNewDish({...newDish, calories: e.target.value})}
                        placeholder="420"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="protein" className="text-sm font-medium text-gray-700">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={newDish.protein}
                        onChange={(e) => setNewDish({...newDish, protein: e.target.value})}
                        placeholder="35"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs" className="text-sm font-medium text-gray-700">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={newDish.carbs}
                        onChange={(e) => setNewDish({...newDish, carbs: e.target.value})}
                        placeholder="45"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat" className="text-sm font-medium text-gray-700">Fat (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={newDish.fat}
                        onChange={(e) => setNewDish({...newDish, fat: e.target.value})}
                        placeholder="18"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="prepTime" className="text-sm font-medium text-gray-700">Prep Time (minutes)</Label>
                      <Input
                        id="prepTime"
                        type="number"
                        value={newDish.prepTime}
                        onChange={(e) => setNewDish({...newDish, prepTime: e.target.value})}
                        placeholder="15"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price" className="text-sm font-medium text-gray-700">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newDish.price}
                        onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                        placeholder="299"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAddDish}
                    className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg font-semibold"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Dish to Menu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
