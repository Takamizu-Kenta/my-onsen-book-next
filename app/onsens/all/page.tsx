"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Onsen } from '../../src/types/onsen'
import { Input } from "@nextui-org/react"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import OnsenSelect from "../../components/selects/OnsenSelect"

const Onsens = () => {
  const [onsens, setOnsens] = useState<Onsen[]>([])

  const fetchOnsens = async () => {
    try {
      const res = await axios.get<Onsen[]>('http://localhost:3000/api/v1/onsens/all')

      setOnsens(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const displayQuality = (onsen: any) => <span>{onsen.quality}</span>;
  const displayQualityText = (onsen: any) => onsen.quality;

  const displayPrefecture = (onsen: any) => <span>{onsen.pref}</span>;
  const displayPrefectureText = (onsen: any) => onsen.pref;

  useEffect(() => {
    fetchOnsens()
  }, [])

  return (
    <div className='p-8'>
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
      <div className='ml-3'>
        <OnsenSelect
          label="泉質から選ぶ"
          placeholder="希望の泉質を選択してください"
          onsens={onsens}
          displayValue={displayQuality}
          displayText={displayQualityText}
          className="max-w-xs mb-3 mr-3"
        />
        <OnsenSelect
          label="都道府県から選ぶ"
          placeholder="希望の都道府県を選択してください"
          onsens={onsens}
          displayValue={displayPrefecture}
          displayText={displayPrefectureText}
          className="max-w-xs mb-3 mr-3"
        />
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="grid grid-cols-1 justify-center w-full">
          {onsens.map((onsen: any) => (
            <Card  key={onsen.id} className="py-4 m-2 w-full" shadow="none">
              <CardHeader className="pb-2 pt-1 px-4 flex flex-col items-start border-b-2">
                <div className="flex items-end mb-2">
                  <p className="text-sm font-bold">{onsen.pref}</p>
                  <p className="text-tiny font-bold ml-2 text-gray-500">{onsen.onsen_area_name}</p>
                </div>
                <div className='flex items-baseline'>
                  <h4 className="font-bold text-xl mr-3">{onsen.onsen_name}</h4>
                  <small className="text-default-500">{onsen.onsen_name_kana}</small>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <small className="text-default-500">主な泉質</small>
                <small className="text-default-500">{onsen.quality}</small>
                <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{onsen.description}</p>
                <Link href={`/onsens/${onsen.id}`}>
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

export default Onsens;
