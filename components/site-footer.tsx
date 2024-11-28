import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold">LIFESUPPORT HONGKONG</h3>
            <p className="text-sm text-gray-600">
              香港・深セン間の安全で快適な送迎サービスを提供いたします。
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">重要情報</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/terms" className="hover:underline">
                  利用規約・免責事項
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} LIFESUPPORT HONGKONG. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

