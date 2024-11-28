"use client"

import { useState } from "react"
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RatingCategory {
  id: string
  label: string
}

const RATING_CATEGORIES: RatingCategory[] = [
  { id: "vehicle", label: "車両の状態" },
  { id: "driver", label: "ドライバーのサービス" },
  { id: "punctuality", label: "時間の正確性" },
  { id: "safety", label: "安全性" },
]

const DESTINATIONS = [
  "深セン宝安区",
  "深セン福田区",
  "深セン南山区",
  "深セン羅湖区",
]

export function ReviewForm() {
  const [ratings, setRatings] = useState<Record<string, number>>({
    vehicle: 0,
    driver: 0,
    punctuality: 0,
    safety: 0,
  })
  const [comment, setComment] = useState("")
  const [rideDate, setRideDate] = useState("")
  const [rideTime, setRideTime] = useState("")
  const [destination, setDestination] = useState("")

  const handleRatingChange = (category: string, rating: number) => {
    setRatings(prev => ({ ...prev, [category]: rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ratings, comment, rideDate, rideTime, destination })
    // Here you would typically send the review to your backend
  }

  const RatingStars = ({ category, value }: { category: string, value: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingChange(category, star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${
              star <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <Card className="mt-8">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>レビューを投稿</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rideDate">乗車日</Label>
            <Input
              id="rideDate"
              type="date"
              value={rideDate}
              onChange={(e) => setRideDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rideTime">乗車時間</Label>
            <Input
              id="rideTime"
              type="time"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">目的地</Label>
            <Select
              value={destination}
              onValueChange={setDestination}
              required
            >
              <SelectTrigger id="destination">
                <SelectValue placeholder="目的地を選択してください" />
              </SelectTrigger>
              <SelectContent>
                {DESTINATIONS.map((dest) => (
                  <SelectItem key={dest} value={dest}>
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {RATING_CATEGORIES.map((category) => (
            <div key={category.id} className="space-y-2">
              <Label>{category.label}</Label>
              <RatingStars
                category={category.id}
                value={ratings[category.id]}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="comment">コメント</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="サービスについての感想をお聞かせください"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            レビューを投稿
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

