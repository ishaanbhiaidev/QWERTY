import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL('https://leafandfork.com'),
  title: {
    default: 'Leaf & Fork - Order Healthy Food Online | Fresh Organic Meals Delivered Fast',
    template: '%s | Leaf & Fork - Healthy Food Delivery'
  },
  description: 'Order healthy food online with transparent calorie counts. Fresh organic meals, protein bowls, keto dishes & smoothies delivered in 30 minutes. Best healthy food delivery near you.',
  keywords: [
    'healthy food delivery',
    'order healthy food online',
    'healthy food near me',
    'organic food delivery',
    'fresh meal delivery',
    'calorie counted meals',
    'protein bowls delivery',
    'keto food delivery',
    'healthy smoothies',
    'nutritious meals',
    'diet food delivery',
    'fitness meals',
    'clean eating delivery',
    'healthy restaurant',
    'fresh ingredients',
    'macro counted meals',
    'healthy breakfast delivery',
    'healthy lunch delivery',
    'healthy dinner delivery',
    'plant based meals'
  ],
  authors: [{ name: 'Leaf & Fork Team' }],
  creator: 'Leaf & Fork',
  publisher: 'Leaf & Fork',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leafandfork.com',
    siteName: 'Leaf & Fork',
    title: 'Leaf & Fork - Order Healthy Food Online | Fresh Organic Meals Delivered Fast',
    description: 'Order healthy food online with transparent calorie counts. Fresh organic meals, protein bowls, keto dishes & smoothies delivered in 30 minutes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Leaf & Fork - Healthy Food Delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leaf & Fork - Order Healthy Food Online',
    description: 'Fresh organic meals with calorie counts delivered in 30 minutes. Order healthy food near you.',
    images: ['/twitter-image.jpg'],
    creator: '@leafandfork',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://leafandfork.com',
  },
  category: 'food',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        
        {/* Local business structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              "name": "Leaf & Fork",
              "description": "Healthy food delivery service with fresh organic meals, transparent calorie counts, and fast delivery",
              "url": "https://leafandfork.com",
              "logo": "https://leafandfork.com/logo.png",
              "image": "https://leafandfork.com/og-image.jpg",
              "telephone": "+1-555-HEALTHY",
              "email": "hello@leafandfork.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Health Street",
                "addressLocality": "Wellness City",
                "addressRegion": "CA",
                "postalCode": "90210",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "34.0522",
                "longitude": "-118.2437"
              },
              "openingHours": "Mo-Su 06:00-23:00",
              "priceRange": "$8-$20",
              "servesCuisine": ["Healthy", "Organic", "Vegetarian", "Vegan", "Keto", "Protein"],
              "hasMenu": "https://leafandfork.com/menu",
              "acceptsReservations": false,
              "takeaway": true,
              "delivery": true,
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI"],
              "currenciesAccepted": "USD",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2847",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Sarah Johnson"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Amazing healthy food delivery! Fresh ingredients, perfect calorie counts, and super fast delivery. Best healthy food near me!"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/leafandfork",
                "https://www.instagram.com/leafandfork",
                "https://twitter.com/leafandfork"
              ]
            })
          }}
        />
        
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Leaf & Fork",
              "alternateName": "Leaf and Fork",
              "url": "https://leafandfork.com",
              "logo": "https://leafandfork.com/logo.png",
              "description": "Leading healthy food delivery platform offering fresh organic meals with transparent nutrition information",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Leaf & Fork Team"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-HEALTHY",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.facebook.com/leafandfork",
                "https://www.instagram.com/leafandfork",
                "https://twitter.com/leafandfork",
                "https://www.linkedin.com/company/leafandfork"
              ]
            })
          }}
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Leaf & Fork",
              "url": "https://leafandfork.com",
              "description": "Order healthy food online with transparent calorie counts and fast delivery",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://leafandfork.com/menu?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Service structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Healthy Food Delivery",
              "description": "Fast delivery of fresh, organic, calorie-counted healthy meals",
              "provider": {
                "@type": "Organization",
                "name": "Leaf & Fork"
              },
              "areaServed": {
                "@type": "City",
                "name": "Wellness City"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Healthy Food Menu",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Protein Bowls",
                      "description": "High-protein healthy bowls with fresh ingredients"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Keto Meals",
                      "description": "Low-carb ketogenic meals for healthy lifestyle"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
