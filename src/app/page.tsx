'use client';

import Bestsellers from '@/components/Bestsellers';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
// import { EmblaCarousel } from '@/components/CarouselHero';
import Categories from '@/components/Categories';
import Container from '@/components/Container';
import Faq from '@/components/Faq';
import { OrderCall } from '@/components/OrderCall';
import { EmblaOptionsType } from 'embla-carousel';
import Transition from '@/components/Transition';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  return (
    <>
      <main>
        <Transition>
          <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center my-4 sm:my-6 md:my-8">
            <EmblaCarousel options={OPTIONS} slides={SLIDES} />
          </section>
        </Transition>

        <Transition>
          <section>
            <Bestsellers />
          </section>
        </Transition>

        <Transition>
          <section className="my-8 sm:my-10 md:my-12">
            <Container>
              <Categories />
            </Container>
          </section>
        </Transition>

        <Transition>
          <section className="border-gray-400 border-y">
            <div className="flex items-center justify-center min-h-[50vh] p-2">
              <Container className="flex flex-col items-center justify-center w-full gap-12 py-8 md:gap-8 md:flex-row sm:py-12 md:py-16">
                <div className="relative flex flex-col items-center justify-center gap-4 md:items-end md:w-1/2">
                  <h2 className="text-3xl font-extrabold leading-tight text-center text-blue-900 sm:text-4xl md:text-5xl md:text-right">
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
                    className="w-32 h-20 mt-[-8px] md:rotate-0 rotate-90 text-blue-400 animate-bounce-slow"
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

        <Transition>
          <section>
            <Faq />
          </section>
        </Transition>
      </main>
    </>
  );
}
