"use client"

import { useState } from "react"
import { Star, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Review {
  id: string
  userName: string
  date: string
  rating: number
  comment: string
  vehicleRating: number
  driverRating: number
  punctualityRating: number
  safetyRating: number
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    userName: "mitsuhashi",
    date: "2024年11月14日",
    rating: 5,
    comment: "香港空港から深センまでの送迎サービスを利用しました。ドライバーは時間通りに到着し、とても丁寧で親切でした。車内は清潔で快適でした。国境越えの手続きもスムーズでした。深センまでの移動時間は予想以上に短く、約1時間で到着しました。荷物が多い場合や、初めて深センに行く方には特におすすめです。",
    vehicleRating: 5,
    driverRating: 5,
    punctualityRating: 5,
    safetyRating: 5,
  },
  // Add more mock reviews as needed
]

export function ReviewSection() {
  const [activeTab, setActiveTab] = useState("all")
  const averageRating = 4.6
  const totalReviews = 221
  const calculateAverageRating = (category: keyof Review) => {
    // Use reduce to sum up the ratings for the specified category
    return MOCK_REVIEWS.reduce((acc, review) => {
      // Ensure the value being added is a number
      const value = review[category];
      if (typeof value === 'number') {
        return acc + value;
      }
      return acc;
    }, 0) / MOCK_REVIEWS.length; // Divide by the number of reviews to get the average
  }

  const renderStars = (rating: number) => {
    // Create an array of 5 elements and map over it to render stars
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const renderRatingBar = (rating: number, label: string) => (
    <div className="flex items-center gap-4">
      <div className="w-32">{label}</div>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-yellow-400 rounded-full"
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
      <div className="w-12 text-right">{rating.toFixed(1)}</div>
    </div>
  )

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>クチコミ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">{averageRating}</div>
              <div>
                <div className="flex">{renderStars(Math.floor(averageRating))}</div>
                <div className="text-sm text-gray-500">{totalReviews}件のクチコミにもとづく評価</div>
              </div>
            </div>
            <div className="space-y-4">
              {renderRatingBar(4.8, "車両の状態")}
              {renderRatingBar(4.7, "ドライバーのサービス")}
              {renderRatingBar(4.8, "時間の正確性")}
              {renderRatingBar(4.8, "安全性")}
            </div>
          </div>
          <div>
            <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex justify-between mb-4">
  <TabsTrigger value="all" className="flex-1 text-sm text-center">すべて</TabsTrigger>
  <TabsTrigger value="with-photos" className="flex-1 text-sm text-center">写真付きのみ</TabsTrigger>
  <TabsTrigger value="recommended" className="flex-1 text-sm text-center">おすすめ</TabsTrigger>
</TabsList>
              <TabsContent value="all" className="space-y-4">
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <Avatar>
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex mb-2">{renderStars(review.rating)}</div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

