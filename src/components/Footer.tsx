import Link from "next/link"
import Container from "./Container"
import Image from "next/image"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="grid gap-5 grid--footer">
        <div className="logo-col">
          <a href="#" className="footer-logo">
            <Image src="/favicon.ico" width={50} height={50} alt="Logo" />
          </a>

          <ul className="social-links">
            <li>
              <a className="footer-link" href="#">
                <InstagramIcon />
                {/* <ion-icon
                      className="social-icon"
                      name="logo-instagram"
                    ></ion-icon> */}
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <FacebookIcon />
                {/* <Io className="social-icon" name="logo-facebook"></Io> */}
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <TwitterIcon />
                {/* <ion-icon
                      className="social-icon"
                      name="logo-twitter"
                    ></ion-icon> */}
              </a>
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
              <a className="footer-link" href="tel:+998-97-480-33-44">
                +998-97-480-33-44
              </a>
              <br />
              <a className="footer-link" href="mailto:hello@omnifood.com">
                odilshodbekov@gmail.com
              </a>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Account</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                Create account
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Sign in
              </a>
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
              <a className="footer-link" href="#">
                About us
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                For Business
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Partners
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Careers
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Resources</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                Help center
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Privacy & terms
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
