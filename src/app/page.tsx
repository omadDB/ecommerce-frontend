"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"

import Bestsellers from "@/components/Bestsellers"
import CarouselHero from "@/components/CarouselHero"
import Contact from "@/components/Contact"
import Container from "@/components/Container"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <Provider store={store}>
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

          {/* <section>
            <Contact />
          </section> */}
        </main>

        {/* <Footer /> */}
      </>
    </Provider>
  )
}
