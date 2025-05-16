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
          <section className="flex justify-center my-8">
            <EmblaCarousel options={OPTIONS} slides={SLIDES} />
          </section>
        </Container>

        <section>
          <Bestsellers />
        </section>

        <section className="my-12">
          <Container>
            <Categories />
          </Container>
        </section>

        <section className="border-y border-gray-400">
          <div className="flex justify-center items-center min-h-screen p-2">
            <Container className="flex flex-col items-center gap-8">
              <h2 className="text-center text-4xl font-bold text-black mb-4">
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
