"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { Onsen } from '../../src/types/onsen'
import { Prefecture } from '../../src/types/prefecture'
import Link from 'next/link'
import { Modal, ModalContent, Button, Input, Spinner } from "@nextui-org/react"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import PrefectureSelect from '../../components/selects/PrefectureSelect'
import CreateOnsenModal from '@/app/components/modals/CreateOnsenModal'
import OnsenSearchForm from '@/app/components/forms/OnsenSearchForm'
import { onsensAtomFamily } from '@/app/atoms/onsens'
import { useRecoilValue } from 'recoil'

const AllOnsens = () => {
  const onsens = useRecoilValue(onsensAtomFamily("http://localhost:3000/api/v1/onsens/all"))
  const { data: prefectures, error: prefecturesError } = useSWR('http://localhost:3000/api/v1/prefectures', (url) => axios.get(url, { withCredentials: true }).then(res => res.data))

  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange = (newOpenValue: boolean) => {
    setIsOpen(newOpenValue)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  if (prefecturesError) {
    console.error(prefecturesError)
    return <div>データの読み込みに失敗しました。</div>
  }

  if (!prefectures) {
    return <div className='h-full w-full flex justify-center'><Spinner size="lg" className='align-center justify-center' color='success' /></div>
  }

  return (
    <div className='p-8'>
      <div className="flex items-end justify-between">
        <div className='mb-5'>
          <h1 className="font-notojp text-5xl font-bold text-emerald-600 my-4">温泉データベース</h1>
          <p className="font-notojp text-xl text-gray-600">温泉の情報を登録してみんなで共有しよう！</p>
        </div>
        <div>
          <Button onPress={onOpen} className="mt-2 w-52 mb-7 bg-theme border-theme font-notojp font-medium text-white text-base" variant="bordered">
            ＋ 温泉を追加する
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className="w-1/2"
            size={"4xl"}
          >
            <ModalContent>
              {(onClose) => <CreateOnsenModal onClose={onClose} prefectures={prefectures} />}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className='ml-3 flex flex-row items-start w-full'>
        <OnsenSearchForm prefectures={prefectures} url="http://localhost:3000/api/v1/onsens/all" />
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="grid grid-cols-1 justify-center w-full">
          {onsens.map((onsen: Onsen) => (
            <Card key={onsen.id} className="py-4 m-2 w-full" shadow="none">
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
                <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{onsen.onsen_description}</p>
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

export default AllOnsens
