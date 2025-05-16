// 'use client';
// import React, { useEffect } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';

// export function EmblaCarousel() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

//   useEffect(() => {
//     if (emblaApi) {
//       console.log(emblaApi.slideNodes()); // Access API
//     }
//   }, [emblaApi]);

//   return (
//     <div className="embla" ref={emblaRef}>
//       <div className="embla__container">
//         <div className="embla__slide">Slide 1</div>
//         <div className="embla__slide">Slide 2</div>
//         <div className="embla__slide">Slide 3</div>
//       </div>
//     </div>
//   );
// }

// // export default function CarouselHero() {
// //   const plugin = useRef(Autoplay({ delay: 3000 }));

// //   return (
// //     <Carousel
// //       plugins={[plugin.current]}
// //       // opts={{
// //       //   align: "start",
// //       // }}
// //       className="w-[80%]
// //       md:w-[80%] lg:w-[80%] xl:w-[100%]"
// //     >
// //       <CarouselContent>
// //         {Array.from({ length: 5 }).map((_, index) => (
// //           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
// //             <div className="p-1">
// //               <Card>
// //                 <CardContent className="flex aspect-square items-center justify-center">
// //                   {/* <div className="relative flex flex-col gap-4"> */}
// //                   <div className="w-full h-full relative">
// //                     <Image
// //                       src="/example-product.webp"
// //                       fill
// //                       className="object-cover rounded-lg"
// //                       alt="Product image"
// //                     />
// //                   </div>
// //                   {/* <div className="absolute flex items-center justify-between">
// //                       <h4>Product 1</h4>
// //                       <p>310.000 so'm</p>
// //                     </div> */}
// //                   {/* </div> */}
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </CarouselItem>
// //         ))}
// //       </CarouselContent>
// //       <CarouselPrevious />
// //       <CarouselNext />
// //     </Carousel>
// //   );
// // }
