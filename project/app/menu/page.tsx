'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Plus, Minus, ShoppingCart, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  image: string;
  category: string;
  kitchen: string;
  rating: number;
  prepTime: number;
  tags: string[];
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Quinoa Power Bowl',
      description: 'Quinoa, grilled chicken, avocado, cherry tomatoes, and tahini dressing',
      calories: 420,
      protein: 35,
      carbs: 45,
      fat: 18,
      price: 12.99,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'protein-bowls',
      kitchen: 'Green Bowl Kitchen',
      rating: 4.8,
      prepTime: 15,
      tags: ['High Protein', 'Gluten Free']
    },
    {
      id: 2,
      name: 'Keto Salmon Salad',
      description: 'Grilled salmon, mixed greens, cucumber, feta cheese, olive oil dressing',
      calories: 380,
      protein: 32,
      carbs: 8,
      fat: 26,
      price: 15.99,
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'keto',
      kitchen: 'Keto Corner',
      rating: 4.7,
      prepTime: 12,
      tags: ['Keto', 'Low Carb', 'Omega-3']
    },
    {
      id: 3,
      name: 'Green Goddess Smoothie',
      description: 'Spinach, banana, mango, coconut milk, chia seeds, protein powder',
      calories: 280,
      protein: 20,
      carbs: 35,
      fat: 8,
      price: 8.99,
      image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'smoothies',
      kitchen: 'Smoothie Station',
      rating: 4.9,
      prepTime: 5,
      tags: ['Vegan', 'Protein Rich', 'Antioxidants']
    },
    {
      id: 4,
      name: 'Mediterranean Chickpea Salad',
      description: 'Chickpeas, cucumber, tomatoes, red onion, olives, lemon herb dressing',
      calories: 320,
      protein: 15,
      carbs: 42,
      fat: 12,
      price: 10.99,
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'salads',
      kitchen: 'Green Bowl Kitchen',
      rating: 4.6,
      prepTime: 10,
      tags: ['Vegan', 'High Fiber', 'Mediterranean']
    },
    {
      id: 5,
      name: 'Protein Pancakes',
      description: 'Oat flour pancakes with protein powder, topped with berries and almond butter',
      calories: 350,
      protein: 25,
      carbs: 38,
      fat: 12,
      price: 9.99,
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'protein-bowls',
      kitchen: 'Protein Paradise',
      rating: 4.5,
      prepTime: 18,
      tags: ['High Protein', 'Breakfast', 'Gluten Free']
    },
    {
      id: 6,
      name: 'Acai Energy Bowl',
      description: 'Acai puree, granola, fresh berries, coconut flakes, honey drizzle',
      calories: 290,
      protein: 8,
      carbs: 52,
      fat: 9,
      price: 11.99,
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'smoothies',
      kitchen: 'Smoothie Station',
      rating: 4.8,
      prepTime: 8,
      tags: ['Antioxidants', 'Energy Boost', 'Superfood']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Healthy Items' },
    { value: 'protein-bowls', label: 'Protein Bowls' },
    { value: 'salads', label: 'Fresh Salads' },
    { value: 'smoothies', label: 'Healthy Smoothies' },
    { value: 'keto', label: 'Keto Meals' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (itemId: number) => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }
    
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      setTotalCalories(prev => prev + item.calories);
    }
  };

  const removeFromCart = (itemId: number) => {
    if (cart[itemId] > 0) {
      setCart(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
      
      const item = menuItems.find(item => item.id === itemId);
      if (item) {
        setTotalCalories(prev => prev - item.calories);
      }
    }
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, count]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item ? item.price * count : 0);
    }, 0);
  };

  return (
    <>
      <Head>
        <title>Healthy Food Menu - Order Fresh Organic Meals Online | Leaf & Fork</title>
        <meta name="description" content="Browse our healthy food menu with calorie-counted meals. Order fresh protein bowls, keto dishes, smoothies & salads online. Fast delivery in 30 minutes." />
        <meta name="keywords" content="healthy food menu, order healthy meals online, protein bowls, keto food delivery, fresh salads, healthy smoothies, organic food menu, calorie counted meals" />
        <link rel="canonical" href="https://leafandfork.com/menu" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Menu",
              "name": "Healthy Food Menu",
              "description": "Fresh organic meals with transparent calorie counts and nutrition information",
              "hasMenuSection": [
                {
                  "@type": "MenuSection",
                  "name": "Protein Bowls",
                  "description": "High-protein healthy bowls with fresh ingredients",
                  "hasMenuItem": menuItems.filter(item => item.category === 'protein-bowls').map(item => ({
                    "@type": "MenuItem",
                    "name": item.name,
                    "description": item.description,
                    "offers": {
                      "@type": "Offer",
                      "price": item.price.toString(),
                      "priceCurrency": "USD"
                    },
                    "nutrition": {
                      "@type": "NutritionInformation",
                      "calories": `${item.calories} calories`,
                      "proteinContent": `${item.protein}g`,
                      "carbohydrateContent": `${item.carbs}g`,
                      "fatContent": `${item.fat}g`
                    }
                  }))
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2" aria-label="Leaf & Fork - Healthy Food Delivery Home">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Leaf & Fork</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                {getTotalItems() > 0 && (
                  <Link href="/checkout">
                    <Button className="bg-orange-500 hover:bg-orange-600 relative">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart ({getTotalItems()})
                      <Badge className="absolute -top-2 -right-2 bg-red-500">
                        {totalCalories} cal
                      </Badge>
                    </Button>
                  </Link>
                )}
                
                {!isLoggedIn && (
                  <Link href="/auth">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Login to Order
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Healthy Food Menu - Order Fresh Organic Meals</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search healthy dishes, protein bowls, keto meals..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search healthy food menu"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {totalCalories > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-orange-800">
                      Total Calories in Cart: {totalCalories} cal
                    </span>
                  </div>
                  <span className="text-orange-600 font-medium">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={`${item.name} - Healthy food with ${item.calories} calories - Order online`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    width="400"
                    height="192"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {item.calories} cal
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.prepTime}m
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{item.protein}g</div>
                      <div>Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{item.carbs}g</div>
                      <div>Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{item.fat}g</div>
                      <div>Fat</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      ${item.price}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {cart[item.id] > 0 && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium">{cart[item.id]}</span>
                        </>
                      )}
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => addToCart(item.id)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    From {item.kitchen}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No healthy food items found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria to find more healthy meals</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
