"use client"

import { useState, useCallback } from "react"
import { Car, Users, Plane, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { ReviewSection } from "./review-section"
import { ReviewForm } from "./review-form"
import { ServiceDetails } from "./service-details"
import Image from "next/image"

const DESTINATIONS = [
  "深セン宝安区",
  "深セン福田区",
  "深セン南山区",
  "深セン羅湖区",
]

const VEHICLE_TYPES = [
  {
    id: "alphard",
    name: "Alphard",
    capacity: "6名様まで",
    price: 1080,
    disabled: false
  },
  {
    id: "minibus",
    name: "ミニバス",
    capacity: "20名様まで",
    price: 1580,
    disabled: true
  },
  {
    id: "bus",
    name: "大型バス",
    capacity: "47名様まで",
    price: 2580,
    disabled: true
  },
]

const ID_TYPES = [
  "パスポート",
  "運転免許証",
  "マイナンバーカード",
  "在留カード",
]

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 22.5431,
  lng: 114.0579
};

function CarImages() {
  return (
    <div className="flex flex-col space-y-10">
      <Image
        src="/images/car1.png"
        alt="Car 1"
        width={500}
        height={300}
        className="w-500 h-300"
      />
      <Image
        src="/images/car2.png"
        alt="Car 2"
        width={500}
        height={300}
        className="w-500 h-300"
      />
      <Image
        src="/images/car3.png"
        alt="Car 3"
        width={500}
        height={300}
        className="w-500 h-300"
      />
    </div>
  )
}

export default function BookingForm() {
  const [selectedDestination, setSelectedDestination] = useState("")
  const [specificAddress, setSpecificAddress] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES[0].id)
  const [flightNumber, setFlightNumber] = useState("")
  const [arrivalDate, setArrivalDate] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [useMap, setUseMap] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(center)

  // Customer information states
  const [nameJapanese, setNameJapanese] = useState("")
  const [nameEnglish, setNameEnglish] = useState("")
  const [phoneNumber1, setPhoneNumber1] = useState("")
  const [phoneNumber2, setPhoneNumber2] = useState("")
  const [idType, setIdType] = useState("")
  const [idNumber, setIdNumber] = useState("")

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log({
      destination: selectedDestination,
      specificAddress: useMap ? `${markerPosition.lat}, ${markerPosition.lng}` : specificAddress,
      vehicleType: selectedVehicle,
      flightNumber,
      arrivalDateTime: `${arrivalDate}T${arrivalTime}:00+08:00`,
      customerInfo: {
        nameJapanese,
        nameEnglish,
        phoneNumber1,
        phoneNumber2,
        idType,
        idNumber
      }
    })
    window.location.href = "https://buy.stripe.com/bIY4hx3haape2CQ5kv"
  }

  return (
    <div className="container mx-auto p-2">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <CarImages />
        </div>
        <div className="w-full lg:w-8/8">
          <form onSubmit={handleSubmit}>
             {/* フォームの内容 */}
            <Card>
              <CardHeader>
                <CardTitle>送迎サービスを予約</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>出発地</Label>
                  <Select defaultValue="香港国際空港">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="香港国際空港">香港国際空港</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flightNumber">便名</Label>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4" />
                    <Input
                      id="flightNumber"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="例：CX123"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrivalDate">到着日（香港時間）</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrivalTime">到着時刻（香港時間）</Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <Input
                      id="arrivalTime"
                      type="time"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-semibold mb-2">送迎車の待機場所</h3>
                  <p>香港国際空港の到着ロビー、A出口を出て右側にお進みください。運転手がお客様のお名前が書かれたボードを持って待機しておりますので、お声がけください。</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">目的地</Label>
                  <Select
                    value={selectedDestination}
                    onValueChange={setSelectedDestination}
                  >
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="目的地を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {DESTINATIONS.map((destination) => (
                        <SelectItem key={destination} value={destination}>
                          {destination}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedDestination && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="useMap"
                        checked={useMap}
                        onChange={(e) => setUseMap(e.target.checked)}
                      />
                      <Label htmlFor="useMap">Google Mapsで位置を選択する</Label>
                    </div>
                    {useMap ? (
                      loadError ? (
                        <div className="text-red-500">
                          Google Mapsの読み込みに失敗しました。管理者にお問い合わせください。
                        </div>
                      ) : !isLoaded ? (
                        <div>地図を読み込んでいます...</div>
                      ) : (
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={center}
                          zoom={10}
                          onClick={onMapClick}
                        >
                          <Marker position={markerPosition} />
                        </GoogleMap>
                      )
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="specificAddress">具体的な送り先住所</Label>
                        <Textarea
                          id="specificAddress"
                          placeholder={`${selectedDestination}内の具体的な住所を入力してください`}
                          value={specificAddress}
                          onChange={(e) => setSpecificAddress(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <Label>車種を選択</Label>
                  <RadioGroup
                    defaultValue={selectedVehicle}
                    onValueChange={setSelectedVehicle}
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                  >
                    {VEHICLE_TYPES.map((vehicle) => (
                      <div key={vehicle.id}>
                        <RadioGroupItem 
                          value={vehicle.id} 
                          id={vehicle.id} 
                          className="peer sr-only" 
                          disabled={vehicle.disabled}
                        />
                        <Label
                          htmlFor={vehicle.id}
                          className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${
                            vehicle.disabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <Car className="mb-3 h-6 w-6" />
                          <div className="text-center">
                            <div className="font-medium">{vehicle.name}</div>
                            <div className="text-sm text-muted-foreground">
                              <Users className="mr-1 inline-block h-4 w-4" />
                              {vehicle.capacity}
                            </div>
                            <div className="mt-1 text-xl font-bold">${vehicle.price}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-semibold">お客様情報</h3>
                  <div className="space-y-2">
                    <Label htmlFor="nameJapanese">お名前（日本語）</Label>
                    <Input
                      id="nameJapanese"
                      value={nameJapanese}
                      onChange={(e) => setNameJapanese(e.target.value)}
                      placeholder="例：山田 太郎"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nameEnglish">お名前（英語）</Label>
                    <Input
                      id="nameEnglish"
                      value={nameEnglish}
                      onChange={(e) => setNameEnglish(e.target.value)}
                      placeholder="例：YAMADA TARO"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber1">電話番号 1</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <Input
                        id="phoneNumber1"
                        type="tel"
                        value={phoneNumber1}
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                        placeholder="例：+81 90-1234-5678"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber2">電話番号 2（任意）</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <Input
                        id="phoneNumber2"
                        type="tel"
                        value={phoneNumber2}
                        onChange={(e) => setPhoneNumber2(e.target.value)}
                        placeholder="例：+81 80-1234-5678"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idType">身分証明書の種類</Label>
                    <Select value={idType} onValueChange={setIdType}>
                      <SelectTrigger id="idType">
                        <SelectValue placeholder="身分証明書の種類を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {ID_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">身分証明書番号</Label>
                    <Input
                      id="idNumber"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="身分証明書番号を入力してください"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">予約する</Button>
              </CardFooter>
            </Card>
          </form>
          <div className="mt-8">
            <ReviewSection />
            <ReviewForm />
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <ServiceDetails />
        </div>
      </div>
    </div>
  )
}