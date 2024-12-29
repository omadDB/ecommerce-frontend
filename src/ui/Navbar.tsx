import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <header>
      <div>
        <Image src="/favicon.ico" width={100} height={100} alt="Logo" />
        <nav>
          <li>
            <Link href="/">Bosh sahifa</Link>
          </li>
          <li>
            <Link href="/products">Tovarlar</Link>
          </li>
          <li>
            <Link href="/contacts">Kontaktlar</Link>
          </li>
          <li></li>
        </nav>
      </div>
      <div>
        <input type="text" placeholder="Search..." />
        <Link href="/profile">Profil</Link>
        <Link href="/cart">Savat</Link>
      </div>
    </header>
  )
}
