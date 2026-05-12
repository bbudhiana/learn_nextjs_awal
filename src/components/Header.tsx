import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "@/src/components/ThemeSwitcher";

function Header() {
  return (
        <header className="header">
          <nav>
            <div className="logo">
              <Link href="/">
                <Image src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp" alt="Logo NextJS" width={100} height={50} />
              </Link>
            </div>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/posts">Posts</Link>
              <Link href="/about">About</Link>
          </div>
          <ThemeSwitcher />
          </nav>
        </header>
  )
}

export default Header