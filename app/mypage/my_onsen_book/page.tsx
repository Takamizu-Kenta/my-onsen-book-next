"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Onsen } from '../../src/types/onsen'
import { Prefecture } from '../../src/types/prefecture'
import Link from 'next/link'
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import OnsenSearchForm from '@/app/components/forms/OnsenSearchForm'
import { onsensAtomFamily } from '@/app/atoms/onsens'
import { useRecoilValue } from 'recoil'

const MyOnsens = () => {
  const myOnsens = useRecoilValue(onsensAtomFamily("http://localhost:3000/api/v1/onsens/my_onsen_book"))
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])

  const fetchPrefectures = async () => {
    try {
      const res = await axios.get<Prefecture[]>('http://localhost:3000/api/v1/prefectures')

      setPrefectures(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPrefectures()
  }
  , [])

  return (
    <div className='p-8'>
      <div className="flex items-end justify-between">
        <div className='mb-5'>
          <h1 className="font-notojp text-5xl font-bold text-emerald-600 my-4">あなたのMyOnsenBook</h1>
          <p className="font-notojp text-xl text-gray-600">あなたが追加した温泉一覧です。気になる温泉/訪れた温泉を追加してあなただけのOnsenBookを作成しよう！</p>
        </div>
      </div>
      <div className='ml-3 flex flex-row items-start w-full'>
        <OnsenSearchForm prefectures={prefectures} url="http://localhost:3000/api/v1/onsens/my_onsen_book" />
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="grid grid-cols-1 justify-center w-full">
          {myOnsens.map((MyOnsen: Onsen) => (
            <Card key={MyOnsen.id} className="py-4 m-2 w-full" shadow="none">
              <CardHeader className="pb-2 pt-1 px-4 flex flex-col items-start border-b-2">
                <div className="flex items-end mb-2">
                  <p className="text-sm font-bold">{MyOnsen.pref}</p>
                  <p className="text-tiny font-bold ml-2 text-gray-500">{MyOnsen.onsen_area_name}</p>
                </div>
                <div className='flex items-baseline'>
                  <h4 className="font-bold text-xl mr-3">{MyOnsen.onsen_name}</h4>
                  <small className="text-default-500">{MyOnsen.onsen_name_kana}</small>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <small className="text-default-500">主な泉質</small>
                <small className="text-default-500">{MyOnsen.quality}</small>
                <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{MyOnsen.onsen_description}</p>
                <Link href={`/onsens/${MyOnsen.id}`}>
                  <p className=" text-sm mt-6 mr-5 text-right text-emerald-600">もっとみる→</p>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex w-full justify-end">
          {/* ページネーション？ */}
        </div>
      </div>
    </div>
  )
}

export default MyOnsens
