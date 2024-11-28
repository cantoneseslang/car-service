import { Metadata } from "next"
import BookingForm from "@/components/booking-form"
import { CompanyHeader } from "@/components/company-header"

export const metadata: Metadata = {
  title: "香港空港 - 深セン送迎サービス | Joyful Travel",
  description: "香港空港から深セン各地域への快適な送迎サービスをご提供します。",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-3xl font-bold">香港空港 - 深セン送迎サービス</h1>
          <BookingForm />
        </div>
      </main>
    </div>
  )
}

