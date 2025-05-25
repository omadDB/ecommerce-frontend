// import Link from 'next/link';
// import Container from './Container';
// import Image from 'next/image';
// import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer className="footer h-fit">
//       <Container className="grid grid-cols-2 gap-10 !px-10 lg:grid--footer">
//         <div className="logo-col">
//           <Link href="#" className="footer-logo">
//             <Image src="/favicon.ico" width={50} height={50} alt="Logo" />
//           </Link>

//           <ul className="social-links">
//             <li>
//               <Link className="footer-link" href="#">
//                 <InstagramIcon />
//                 {/* <ion-icon
//                       className="social-icon"
//                       name="logo-instagram"
//                     ></ion-icon> */}
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="#">
//                 <FacebookIcon />
//                 {/* <Io className="social-icon" name="logo-facebook"></Io> */}
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="#">
//                 <TwitterIcon />
//                 {/* <ion-icon
//                       className="social-icon"
//                       name="logo-twitter"
//                     ></ion-icon> */}
//               </Link>
//             </li>
//           </ul>

//           <p className="mt-4 text-sm text-white lg:text-base">
//             Copyright &copy; <span className="year">2025</span> by Omad. All
//             rights reserved.
//           </p>
//         </div>

//         <nav className="nav-col">
//           <p className="footer-heading">Account</p>
//           <ul className="footer-nav">
//             <li>
//               <Link className="footer-link" href="/register">
//                 Create account
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="/login">
//                 Sign in
//               </Link>
//             </li>
//             {/* <li>
//               <a className="footer-link" href="#">
//                 iOS app
//               </a>
//             </li>
//             <li>
//               <a className="footer-link" href="#">
//                 Android app
//               </a>
//             </li> */}
//           </ul>
//         </nav>

//         {/* <nav className="nav-col">
//           <p className="footer-heading">Company</p>
//           <ul className="footer-nav">
//             <li>
//               <Link className="footer-link" href="#">
//                 About us
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="#">
//                 For Business
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="#">
//                 Partners
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="#">
//                 Careers
//               </Link>
//             </li>
//           </ul>
//         </nav> */}
//         <div className="address-col">
//           <p className="footer-heading">Contact us</p>
//           <address className="contacts">
//             <p className="address">Tashkent, Uzbekistan</p>
//             <p>
//               <Link className="footer-link" href="tel:+998-97-480-33-44">
//                 +998-97-480-33-44
//               </Link>
//               <br />
//               <Link className="footer-link" href="mailto:hello@omnifood.com">
//                 odilshodbekov@gmail.com
//               </Link>
//             </p>
//           </address>
//         </div>

//         <nav className="nav-col">
//           <p className="footer-heading">Resources</p>
//           <ul className="footer-nav">
//             <li>
//               <Link className="footer-link" href="#">
//                 Help center
//               </Link>
//             </li>
//             <li>
//               <Link className="footer-link" href="#">
//                 Privacy & terms
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </Container>
//     </footer>
//   );
// }

'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/categories' },
      { name: 'Магазин', href: '/categories/2' },
      { name: 'Обои', href: '/categories/3' },
      { name: 'Люстра', href: '/categories/4' },
      { name: 'Юкори склад', href: '/categories/5' },
      { name: 'Труба завод', href: '/categories/6' },
      { name: 'Водоэмульсия завод', href: '/categories/7' },
    ],
    customerService: [
      { name: 'Contact Us', href: '/contacts' },
      // { name: 'FAQ', href: '/faq' },
      // { name: 'Shipping Info', href: '/shipping' },
      // { name: 'Returns & Exchanges', href: '/returns' },
      // { name: 'Size Guide', href: '/size-guide' },
      // { name: 'Track Your Order', href: '/track-order' },
      // { name: 'Customer Reviews', href: '/reviews' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Affiliate Program', href: '/affiliate' },
      { name: 'Wholesale', href: '/wholesale' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  const paymentMethods = [
    { name: 'Visa', logo: '/placeholder.svg?height=30&width=50' },
    { name: 'Mastercard', logo: '/placeholder.svg?height=30&width=50' },
    { name: 'American Express', logo: '/placeholder.svg?height=30&width=50' },
    { name: 'PayPal', logo: '/placeholder.svg?height=30&width=50' },
    { name: 'Apple Pay', logo: '/placeholder.svg?height=30&width=50' },
    { name: 'Google Pay', logo: '/placeholder.svg?height=30&width=50' },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-12 md:px-12 lg:px-48 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/next.svg"
                alt="Store Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your trusted online destination for quality products at unbeatable
              prices. We&apos;re committed to providing exceptional customer
              service and a seamless shopping experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Tashkent, Uzbekistan</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>+998 97 480 33 44</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>odilshodvekov13@gmail.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          {/* <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 Ipak Yo&apos;li Urgench. Все права защищены.
          </div>

          {/* Payment Methods */}
          {/* <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground mr-2">
              We accept:
            </span>
            {paymentMethods.map((method) => (
              <div key={method.name} className="bg-white rounded border p-1">
                <Image
                  src={method.logo || '/placeholder.svg'}
                  alt={method.name}
                  width={50}
                  height={30}
                  className="h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
