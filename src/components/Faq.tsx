import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Container from "./Container"

const Faq = () => {
  const faqs = [
    {
      question: "What is a FAQ?",
      answer:
        "A FAQ is a list of frequently asked questions and answers on a particular topic.",
    },
    {
      question: "What is the purpose of a FAQ?",
      answer:
        "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
    },
    {
      question: "How do I create a FAQ?",
      answer:
        "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
    },
    {
      question: "What are the benefits of a FAQ?",
      answer:
        "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
    },
  ]

  return (
    <section className="py-16 lg:py-24">
      <Container className="flex flex-col gap-y-8">
        <h1 className="mb-4 text-2xl lg:text-4xl font-semibold md:mb-11 md:text-5xl text-center">
          Frequently asked questions
        </h1>
        <div className="flex flex-col gap-y-2 lg:gap-y-4 px-8 lg:px-20">
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline font-bold text-lg lg:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="lg:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Faq
