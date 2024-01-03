"use client"

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { Onsen } from '../../src/types/onsen'
import { FacilityResponse, Facility } from '../../src/types/facility'
import { Button, Link, Spinner } from "@nextui-org/react"

const FacilityShow = () => {
  const [facility, setFacility] = useState<Facility | null>(null)
  const [relatedOnsen, setRelatedOnsen] = useState<Onsen | null>(null)

  const params = useParams()
  const id = params.id

  const fetchFacility = useCallback(async () => {
    try {
      const res = await axios.get<FacilityResponse>(`http://localhost:3000/api/v1/facilities/${id}`)

      setFacility(res.data.facility)
      setRelatedOnsen(res.data.related_onsen || null)
    } catch (err) {
      console.log(err)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchFacility()
    }
  }, [fetchFacility, id])

  if (!facility) {
    return <div className='h-full w-full flex justify-center'><Spinner size="lg" className='align-center justify-center' color='success' /></div>
  }

  return (
    <div className='bg-slate-100 h-screen p-8'>
      <div>{/* 一覧に戻る、お気に入り */}
        <Link href="/facilities">
          <Button className="mt-2 w-40 mr-6 mb-7" color="success" variant="bordered">
            一覧に戻る
          </Button>
        </Link>
      </div>
      <div className='flex items-baseline border-b-3 border-emerald-600 my-6'>
        <h1 className='font-notojp text-4xl font-semibold text-gray-600 mb-4 mr-5'>{facility.facility_name}</h1>
        <p className='font-notojp text-xl text-gray-600'>{facility.pref} / {relatedOnsen?.onsen_name}</p>
        <div className='ml-auto mb-2.5 self-center'>
          <Button className="w-40" color="success" variant="bordered">
            お気に入り登録する
          </Button>
        </div>
      </div>
      <div className='flex'>
        <div className='flex-1 w-1/2 m-2'>
          <Image src='https://placehold.jp/1280x720.png' alt='Onsen Image' width={1280} height={720} />
        </div>
        <div className='flex-2 w-1/2 m-2 leading-8'>
          <p>{facility.facility_description}</p>
        </div>
      </div>
      <div className='mt-10'>
        <h4 className='font-notojp text-2xl font-semibold text-gray-600 mb-10 mr-5'>
          {facility.facility_name}の基本情報
        </h4>
        <table className="min-w-full divide-y divide-gray-20 overflow-hidden border-b border-gray-200 sm:rounded-lg font-notojp text-xl text-gray-600 ml-3">
          <tbody className="divide-y divide-gray-400">
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap">施設名</th>
              <td className="px-6 py-4 text-lg font-notojp">{facility.facility_name}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">所在地</th>
              <td className="px-6 py-4 text-lg font-notojp">{facility.address}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">施設タイプ</th>
              <td className="px-6 py-4 text-lg font-notojp">{facility.facility_type}</td>
            </tr>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">公式HP</th>
              <Link isBlock showAnchorIcon href={facility.facility_link} color="primary" className='px-6 py-4 text-lg font-notojp'>
                {facility.facility_link}
              </Link>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='my-10 w-full'>
        <h4 className='font-notojp text-2xl font-semibold text-gray-600 mb-10 mr-5'>
          {facility.facility_name}に湧いている温泉
        </h4>
        <div>
          <div className='flex items-center border-b-2 border-gray-200 ml-3 pb-5 h-56 justify-between'>
            <div className='flex-1 w-1/3 m-2 max-h-80 max-w-sm'>
              <Image src='https://placehold.jp/1280x720.png' alt='Onsen Image' width={1280} height={720} />
            </div>
            <div className='flex flex-col flex-2 w-2/3 m-2 leading-8 h-full'>
              <Link href={`/onsens/${relatedOnsen?.id}`}>
                <h4 className='font-notojp text-xl font-semibold text-gray-600 align-top my-3'>{relatedOnsen?.onsen_name}</h4>
              </Link>
              <p className='font-notojp text-sm text-gray-400'>{relatedOnsen?.pref}</p>
              <p className='font-notojp text-base text-gray-600 mt-5'>{relatedOnsen?.onsen_description}</p>
              <Link className='mt-auto' href={`/onsens/${relatedOnsen?.id}`}>
                <p className=" text-sm mr-5 ml-auto text-emerald-600">もっとみる→</p>
              </Link>
            </div>
            <div className='flex'>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: ここから下は後で実装 */}
      <div className='mt-10'>
        <h4 className='font-notojp text-2xl font-semibold text-gray-600 mb-10 mr-5'>
          {facility.facility_name}の口コミ
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
      </div>
      <div className='flex justify-center mt-10'>{/* 一覧に戻る、お気に入り */}
        <Link href="/facilities">
          <Button className="mt-2 w-40 mr-6 mb-7" color="success" variant="bordered">
            一覧に戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FacilityShow
