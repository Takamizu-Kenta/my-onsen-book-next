import React from 'react'
import Image from 'next/image'
import Ginzan from '../public/ginzan.jpg'
import YugataOnsen  from '../public/yugata_onsen.jpg'

export default function HomePage() {
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
            MyOnsenBookとは自分の行った温泉を記録し、自分だけの温泉図鑑を作ることができるサービスです。<br />自分で作成した温泉を他の人と共有することも、誰かが追加してくれた、あなたのまだ知らない温泉に出会うことも可能です。
          </p>
          <p className="font-notojp text-xl text-gray-600 text-center leading-relaxed px-10 py-5">
            もしあなたが行った温泉が登録されていなかったら、ぜひ積極的に登録してみてください。<br />あなたが登録した温泉が、誰かの温泉図鑑をより充足させるきっかけになります。
          </p>
          <p className="font-notojp text-xl text-gray-600 text-center leading-relaxed px-10 py-5">
            自分にあった温泉を探す旅を今すぐ始めましょう。
          </p>
        </div>
      </div>
      <div className='my-10'>
        <p className="font-notojp text-xl text-gray-600 text-center">What is Onsen</p>
        <h2 className="font-notojp text-5xl font-bold text-emerald-600 my-4 text-center">温泉とは</h2>
      </div>
      <div className='flex pt-3 flex-col items-center py-10'>
        <Image src={ YugataOnsen } alt="Onsen" width={960} height={540} />
        <p className="font-notojp text-xl text-gray-600 text-center leading-relaxed px-10 my-10">
          日本では、温泉は「温泉法」という法律によって「地中からゆう出する温水、鉱水及び水蒸気その他のガス（炭化水素を主成分とする天然ガスを除く。）で、別表①に掲げる温度又は物質を有するもの」と定義されています。<br />したがって、地中からゆう出した時の温度が、25℃以上あれば温泉となり、また25℃未満であっても別表の物質（19項目のうちいずれかひとつ以上）が規定量含まれていれば、温泉となります。<br />また条件を満たせば水蒸気やガスも温泉となります。<br />※温泉協会HPより
        </p>
        <p className="font-notojp text-xl text-gray-600 text-center leading-relaxed px-10 py-5">
        環境省によると、日本には2016年度時点で3038の温泉地（源泉数は2万7422）があります。<br />温泉はヨーロッパでは医療行為の一環として位置付けられる側面が強いそうですが、日本では観光を兼ねた娯楽である場合が多いようです。
        </p>
      </div>
      <div className='bg-slate-200 py-2'>
        <p className="font-notojp text-sm text-black text-center">© my-onsen-book All rights reserved</p>
      </div>
    </div>
  )
}
