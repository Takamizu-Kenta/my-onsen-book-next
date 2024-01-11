"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Onsen } from '../src/types/onsen'
import  { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import { Button } from "@nextui-org/react"

const Onsens = () => {
  const [onsens, setOnsens] = useState<Onsen[]>([])
  const [latestOnsens, setLatestOnsens] = useState<Onsen[]>([])

  const fetchOnsens = async () => {
    try {
      const res = await axios.get<Onsen[]>('http://localhost:3000/api/v1/onsens')

      setOnsens(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchLatestOnsens = async () => {
    try {
      const res = await axios.get<Onsen[]>('http://localhost:3000/api/v1/onsens/latest')
      setLatestOnsens(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchOnsens()
    fetchLatestOnsens() // 追加
  }, [])

  return (
    <div className='bg-slate-100 h-screen p-8'>
      <div className="flex items-end justify-between">
        <div className='mb-5'>
          <h1 className="font-notojp text-5xl font-bold text-emerald-600 my-4">温泉データベース</h1>
          <p className="font-notojp text-xl text-gray-600">温泉の情報を登録してみんなで共有しよう！</p>
        </div>
      </div>
      <h3 className='font-notojp text-3xl font-semibold text-gray-700 my-10'>おすすめの温泉</h3>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2 line-clamp-2 justify-center">
          {onsens.slice(0, 6).map((onsen: any) => (
            <Card  key={onsen.id} className="py-4 m-2 w-96" shadow="none">
              <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
                {onsen.onsen_image ? (
                  <Image src={onsen.onsen_image} alt='Onsen Image' width={1280} height={720} />
                ) : (
                  <Image src='https://placehold.jp/1280x720.png' alt='No Image' width={1280} height={720} />
                )}
                <div className="flex items-end mb-2 my-4">
                  <p className="text-sm font-bold">{onsen.pref}</p>
                  <p className="text-tiny font-bold ml-2 text-gray-500">{onsen.onsen_area_name}</p>
                </div>
                <h4 className="font-bold text-large">{onsen.onsen_name}</h4>
                <small className="text-default-500">{onsen.quality}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{onsen.onsen_description}</p>
                <Link href={`/onsens/${onsen.id}`}>
                  <p className=" text-sm mt-6 text-right text-emerald-600">もっとみる→</p>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <Link href="/onsens/all">
            <Button className="mt-5 w-40 mr-6" color="success" variant="bordered">
              一覧を見る
            </Button>
          </Link>
        </div>
      </div>

      <div className='py-10'>
        <h3 className='font-notojp text-3xl font-semibold text-gray-700 my-10'>みんなが最近追加した温泉</h3>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2 line-clamp-2 justify-center">
            {latestOnsens.slice(0, 6).map((latest_onsen: any) => (
              <Card  key={latest_onsen.id} className="py-4 m-2 w-96" shadow="none">
                <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
                  {latest_onsen.onsen_image ? (
                    <Image src={latest_onsen.onsen_image} alt='latest_onsen Image' width={1280} height={720} />
                  ) : (
                    <Image src='https://placehold.jp/1280x720.png' alt='No Image' width={1280} height={720} />
                  )}
                  <div className="flex items-end mb-2 my-4">
                    <p className="text-sm font-bold">{latest_onsen.pref}</p>
                    <p className="text-tiny font-bold ml-2 text-gray-500">{latest_onsen.onsen_area_name}</p>
                  </div>
                  <h4 className="font-bold text-large">{latest_onsen.onsen_name}</h4>
                  <small className="text-default-500">{latest_onsen.quality}</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{latest_onsen.onsen_description}</p>
                  <Link href={`/onsens/${latest_onsen.id}`}>
                    <p className=" text-sm mt-6 text-right text-emerald-600">もっとみる→</p>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onsens;
