import Image from "next/image"
import { ShoppingCart, Search } from 'lucide-react'

export function CompanyHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <button className="lg:hidden">
          <span className="sr-only">メニュー</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-4">
          <Image
            src="/images/life-support-icon-512x512.png"
            alt="Company Logo"
            width={220}
            height={100}
            className="h-50 w-40"
          />
          <h1 className="text-2xl font-bold">HCJP CarAgency</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <Search className="h-6 w-6" />
            <span className="sr-only">検索</span>
          </button>
          <button>
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">カート</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function CarImages() {
  return (
    <div className="flex flex-col space-y-4">
      <Image
        src="/images/car1.png"
        alt="Car 1"
        width={300}
        height={200}
        className="w-full h-auto"
      />
      <Image
        src="/images/car2.png"
        alt="Car 2"
        width={300}
        height={200}
        className="w-full h-auto"
      />
      <Image
        src="/images/car3.png"
        alt="Car 3"
        width={300}
        height={200}
        className="w-full h-auto"
      />
    </div>
  )
}

// 使用する場所で
<div className="flex">
  <CarImages />
  <div className="form-container">
    {/* ここにフォームのコードを配置 */}
  </div>
</div>