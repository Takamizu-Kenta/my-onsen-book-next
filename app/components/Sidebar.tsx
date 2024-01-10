"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import sidebarIcon from './icons/arrow_right_white.png'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { currentUserAtom } from '../atoms/currentUser'

const Sidebar = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)

  const handleSignOut = () => {
    fetch("http://localhost:3000/api/v1/auth/sign_out", {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if(res.ok){
        setCurrentUser(null)
        router.push("/login")
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="bg-emerald-600 p-2 w-96 h-screen">
      <div className="flex flex-col items-center justify-center">
        <Link href="/">
          <p className='font-notojp text-white text-base font-semibold text-center my-3'>つくろう、自分だけの温泉図鑑</p>
          <h2 className="font-notojp text-white text-4xl font-bold mb-4">MyOnsenBook</h2>
        </Link>
        {currentUser ? (
          <div className="font-notojp flex text-white border-gray-200 mt-10 mb-20 text-xl">
            <p>ようこそ {currentUser.name} さん</p>
            {/* ログアウトボタンなど */}
          </div>
        ) : (
          <div className="font-notojp flex text-white border-gray-200 mt-10 mb-20 text-xl">
            <div className="pr-4 border-r-2 border-white">ログイン</div>
            <div className="pl-4">新規登録</div>
          </div>
        )}
        <div>
          <p className="text-sm text-slate-50 font-semibold opacity-80 text-center">M E N U</p>
          <ul className="font-notojp text-white">
            <li className="mt-10 text-xl flex justify-between items-center">
              <Link href="/">
                <p className="pb-0.5 pr-5">トップページ</p>
              </Link>
              <Image src={sidebarIcon} alt="Right Arrow" width={9} height={9} />
            </li>
            <li className="mt-10 text-xl flex justify-between items-center">
              <Link href="/onsens">
                <p className="pb-0.5 pr-5">温泉データベース</p>
              </Link>
              <Image src={sidebarIcon} alt="Right Arrow" width={9} height={9} />
            </li>
            <li className="mt-10 text-xl flex justify-between items-center">
              <p className="pb-0.5 pr-5">場所から温泉を探す</p>
              <Image src={sidebarIcon} alt="Right Arrow" width={9} height={9} />
            </li>
            <li className="mt-10 text-xl flex justify-between items-center">
              <p className="pb-0.5 pr-5">泉質から温泉を探す</p>
              <Image src={sidebarIcon} alt="Right Arrow" width={9} height={9} />
            </li>
            <li className="mt-10 text-xl flex justify-between items-center">
              <p className="pb-0.5 pr-5"> 宿から温泉を探す</p>
              <Image src={sidebarIcon} alt="Right Arrow" width={9} height={9} />
            </li>

          </ul>
        </div>
        {currentUser ? (
          <Button
            className="mt-40 w-64 h-12 font-semibold border font-notojp border-white text-white hover:bg-white hover:text-black hover:border-theme"
            variant="bordered"
            radius="sm"
          >
            <button onClick={handleSignOut}>
              ログアウト
            </button>
          </Button>
        ) : (
          <Button
            className="mt-40 w-64 h-12 font-semibold border font-notojp border-white text-white hover:bg-white hover:text-black hover:border-theme"
            variant="bordered"
            radius="sm"
          >
            <Link href="/login">
              ゲストログイン
            </Link>
          </Button>
        )}
        <button
          className="mt-10 btn btn-wide btn-outline text-white hover:bg-white hover:text-black hover:border-emerald-200">
          お問い合わせ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
