"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { Facility } from '../src/types/facility'
import { Onsen } from '../src/types/onsen'
import { Modal, ModalContent, Button, Input, Link, Spinner } from "@nextui-org/react"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import PrefectureSelect from '../components/selects/PrefectureSelect'
import CreateFacilityModal from '../components/modals/CreateFacilityModal'

const AllFacilities = () => {
  const [onsens, setOnsens] = useState<Onsen[]>([])
  const { data: prefectures, error: prefecturesError } = useSWR('http://localhost:3000/api/v1/prefectures', (url) => axios.get(url).then(res => res.data))
  const { data: facilityTypes, error: facilityTypesError } = useSWR('http://localhost:3000/api/v1/facility_types', (url) => axios.get(url).then(res => res.data))
  const { data: facilities, error: facilitiesError } = useSWR('http://localhost:3000/api/v1/facilities', (url) => axios.get(url).then(res => res.data))

  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange = (newOpenValue: boolean) => {
    setIsOpen(newOpenValue);
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    axios.post<Onsen[]>('http://localhost:3000/api/v1/onsens/all', {
      body: {},
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }, { withCredentials: true }).then(res => setOnsens(res.data))
  }, [])

  if (prefecturesError || facilityTypesError || facilitiesError) {
    console.error(prefecturesError || facilityTypesError || facilitiesError)
    return <div>データの読み込みに失敗しました。</div>
  }

  if (!onsens || !prefectures || !facilityTypes || !facilities) {
    return <div className='h-full w-full flex justify-center'><Spinner size="lg" className='align-center justify-center' color='success' /></div>
  }

  return (
    <div className='p-8'>
      <div className="flex items-end justify-between">
        <div className='mb-5'>
          <h1 className="font-notojp text-5xl font-bold text-emerald-600 my-4">施設データベース</h1>
          <p className="font-notojp text-xl text-gray-600">温泉施設周辺の施設データベース</p>
        </div>
        <div>
          <Button onPress={onOpen} className="mt-2 w-52 mb-7 bg-theme border-theme font-notojp font-medium text-white text-base" variant="bordered">
            ＋ 施設を追加する
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className="w-1/2"
            size={"4xl"}
          >
            <ModalContent>
              {onClose => <CreateFacilityModal onClose={onClose} prefectures={prefectures} onsens={onsens} facilityTypes={facilityTypes} />}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className='ml-3 flex flex-row items-center w-full'>
        <Input
          classNames={{
            base: "h-12 mb-3",
            mainWrapper: "h-full w-96",
            input: "text-md",
            inputWrapper: "h-full w-full font-normal text-default-500 bg-default-300/20",
          }}
          placeholder="施設名を入力してください"
          size="sm"
          // startContent={<SearchIcon size={18} />}
          type="search"
        />
        <PrefectureSelect
          isRequired={false}
          label="都道府県から選ぶ"
          placeholder="都道府県を選択してください"
          prefectures={prefectures}
          variant="flat"
          className="max-w-xs mb-3 mr-3"
        />
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="grid grid-cols-1 justify-center w-full">
          {facilities.map((facility: Facility) => (
            <Card  key={facility.id} className="py-4 m-2 w-full" shadow="none">
              <CardHeader className="pb-2 pt-1 px-4 flex flex-col items-start border-b-2">
                <div className="flex items-end mb-2">
                  <p className="text-sm font-bold">{facility.pref}</p>
                  <p className="text-tiny font-bold ml-2 text-gray-500">{facility.onsen_name}</p>
                </div>
                <div className='flex items-baseline'>
                  <h4 className="font-bold text-xl mr-3">{facility.facility_name}</h4>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-default-500 text-sm overflow-hidden line-clamp-2">{facility.address}</p>
                <p className="text-sm font-bold text-gray-600 overflow-hidden line-clamp-2 mt-5">{facility.facility_description}</p>
                <Link href={`/facilities/${facility.id}`}>
                  <p className=" text-sm mt-6 mr-5 ml-auto text-emerald-600">もっとみる→</p>
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

export default AllFacilities
