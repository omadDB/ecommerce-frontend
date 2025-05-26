// 'use client';

// import Bestsellers from '@/components/Bestsellers';
// import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
// // import { EmblaCarousel } from '@/components/CarouselHero';
// import Categories from '@/components/Categories';
// import Container from '@/components/Container';
// import Faq from '@/components/Faq';
// import { OrderCall } from '@/components/OrderCall';
// import { EmblaOptionsType } from 'embla-carousel';
// import Transition from '@/components/Transition';

// const OPTIONS: EmblaOptionsType = { loop: true };
// const SLIDE_COUNT = 5;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

// export default function Home() {
//   return (
//     <>
//       <main>
//         <Transition>
//           <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center my-4 sm:my-6 md:my-8">
//             <EmblaCarousel options={OPTIONS} slides={SLIDES} />
//           </section>
//         </Transition>

//         <Transition>
//           <section>
//             <Bestsellers />
//           </section>
//         </Transition>

//         <Transition>
//           <section className="my-8 sm:my-10 md:my-12">
//             <Container>
//               <Categories />
//             </Container>
//           </section>
//         </Transition>

//         <Transition>
//           <section className="border-gray-400 border-y">
//             <div className="flex items-center justify-center min-h-[50vh] p-2">
//               <Container className="flex flex-col items-center justify-center w-full gap-12 py-8 md:gap-8 md:flex-row sm:py-12 md:py-16">
//                 <div className="relative flex flex-col items-center justify-center gap-4 md:items-end md:w-1/2">
//                   <h2 className="text-3xl font-extrabold leading-tight text-center text-blue-900 sm:text-4xl md:text-5xl md:text-right">
//                     Need expert advice?
//                     <br />
//                     Want us to call you back?
//                   </h2>
//                   <p className="max-w-md text-lg text-center text-black md:text-right">
//                     Our team is ready to help you choose the best building
//                     materials for your project.
//                   </p>
//                 </div>
//                 <div>
//                   <svg
//                     className="w-32 h-20 mt-[-8px] md:rotate-0 rotate-90 text-blue-400 animate-bounce-slow"
//                     fill="none"
//                     viewBox="0 0 120 80"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M10 60 Q 60 10 110 40"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                       fill="none"
//                       markerEnd="url(#arrowhead)"
//                     />
//                     <defs>
//                       <marker
//                         id="arrowhead"
//                         markerWidth="8"
//                         markerHeight="8"
//                         refX="4"
//                         refY="4"
//                         orient="auto"
//                         markerUnits="strokeWidth"
//                       >
//                         <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="currentColor" />
//                       </marker>
//                     </defs>
//                   </svg>
//                 </div>
//                 <div className="flex items-center justify-center w-full max-w-lg md:w-1/2">
//                   <OrderCall />
//                 </div>
//               </Container>
//             </div>
//           </section>
//         </Transition>

//         <Transition>
//           <section>
//             <Faq />
//           </section>
//         </Transition>
//       </main>
//     </>
//   );
// }

'use client';

import type React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Transition from '@/components/Transition';
import Container from '@/components/Container';
import { OrderCall } from '@/components/OrderCall';
import { formatCurrency } from '@/utils/helpers';

