// app/routes/index.tsx または app/pages/index.tsx
import React from 'react'
import Image from 'next/image'
import Ginzan from '../public/ginzan.jpg'

export default function HomePage() {
  // ここに必要なデータフェッチングやその他のロジックを記述

  return (
    <div>
      <div className="relative h-screen">
        <Image src={Ginzan} alt="Onsen" layout="fill" objectFit="cover" />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-10"></div>
        <h2 className="text-white font-notojp text-8xl leading-normal font-extrabold absolute bottom-0 left-0 p-4 z-10 mb-3">
          つくろう、<br />自分だけの温泉図鑑
          <span className="absolute bottom-44 left-4 w-2/4 h-7 bg-emerald-600 -z-10"></span>
          <span className="absolute bottom-7 left-4 w-full h-7 bg-emerald-600 -z-10"></span>
        </h2>
      </div>
      <div className='my-20'>
        <div>
          <p className="font-notojp text-xl text-gray-600 text-center">What is MyOnsenBook</p>
          <h2 className="font-notojp text-5xl font-bold text-emerald-600 my-4 text-center">自分だけの温泉図鑑を作ろう</h2>
        </div>
        <div className='pt-3'>
          <p className="font-notojp text-xl text-gray-600 text-center leading-relaxed px-10">
            MyOnsenBookとは自分の行った温泉を記録し、自分だけの温泉図鑑を作ることができるサービスです。<br />自分で作成した図鑑を他の人と共有し自分の温泉体験を共有し合うことも、自分がまだ知らない温泉に出会うことも可能です。<br />場所から、泉質から、宿から、自分にあった温泉を探す旅を今すぐ始めましょう。
          </p>
        </div>
      </div>
      <div className='my-20'>
        <p className="font-notojp text-xl text-gray-600 text-center">Famous Onsen</p>
        <h2 className="font-notojp text-5xl font-bold text-emerald-600 my-4 text-center">みんなに人気の温泉</h2>
      </div>
      <div className='my-20'>
        <p className="font-notojp text-xl text-gray-600 text-center">Latest Onsen</p>
        <h2 className="font-notojp text-5xl font-bold text-emerald-600 my-4 text-center">最近追加された温泉</h2>
      </div>
      <div className='bg-slate-200 py-2'>
        <p className="font-notojp text-sm text-black text-center">© my-onsen-book All rights reserved</p>
      </div>
    </div>
  )
}
