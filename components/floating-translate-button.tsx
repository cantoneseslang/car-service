"use client"

import { Button } from "@/components/ui/button"
import { Globe2 } from 'lucide-react'

export function FloatingTranslateButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 小さめのウィンドウを開く（幅800px、高さ600px）
    window.open(
      "https://x.gd/ZpvYJ",
      "translationWindow",
      "width=800,height=600,resizable=yes,scrollbars=yes"
    )
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 shadow-lg z-50 rounded-full bg-[#4CAF50] hover:bg-[#45a049] px-6 py-4 text-lg"
    >
      <Globe2 className="w-6 h-6 mr-3" />
      AI広東語翻訳
    </Button>
  )
}

