'use client';

import Bestsellers from '@/components/Bestsellers';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
// import { EmblaCarousel } from '@/components/CarouselHero';
import Categories from '@/components/Categories';
import Container from '@/components/Container';
import Faq from '@/components/Faq';
import { OrderCall } from '@/components/OrderCall';
import { EmblaOptionsType } from 'embla-carousel';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  return (
    <>
      <main>
        <Container>
          <section className="flex justify-center my-4 sm:my-6 md:my-8">
            <EmblaCarousel options={OPTIONS} slides={SLIDES} />
          </section>
        </Container>

        <section>
          <Bestsellers />
        </section>

        <section className="my-8 sm:my-10 md:my-12">
          <Container>
            <Categories />
          </Container>
        </section>

        <section className="border-gray-400 border-y">
          <div className="flex items-center justify-center min-h-[50vh] p-2">
            <Container className="flex flex-col items-center gap-6 py-8 sm:py-12 md:py-16">
              <h2 className="text-xl font-semibold text-center text-black sm:text-2xl md:text-3xl lg:text-4xl">
                Order a Call
              </h2>
              <OrderCall />
            </Container>
          </div>
        </section>

        <section>
          <Faq />
        </section>
      </main>
    </>
  );
}