export default function HomePage() {
  const featuredCategories = [
    {
      name: 'Construction Materials',
      image: '/placeholder.svg?height=300&width=300',
      slug: 'construction-materials',
    },
    {
      name: 'Tools & Equipment',
      image: '/placeholder.svg?height=300&width=300',
      slug: 'tools-equipment',
    },
    {
      name: 'Plumbing & Electrical',
      image: '/placeholder.svg?height=300&width=300',
      slug: 'plumbing-electrical',
    },
    {
      name: 'Finishing Materials',
      image: '/placeholder.svg?height=300&width=300',
      slug: 'finishing-materials',
    },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Cement Mix',
      price: 49.99,
      discountedPrice: 39.99,
      discount: 20,
      rating: 4.5,
      reviewCount: 128,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Construction Materials',
      badge: 'Bestseller',
    },
    {
      id: '2',
      name: 'Professional Power Drill Set',
      price: 249.99,
      rating: 4.3,
      reviewCount: 95,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Tools & Equipment',
      badge: 'New Arrival',
    },
    {
      id: '3',
      name: 'Copper Piping Kit',
      price: 299.99,
      discountedPrice: 249.99,
      discount: 17,
      rating: 4.7,
      reviewCount: 62,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Plumbing & Electrical',
    },
    {
      id: '4',
      name: 'Premium Paint Set',
      price: 79.99,
      discountedPrice: 59.99,
      discount: 25,
      rating: 4.2,
      reviewCount: 114,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Finishing Materials',
    },
  ];

  const newArrivals = [
    {
      id: '5',
      name: 'Heavy Duty Ladder',
      price: 399.99,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Tools & Equipment',
    },
    {
      id: '6',
      name: 'Safety Equipment Set',
      price: 129.99,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Tools & Equipment',
    },
    {
      id: '7',
      name: 'Ceramic Tile Collection',
      price: 449.99,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Finishing Materials',
    },
    {
      id: '8',
      name: 'Electrical Wiring Kit',
      price: 49.99,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Plumbing & Electrical',
    },
  ];

  const specialOffers = [
    {
      title: 'Construction Season Sale',
      description: 'Up to 40% off on selected building materials',
      image: '/placeholder.svg?height=600&width=800',
      buttonText: 'Shop Now',
      link: '/products?sale=construction',
      color: 'bg-amber-50',
    },
    {
      title: 'New Tools Collection',
      description: 'Check out our latest professional tools',
      image: '/placeholder.svg?height=600&width=800',
      buttonText: 'Discover',
      link: '/products?new=true',
      color: 'bg-blue-50',
    },
  ];

  // const brands = [
  //   { name: 'Brand 1', logo: '/placeholder.svg?height=80&width=160' },
  //   { name: 'Brand 2', logo: '/placeholder.svg?height=80&width=160' },
  //   { name: 'Brand 3', logo: '/placeholder.svg?height=80&width=160' },
  //   { name: 'Brand 4', logo: '/placeholder.svg?height=80&width=160' },
  //   { name: 'Brand 5', logo: '/placeholder.svg?height=80&width=160' },
  //   { name: 'Brand 6', logo: '/placeholder.svg?height=80&width=160' },
  // ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // const handleNewsletterSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle newsletter signup
  //   alert(`Thank you for subscribing with ${email}!`);
  //   setEmail('');
  // };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Transition>
        <section className="relative px-4 py-12 bg-gradient-to-r from-gray-50 to-gray-100 sm:py-12 md:py-14 lg:py-16">
          <div className="container flex flex-col items-center px-4 mx-auto lg:flex-row">
            <div className="mb-8 lg:w-1/2 lg:pr-12 lg:mb-0">
              <Badge className="mb-4">Limited Time Offer</Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Quality Building Materials for Your Projects
              </h1>
              <p className="max-w-md mb-8 text-lg text-muted-foreground">
                Find everything you need for construction, renovation, and DIY
                projects. Expert advice and professional-grade materials.
              </p>
              <div className="flex flex-row gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/products?sale=true">View Deals</Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:w-1/2">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Featured Products"
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto"
                  priority
                />
                <div className="absolute p-3 rounded-lg bottom-4 left-4 bg-background/80 backdrop-blur-sm">
                  <p className="font-medium">Top of the day</p>
                  <p className="text-sm text-muted-foreground">Cement</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Transition>

      {/* Categories Section */}
      <Transition>
        <section className="px-4 py-12 bg-white">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-baseline justify-between mb-8 md:flex-row">
              <div>
                <h2 className="mb-2 text-3xl font-bold">Shop by Category</h2>
                <p className="text-muted-foreground">
                  Browse our most popular categories
                </p>
              </div>
              <Button variant="link" asChild className="hidden md:flex">
                <Link href="/categories" className="flex items-center">
                  View All Categories <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.slug}`}
                  className="relative overflow-hidden rounded-lg group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-medium text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-6 md:hidden">
              <Button variant="outline" asChild>
                <Link href="/categories">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>
      </Transition>

      {/* Featured Products Section */}
      <Transition>
        <section className="px-4 py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="featured" className="w-full">
              <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
                <div>
                  <h2 className="mb-2 text-3xl font-bold">Our Products</h2>
                  <p className="text-muted-foreground">
                    Discover our selection of premium products
                  </p>
                </div>
                <TabsList className="mt-4 sm:mt-0">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
                  <TabsTrigger value="new">New Arrivals</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="featured" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {featuredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <Card className="h-full transition-shadow group hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="relative mb-4 overflow-hidden rounded-md aspect-square">
                            <Image
                              src={product.image || '/placeholder.svg'}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            {product.discount && (
                              <Badge className="absolute top-2 left-2 bg-rose-500 hover:bg-rose-500">
                                {product.discount}% OFF
                              </Badge>
                            )}
                            {product.badge && (
                              <Badge
                                className={`absolute top-2 right-2 ${
                                  product.badge === 'New Arrival'
                                    ? 'bg-blue-500 hover:bg-blue-500'
                                    : 'bg-amber-500 hover:bg-amber-500'
                                }`}
                              >
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-muted-foreground">
                              {product.category}
                            </p>
                            <h3 className="mb-2 font-medium transition-colors line-clamp-2 group-hover:text-primary">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                              {renderStars(product.rating)}
                              <span className="text-xs text-muted-foreground">
                                ({product.reviewCount})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {product.discountedPrice ? (
                                <>
                                  <span className="font-bold">
                                    {formatCurrency(product.discountedPrice)}
                                  </span>
                                  <span className="text-sm line-through text-muted-foreground">
                                    {formatCurrency(product.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold">
                                  {formatCurrency(product.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bestsellers" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Using the same products but in different order for demo */}
                  {[...featuredProducts].reverse().map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <Card className="h-full transition-shadow group hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="relative mb-4 overflow-hidden rounded-md aspect-square">
                            <Image
                              src={product.image || '/placeholder.svg'}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            {product.discount && (
                              <Badge className="absolute top-2 left-2 bg-rose-500 hover:bg-rose-500">
                                {product.discount}% OFF
                              </Badge>
                            )}
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-muted-foreground">
                              {product.category}
                            </p>
                            <h3 className="mb-2 font-medium transition-colors line-clamp-2 group-hover:text-primary">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                              {renderStars(product.rating)}
                              <span className="text-xs text-muted-foreground">
                                ({product.reviewCount})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {product.discountedPrice ? (
                                <>
                                  <span className="font-bold">
                                    {formatCurrency(product.discountedPrice)}
                                  </span>
                                  <span className="text-sm line-through text-muted-foreground">
                                    {formatCurrency(product.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold">
                                  {formatCurrency(product.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {newArrivals.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <Card className="h-full transition-shadow group hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="relative mb-4 overflow-hidden rounded-md aspect-square">
                            <Image
                              src={product.image || '/placeholder.svg'}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            <Badge className="absolute bg-blue-500 top-2 right-2 hover:bg-blue-500">
                              New
                            </Badge>
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-muted-foreground">
                              {product.category}
                            </p>
                            <h3 className="mb-2 font-medium transition-colors line-clamp-2 group-hover:text-primary">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">
                                ${product.price}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <div className="flex justify-center mt-8">
                <Button asChild>
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            </Tabs>
          </div>
        </section>
      </Transition>

      {/* Special Offers Section */}
      <Transition>
        <section className="px-4 py-12 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {specialOffers.map((offer, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden ${offer.color}`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-8">
                      <h3 className="mb-2 text-2xl font-bold">{offer.title}</h3>
                      <p className="mb-6 text-muted-foreground">
                        {offer.description}
                      </p>
                      <Button asChild className="w-fit">
                        <Link href={offer.link}>{offer.buttonText}</Link>
                      </Button>
                    </div>
                    <div className="md:w-1/2">
                      <Image
                        src={offer.image || '/placeholder.svg'}
                        alt={offer.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Transition>

      {/* Benefits Section */}
      <Transition>
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center p-6 text-center">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Free Delivery</h3>
                <p className="text-muted-foreground">
                  Free delivery on orders over $500
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <RotateCcw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Easy Returns</h3>
                <p className="text-muted-foreground">
                  30-day return policy on unused items
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  All materials meet industry standards
                </p>
              </div>
            </div>
          </div>
        </section>
      </Transition>

      <Transition>
        <section>
          <div className="flex items-center justify-center min-h-[50vh] p-2">
            <Container className="flex flex-col items-center justify-center w-full gap-12 py-8 md:gap-8 md:flex-row sm:py-12 md:py-16">
              <div className="relative flex flex-col items-center justify-center gap-4 md:items-end md:w-1/2">
                <h2 className="text-3xl font-extrabold leading-tight text-center text-blue-600 sm:text-4xl md:text-5xl md:text-right">
                  Need expert advice?
                  <br />
                  Want us to call you back?
                </h2>
                <p className="max-w-md text-lg text-center text-black md:text-right">
                  Our team is ready to help you choose the best building
                  materials for your project.
                </p>
              </div>
              <div>
                <svg
                  className="w-32 h-20 mt-[-8px] md:rotate-0 rotate-90 text-blue-500 animate-bounce-slow"
                  fill="none"
                  viewBox="0 0 120 80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 60 Q 60 10 110 40"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="8"
                      markerHeight="8"
                      refX="4"
                      refY="4"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="flex items-center justify-center w-full max-w-lg md:w-1/2">
                <OrderCall />
              </div>
            </Container>
          </div>
        </section>
      </Transition>

      {/* CTA Section */}
      <Transition>
        <section className="py-16 bg-primary">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Ready to Explore Products?
              </h2>
              <p className="text-lg text-[#d6d6d6] mb-8">
                Browse our extensive collection of building materials and
                professional tools.
              </p>
              <Button
                variant="secondary"
                className="hover:bg-blue-500 hover:text-white"
                size="lg"
                asChild
              >
                <Link href="/categories/all">
                  <ShoppingBag className="w-5 h-5 mr-2" /> Shop Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Transition>
    </div>
  );
}
