"use client"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useRef } from "react"

export default function CarouselHero() {
  const plugin = useRef(Autoplay({ delay: 3000 }))

  return (
    <Carousel
      plugins={[plugin.current]}
      // opts={{
      //   align: "start",
      // }}
      className="w-[100%]"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  {/* <div className="relative flex flex-col gap-4"> */}
                  <div className="w-full h-full relative">
                    <Image
                      src="/example-product.webp"
                      fill
                      className="object-cover rounded-lg"
                      alt="Product image"
                    />
                  </div>
                  {/* <div className="absolute flex items-center justify-between">
                      <h4>Product 1</h4>
                      <p>310.000 so'm</p>
                    </div> */}
                  {/* </div> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
