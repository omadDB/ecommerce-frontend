import { Mail, MapPin, Phone } from 'lucide-react';
import Container from './Container';

const Contact = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 sm:mb-10 md:mb-14">
          <span className="text-sm font-semibold">Reach Us</span>
          <h1 className="mt-1 mb-2 text-2xl font-semibold sm:mb-3 text-balance sm:text-3xl md:text-4xl">
            Speak with Our Friendly Team
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            We&apos;d love to assist you. Fill out the form or drop us an email.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-4 rounded-lg sm:p-6 bg-accent/5">
            <span className="flex flex-col items-center justify-center mb-3 rounded-full size-10 sm:size-12 bg-accent">
              <Mail className="w-5 h-5 sm:h-6 sm:w-6" />
            </span>
            <p className="mb-2 text-base font-semibold sm:text-lg">Email Us</p>
            <p className="mb-3 text-sm sm:text-base text-muted-foreground">
              Our team is ready to assist.
            </p>
            <a
              href="mailto:odilshodvekov13@gmail.com"
              className="text-sm font-semibold sm:text-base hover:underline"
            >
              odilshodvekov13@gmail.com
            </a>
          </div>
          <div className="p-4 rounded-lg sm:p-6 bg-accent/5">
            <span className="flex flex-col items-center justify-center mb-3 rounded-full size-10 sm:size-12 bg-accent">
              <MapPin className="w-5 h-5 sm:h-6 sm:w-6" />
            </span>
            <p className="mb-2 text-base font-semibold sm:text-lg">Visit Us</p>
            <p className="mb-3 text-sm sm:text-base text-muted-foreground">
              Drop by our office for a chat.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold sm:text-base hover:underline"
            >
              13B Alisher Navoi St., Tashkent
            </a>
          </div>
          <div className="p-4 rounded-lg sm:p-6 bg-accent/5">
            <span className="flex flex-col items-center justify-center mb-3 rounded-full size-10 sm:size-12 bg-accent">
              <Phone className="w-5 h-5 sm:h-6 sm:w-6" />
            </span>
            <p className="mb-2 text-base font-semibold sm:text-lg">Call Us</p>
            <p className="mb-3 text-sm sm:text-base text-muted-foreground">
              We&apos;re available Mon-Fri, 9am-5pm.
            </p>
            <a
              href="tel:+998-97-480-33-44"
              className="text-sm font-semibold sm:text-base hover:underline"
            >
              +998-97-480-33-44
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
