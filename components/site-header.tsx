import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/lifesupport-logo.png"
            alt="LIFESUPPORT HONGKONG"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <span className="font-bold">LIFESUPPORT HONGKONG</span>
        </Link>
      </div>
    </header>
  )
}

