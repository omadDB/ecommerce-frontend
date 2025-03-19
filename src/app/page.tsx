'use client';

import Bestsellers from '@/components/Bestsellers';
import CarouselHero from '@/components/CarouselHero';
import Categories from '@/components/Categories';
import Container from '@/components/Container';
import Faq from '@/components/Faq';
import { OrderCall } from '@/components/OrderCall';

export default function Home() {
  return (
    <>
      <main>
        <Container>
          <section className=" my-8">
            <CarouselHero />
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
