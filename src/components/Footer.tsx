import Link from "next/link"
import Container from "./Container"
import Image from "next/image"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="grid gap-5 grid--footer">
        <div className="logo-col">
          <Link href="#" className="footer-logo">
            <Image src="/favicon.ico" width={50} height={50} alt="Logo" />
          </Link>

          <ul className="social-links">
            <li>
              <Link className="footer-link" href="#">
                <InstagramIcon />
                {/* <ion-icon
                      className="social-icon"
                      name="logo-instagram"
                    ></ion-icon> */}
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="#">
                <FacebookIcon />
                {/* <Io className="social-icon" name="logo-facebook"></Io> */}
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="#">
                <TwitterIcon />
                {/* <ion-icon
                      className="social-icon"
                      name="logo-twitter"
                    ></ion-icon> */}
              </Link>
            </li>
          </ul>

          <p className="copyright">
            Copyright &copy; <span className="year">2025</span> by Omad, Inc.
            All rights reserved.
          </p>
        </div>

        <div className="address-col">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">13B Alisher Navoi St.</p>
            <p>
              <Link className="footer-link" href="tel:+998-97-480-33-44">
                +998-97-480-33-44
              </Link>
              <br />
              <Link className="footer-link" href="mailto:hello@omnifood.com">
                odilshodbekov@gmail.com
              </Link>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Account</p>
          <ul className="footer-nav">
            <li>
              <Link className="footer-link" href="/register">
                Create account
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/login">
                Sign in
              </Link>
            </li>
            {/* <li>
              <a className="footer-link" href="#">
                iOS app
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Android app
              </a>
            </li> */}
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Company</p>
          <ul className="footer-nav">
            <li>
              <Link className="footer-link" href="#">
                About us
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="#">
                For Business
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="#">
                Partners
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="#">
                Careers
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Resources</p>
          <ul className="footer-nav">
            <li>
              <Link className="footer-link" href="#">
                Help center
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="#">
                Privacy & terms
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
