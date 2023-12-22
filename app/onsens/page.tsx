"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Onsen } from '../src/types/onsen'
import {Input} from "@nextui-org/react"
import {Card, CardHeader, CardBody} from "@nextui-org/react"
import { Button } from "@nextui-org/react"

const Onsens = () => {
  const [onsens, setOnsens] = useState<Onsen[]>([])

  const fetchOnsens = async () => {
    try {
      const res = await axios.get<Onsen[]>('http://localhost:3000/api/v1/onsens')

      setOnsens(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchOnsens()
  }, [])

  return (
    <div className='bg-slate-100 h-screen p-8'>
      <div className="flex items-end justify-between">
        <div className='mb-5'>
          <h1 className="font-notojp text-5xl font-bold text-emerald-600 my-4">温泉データベース</h1>
          <p className="font-notojp text-xl text-gray-600">温泉の情報を登録してみんなで共有しよう！</p>
        </div>
        <div className='mb-5 w-96'>
          <Input
            classNames={{
              base: "w-screen sm:max-w-[10rem] h-12",
              mainWrapper: "h-full w-96",
              input: "text-md",
              inputWrapper: "h-full w-full font-normal text-default-500 bg-default-300/20",
            }}
            placeholder="温泉名を入力してください"
            size="sm"
            // startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2 line-clamp-2 justify-center">
          {onsens.slice(0, 6).map((onsen: any) => (
            <Card  key={onsen.id} className="py-4 m-2 w-96" shadow="none">
              <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
                <div className="flex items-end mb-2">
                  <p className="text-sm font-bold">{onsen.pref}</p>
                  <p className="text-tiny font-bold ml-2 text-gray-500">{onsen.onsen_area_name}</p>
                </div>
                <h4 className="font-bold text-large">{onsen.onsen_name}</h4>
                <small className="text-default-500">{onsen.quality}</small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{onsen.description}</p>
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

      <div>
        <h3 className='font-notojp text-3xl font-semibold text-gray-700 mt-10'>みんなが最近追加した温泉</h3>
      </div>
    </div>
  )
}

export default Onsens;
