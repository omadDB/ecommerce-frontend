"use client"

import Bestsellers from "@/components/Bestsellers"
import CarouselHero from "@/components/CarouselHero"
import Categories from "@/components/Categories"
import Container from "@/components/Container"
import Faq from "@/components/Faq"
import { OrderCall } from "@/components/OrderCall"

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

        <section>
          <div className="flex justify-center items-center min-h-screen bg-gray-300 p-4">
            <Container>
              <OrderCall />
            </Container>
          </div>
        </section>

        <section>
          <Faq />
        </section>
      </main>
    </>
  )
}
