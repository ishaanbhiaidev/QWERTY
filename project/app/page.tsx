'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, ChevronRight, Utensils, Leaf, Heart, Zap, Shield, Users, Award, Play, ArrowRight, Phone, Mail, ChevronDown, Filter, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState('Jaipur');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Auto-rotate offers
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const offers = [
    { text: "Flat ₹100 off on orders above ₹299", code: "HEALTHY100", color: "bg-orange-500" },
    { text: "20% off on your first order", code: "FIRST20", color: "bg-green-500" },
    { text: "Free delivery on orders above ₹199", code: "FREEDEL", color: "bg-blue-500" },
    { text: "Buy 2 Get 1 Free on smoothies", code: "SMOOTH3", color: "bg-purple-500" }
  ];

  const categories = [
    { name: 'Protein Bowls', icon: '🥗', count: '25+' },
    { name: 'Smoothies', icon: '🥤', count: '15+' },
    { name: 'Keto Meals', icon: '🥑', count: '20+' },
    { name: 'Salads', icon: '🥙', count: '18+' },
    { name: 'Breakfast', icon: '🍳', count: '12+' },
    { name: 'Snacks', icon: '🥜', count: '10+' }
  ];

  const healthyRestaurants = [
    {
      id: 1,
      name: 'Green Bowl Kitchen',
      cuisine: 'Healthy Bowls, Salads',
      rating: 4.8,
      deliveryTime: '25-30 mins',
      avgCalories: '320 cal avg',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      offer: '20% OFF',
      distance: '1.2 km',
      speciality: 'Organic Ingredients',
      promoted: true
    },
    {
      id: 2,
      name: 'Protein Paradise',
      cuisine: 'High Protein, Fitness Meals',
      rating: 4.7,
      deliveryTime: '20-25 mins',
      avgCalories: '450 cal avg',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
      offer: '15% OFF',
      distance: '0.8 km',
      speciality: 'Macro Counted',
      promoted: false
    },
    {
      id: 3,
      name: 'Keto Corner',
      cuisine: 'Keto, Low Carb',
      rating: 4.6,
      deliveryTime: '30-35 mins',
      avgCalories: '380 cal avg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      offer: '25% OFF',
      distance: '1.5 km',
      speciality: 'Keto Certified',
      promoted: false
    }
  ];

  const topPicks = [
    {
      id: 1,
      name: 'Quinoa Power Bowl',
      restaurant: 'Green Bowl Kitchen',
      price: 12.99,
      originalPrice: 15.99,
      calories: 420,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Bestseller', 'High Protein']
    },
    {
      id: 2,
      name: 'Green Goddess Smoothie',
      restaurant: 'Smoothie Station',
      price: 8.99,
      originalPrice: 10.99,
      calories: 280,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Trending', 'Vegan']
    },
    {
      id: 3,
      name: 'Keto Salmon Bowl',
      restaurant: 'Keto Corner',
      price: 15.99,
      originalPrice: 18.99,
      calories: 380,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Low Carb', 'Omega-3']
    }
  ];

  return (
    <>
      <Head>
        {/* Critical performance optimizations */}
        <link rel="preload" href="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" as="image" />
        <link rel="prefetch" href="/menu" />
        <link rel="prefetch" href="/auth" />
        
        {/* Local SEO meta tags */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jaipur" />
        <meta name="geo.position" content="26.9124;75.7873" />
        <meta name="ICBM" content="26.9124, 75.7873" />
        
        {/* Additional SEO meta tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Rich snippets for food delivery */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DeliveryService",
              "name": "Leaf & Fork Healthy Food Delivery",
              "description": "Order healthy food online with transparent calorie counts. Fresh organic meals delivered in 30 minutes.",
              "url": "https://leafandfork.com",
              "telephone": "+1-555-HEALTHY",
              "email": "orders@leafandfork.com",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Jaipur",
                  "addressRegion": "Rajasthan",
                  "addressCountry": "IN"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Healthy Food Menu",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "MenuItem",
                      "name": "Quinoa Power Bowl",
                      "description": "High-protein quinoa bowl with fresh vegetables",
                      "offers": {
                        "@type": "Offer",
                        "price": "12.99",
                        "priceCurrency": "USD"
                      },
                      "nutrition": {
                        "@type": "NutritionInformation",
                        "calories": "420 calories"
                      }
                    }
                  }
                ]
              },
              "deliveryTime": "PT30M",
              "deliveryRadius": "10 km"
            })
          }}
        />

        {/* FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to order healthy food online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply browse our menu of fresh, organic meals, select your items, and place your order. We deliver healthy food with transparent calorie counts in 30 minutes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you deliver healthy food near me?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We deliver fresh, healthy meals across Jaipur and surrounding areas. Check our delivery zones for availability in your location."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What makes your food healthy?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All our meals use fresh, organic ingredients with transparent calorie counts, macro breakdowns, and no artificial preservatives. Perfect for fitness enthusiasts and health-conscious individuals."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Offer Banner */}
        <div className={`${offers[currentOfferIndex].color} text-white py-2 px-4 text-center text-sm font-medium transition-all duration-500`}>
          <div className="flex items-center justify-center space-x-2">
            <Percent className="w-4 h-4" />
            <span>{offers[currentOfferIndex].text}</span>
            <span className="bg-white/20 px-2 py-1 rounded text-xs">
              Code: {offers[currentOfferIndex].code}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-3" aria-label="Leaf & Fork - Healthy Food Delivery Home">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Leaf & Fork
                  </span>
                </Link>
                
                {/* Location Selector */}
                <div className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-orange-500 cursor-pointer transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{selectedLocation}</span>
                  <ChevronDown className="w-4 h-4" />
                  <div className="text-sm text-gray-500 ml-2">30 mins avg</div>
                </div>

                {/* Search Bar */}
                <div className="hidden lg:block relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search healthy food, protein bowls, keto meals..."
                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search for healthy food"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/track" className="hidden lg:block text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  Track Order
                </Link>
                
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <Link href="/profile">
                      <Button variant="ghost" className="text-gray-700 hover:text-orange-500">Profile</Button>
                    </Link>
                    <Button 
                      onClick={() => {
                        localStorage.removeItem('user');
                        setIsLoggedIn(false);
                      }}
                      variant="outline"
                      className="border-orange-200 hover:bg-orange-50"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link href="/auth">
                      <Button variant="ghost" className="text-gray-700 hover:text-orange-500">Login</Button>
                    </Link>
                    <Link href="/auth">
                      <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 shadow-lg">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
              {/* Left Content */}
              <div className="flex items-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-xl">
                  <div className="mb-6">
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-semibold mb-4">
                      <Zap className="w-4 h-4 mr-2" />
                      Delivering to {selectedLocation}
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                    Order
                    <br />
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      Healthy Food
                    </span>
                    <br />
                    <span className="text-4xl lg:text-5xl">Online Fast</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    Fresh, organic meals with transparent calorie counts delivered from certified cloud kitchens. 
                    Order healthy food near you in 30 minutes. Best healthy food delivery with macro-counted nutrition.
                  </p>

                  {/* Hero Search */}
                  <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search healthy food, protein bowls, keto meals near me..."
                      className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl shadow-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search for healthy food delivery"
                    />
                    <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6">
                      Search
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link href="/menu">
                      <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all">
                        Order Healthy Food Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="border-gray-300 px-8 py-4 text-lg hover:bg-gray-50">
                      <Play className="w-5 h-5 mr-2" />
                      How it Works
                    </Button>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">50K+</div>
                      <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">200+</div>
                      <div className="text-gray-600">Healthy Dishes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">4.8★</div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fresh healthy quinoa power bowl with organic vegetables - Order healthy food online"
                    className="w-full max-w-lg rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    width="500"
                    height="500"
                  />
                  {/* Floating Cards */}
                  <div className="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-xl animate-bounce">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">320 Cal</div>
                        <div className="text-sm text-gray-600">Protein Bowl</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-xl animate-pulse">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">25 Min</div>
                        <div className="text-sm text-gray-600">Delivery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Healthy Food by Category</h2>
              <p className="text-gray-600">Explore our fresh, organic healthy food categories with calorie counts</p>
            </div>
            
            <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
              {categories.map((category, index) => (
                <Link key={index} href="/menu" aria-label={`Order ${category.name} - Healthy food delivery`}>
                  <div className="flex-shrink-0 text-center cursor-pointer group">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg transition-all transform group-hover:scale-110">
                      <span className="text-3xl" role="img" aria-label={category.name}>{category.icon}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top Picks Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Healthy Food Picks for You</h2>
                <p className="text-gray-600">Fresh organic meals with transparent nutrition - Order healthy food online</p>
              </div>
              <Link href="/menu">
                <Button variant="outline" className="border-orange-200 hover:bg-orange-50">
                  See All Healthy Food
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPicks.map((item) => (
                <Card key={item.id} className="hover:shadow-xl transition-all cursor-pointer group overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={`${item.name} - Healthy food delivery with ${item.calories} calories`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="300"
                      height="200"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">
                        {item.calories} cal
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/90 text-gray-900 mb-1 block">
                          {tag}
                        </Badge>
                      ))}
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
                    
                    <p className="text-gray-600 text-sm mb-3">{item.restaurant}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          ${item.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${item.originalPrice}
                        </span>
                      </div>
                      
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 transform hover:scale-105 transition-all">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Healthy Food Restaurants Delivering to <span className="text-orange-500">{selectedLocation}</span>
              </h2>
              <p className="text-gray-600">Discover our certified healthy food specialists with fresh organic ingredients</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthyRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href="/menu" aria-label={`Order from ${restaurant.name} - ${restaurant.cuisine}`}>
                  <Card className="hover:shadow-xl transition-all cursor-pointer group overflow-hidden">
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={`${restaurant.name} - ${restaurant.cuisine} healthy food delivery`}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="400"
                        height="256"
                      />
                      {restaurant.promoted && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            PROMOTED
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                          {restaurant.offer}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          {restaurant.speciality}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {restaurant.distance}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <span className="font-medium text-orange-600">{restaurant.avgCalories}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Order Healthy Food from <span className="text-orange-500">Leaf & Fork?</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering the healthiest, freshest meals with complete transparency and fast delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-xl transition-all hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Nutrition</h3>
                  <p className="text-gray-600">
                    Every healthy food item comes with detailed nutritional information including exact calorie counts, protein, carbs, and fat content for informed ordering.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-all hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Leaf className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh Organic Ingredients</h3>
                  <p className="text-gray-600">
                    Sourced daily from local organic farms and trusted suppliers to ensure maximum freshness and nutritional value in every healthy meal.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-all hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Clock className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast Delivery</h3>
                  <p className="text-gray-600">
                    Hot, healthy meals delivered to your doorstep in 30 minutes or less with real-time tracking for the best healthy food delivery experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Ready to Order
              <br />
              <span className="text-orange-200">Healthy Food Today?</span>
            </h2>
            <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of health-conscious food lovers who trust Leaf & Fork for their daily nutrition. 
              Fresh ingredients, transparent calories, and delicious flavors delivered to your door in 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all">
                  Order Healthy Food Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg">
                  Browse Healthy Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">Leaf & Fork</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Delivering healthy, calorie-counted meals from certified cloud kitchens to your doorstep. 
                  Order fresh, organic healthy food online with transparent nutrition information.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                    <span className="text-sm">f</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                    <span className="text-sm">t</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                    <span className="text-sm">in</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-6">Order Healthy Food</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link href="/menu" className="hover:text-white transition-colors">Browse Healthy Menu</Link></li>
                  <li><Link href="/track" className="hover:text-white transition-colors">Track Your Order</Link></li>
                  <li><Link href="/auth" className="hover:text-white transition-colors">Sign Up for Delivery</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Nutrition Guide</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-6">For Partners</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link href="/kitchen" className="hover:text-white transition-colors">Cloud Kitchen Partner</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Delivery Partner</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Business Solutions</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-6">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Healthy Food Delivery</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  &copy; 2025 Leaf & Fork. All rights reserved. | Best healthy food delivery platform - Order fresh organic meals online
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
