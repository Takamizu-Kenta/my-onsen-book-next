"use client"

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { Onsen, OnsenResponse } from '../../src/types/onsen'
import { Facility } from '../../src/types/facility'
import { Button, Spinner } from "@nextui-org/react"
import MyOnsenBookBtn from '../../components/buttons/MyOnsenBookBtn'

const ShowOnsen = () => {
  const [onsen, setOnsen] = useState<Onsen | null>(null)
  const [relatedFacilities, setFacilities] = useState<Facility[] | null>([])

  const router = useRouter()

  const params = useParams()
  const id = params.id

  const fetchOnsen = useCallback(async () => {
    try {
      const res = await axios.get<OnsenResponse>(`http://localhost:3000/api/v1/onsens/${id}`, { withCredentials: true })

      setOnsen(res.data.onsen)
      setFacilities(res.data.related_facilities || null)
    } catch (err) {
      console.log(err)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchOnsen()
    }
  }, [fetchOnsen, id])

  if (!onsen) {
    return <div className='h-full w-full flex justify-center'><Spinner size="lg" className='align-center justify-center' color='success' /></div>
  }

  return (
    <div className='bg-slate-100 h-screen p-8'>
      <div>{/* 一覧に戻る、お気に入り */}
        <Button className="mt-2 w-40 mr-6 mb-7" color="success" variant="bordered" onClick={router.back}>
          一覧に戻る
        </Button>
      </div>
      <div className='flex items-baseline border-b-3 border-emerald-600 my-6'>
        <h1 className='font-notojp text-4xl font-semibold text-gray-600 mb-4 mr-5'>{onsen.onsen_name}</h1>
        <p className='font-notojp text-xl text-gray-600'>{onsen.onsen_name_kana} / {onsen.pref}</p>
        <div className='ml-auto mb-2.5 self-center'>
          {/* <Button className="w-40 mr-5" color="success" variant="bordered">
            この温泉に行きたい！
          </Button> */}
          <MyOnsenBookBtn color="success" marked={onsen.is_owner || false}></MyOnsenBookBtn>
        </div>
      </div>
      <div className='flex'>
        <div className='flex-1 w-1/2 m-2'>
          {onsen.onsen_image ? (
            <Image src={onsen.onsen_image} alt='Onsen Image' width={1280} height={720} />
          ) : (
            <Image src='https://placehold.jp/1280x720.png' alt='No Image' width={1280} height={720} />
          )}
        </div>
        <div className='flex-2 w-1/2 m-2 leading-8'>
          <p>{onsen.onsen_description}</p>
        </div>
      </div>
      <div className='mt-10'>
        <h4 className='font-notojp text-2xl font-semibold text-gray-600 mb-10 mr-5'>
          {onsen.onsen_name}の基本情報
        </h4>
        <table className="min-w-full divide-y divide-gray-20 overflow-hidden border-b border-gray-200 sm:rounded-lg font-notojp text-xl text-gray-600 ml-3">
          <tbody className="divide-y divide-gray-400">
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap">温泉名</th>
              <td className="px-6 py-4 text-lg font-notojp">{onsen.onsen_name}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap">温泉名（かな）</th>
              <td className="px-6 py-4 text-lg font-notojp">{onsen.onsen_name_kana}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">都道府県</th>
              <td className="px-6 py-4 text-lg font-notojp">{onsen.pref}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">温泉地名</th>
              <td className="px-6 py-4 text-lg font-notojp">{onsen.onsen_area_name}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">泉質</th>
              <td className="px-6 py-4 text-lg font-notojp">{onsen.quality}</td>
            </tr>
            {/* <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">泉温</th>
              <td className="px-6 py-4 whitespace-nowrap">{onsen.temperature}</td>
            </tr> */}
            <tr>
              <th className="ml-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">効能</th>
              <td className="px-6 py-4 text-lg font-notojp">{onsen.effects}</td>
            </tr>
          </tbody>
        </table>
      </div>
      { relatedFacilities && (
        <div className='my-10 w-full'>
          <h4 className='font-notojp text-2xl font-semibold text-gray-600 mb-10 mr-5'>
            {onsen.onsen_name}周辺の施設
          </h4>
          <div>
            {relatedFacilities?.map((facility: Facility) => (
              <div key={facility?.id} className='flex items-center border-b-2 border-gray-200 ml-3 pb-5 h-56 justify-between'>
                <div className='flex-1 w-1/3 m-2 max-h-48 max-w-sm'>
                  {facility?.facility_image ? (
                    <Image src={facility.facility_image} alt='Facility Image' width={1280} height={720} />
                  ) : (
                    <Image src='https://placehold.jp/1280x720.png' alt='No Image' width={1280} height={720} />
                  )}
                </div>
                <div className='flex flex-col flex-2 w-2/3 m-2 leading-8 h-full justify-between'>
                  <div>
                    <Link href={`/facilities/${facility.id}`}>
                      <h4 className='font-notojp text-xl font-semibold text-gray-600 align-top my-3'>{facility.facility_name}</h4>
                    </Link>
                    <p className='font-notojp text-sm text-gray-400'>{facility.pref}{facility.address}</p>
                    <p className='font-notojp text-base text-gray-600 mt-5'>{facility.facility_description}</p>
                  </div>
                  <div>
                    <Link href={`/facilities/${facility.id}`}>
                      <p className="text-sm mr-5 text-theme text-right justify-end">もっとみる→</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* TODO: ここから下は後で実装 */}
      {/* <div className='mt-10'>
        <h4 className='font-notojp text-2xl font-semibold text-gray-600 mb-10 mr-5'>
          {onsen.onsen_name}の口コミ
        </h4>
        <div className='flex'>
          <div className='flex-1 w-1/12'>
            <Image src='https://placehold.jp/80x80.png' alt='Avatar Image' width={80} height={80} />
          </div>
          <div className='flex-2 w-11/12'>
            <div className='flex'>
              <h4 className='text-base font-notojp text-gray-600 font-semibold'>良いお風呂でした</h4>
              <p>★★★★☆</p>
            </div>
            <div>
              <p>
                良いお風呂でした。また行きたいです。
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className='flex justify-center mt-10'>{/* 一覧に戻る、お気に入り */}
        <Link href="/onsens/all">
          <Button className="mt-2 w-40 mr-6 mb-7" color="success" variant="bordered">
            一覧に戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ShowOnsen
