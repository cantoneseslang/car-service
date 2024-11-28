"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ServiceDetails() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-4 w-full">
      <button
        className="w-full p-4 text-left font-semibold flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="package-details"
      >
        パッケージ内容
        {isExpanded ? <ChevronUp className="h-5 w-3" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <div
        id="package-details"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-4">
          {/* コンテンツ */}
          <div>
            <div className="flex gap-2 flex-wrap mb-4">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                24時間前までキャンセル無料
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                24時間以内に確定
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                即日利用OK
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                指定日のみ有効
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">含まれるもの</h4>
            <ul className="space-y-2 text-sm">
              <li>• 高速料金</li>
              <li>• 駐車料金</li>
              <li>• ガソリン代</li>
              <li>• お出迎えサービス</li>
              <li>• 片道送迎</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">含まれないもの</h4>
            <ul className="space-y-2 text-sm">
              <li>• チップ＆心づけ</li>
              <li>• 追加料金</li>
              <li>• ビザ手数料</li>
              <li>• 西港横断料金</li>
              <li>• リストされた地域以外の場所</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">キャンセルポリシー</h4>
            <p className="text-sm">アクティビティ開始の24時間前までのキャンセル：全額返金</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">予約の確定</h4>
            <p className="text-sm">24時間以内に予約確定メールが届きます。メールが届かない場合はカスタマーサポートまでお問い合わせください。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">使用方法</h4>
            <ul className="space-y-2 text-sm">
              <li>• バウチャーは指定した日時のみ有効です。</li>
              <li>• モバイルバウチャーをご提示ください。</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">ピックアップ＆ドロップオフ</h4>
            <ul className="space-y-2 text-sm">
              <li>• 予約時にフライト到着日を選択してください。例）フライト到着時刻が5月2日 00:00の場合は「5月2日」を選択してください。</li>
              <li>• 無料待機時間：ドライバーはピックアップ時間から最大60分まで無料で待機します。</li>
              <li>• ピックアップ予定時刻の15分前までにホテルロビーにお越しください。</li>
              <li>• ドライバーは最大15分待機してからその場を離れます（間に合わなかった場合の返金なし）。</li>
              <li>• 対象：深セン：ダウンタウン（南山/福田/羅湖）、宝安、龍華、龍岡、塩田</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">追加料金</h4>
            <ul className="space-y-2 text-sm">
              <li>• 追加料金はドライバーに直接現金でお支払いください。</li>
              <li>• 時間外サービス：
                <ul className="ml-4">
                  <li>- 1時間あたりCNY5:00〜6:59と22:00〜23:29の乗車は100元</li>
                  <li>- 23:30〜4:59の乗車は200元</li>
                </ul>
              </li>
              <li>• 追加停車地点：
                <ul className="ml-4">
                  <li>- 1か所あたりCNY50〜300（距離によって異なります）</li>
                </ul>
              </li>
              <li>• 追加待機時間：
                <ul className="ml-4">
                  <li>- 1時間あたりCNY200</li>
                </ul>
              </li>
              <li>• 対象外エリア：
                <ul className="ml-4">
                  <li>- CNY100 / ルート（宝安区：国際会議展示センター及びその周辺、富海街、新橋街、松岡街、燕羅街。龍華区：観湖街、富成街。龍岡区：平湖街、横岡街、園山街。）</li>
                  <li>- CNY200 / ルート（龍岡区：龍岡中心城、龍城街、宝龍街）</li>
                  <li>- CNY300 / ルート：龍岡区：龍岡街、平地街；塩田区：梅沙街、塩田街</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

