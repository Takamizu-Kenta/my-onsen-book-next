import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import sidebarIcon from './icons/arrow_right_white.png'

const Sidebar = () => {
  return (
    <div className="bg-emerald-600 p-2 w-96 h-screen">
      <div className="flex flex-col items-center">
        <Link href="/">
          <h2 className="font-notojp text-white text-4xl mt-6 mb-4">MyOnsenBook</h2>
        </Link>
        <div className="font-notojp flex text-white border-gray-200 mt-10 mb-20 text-xl">
          <div className="pr-4 border-r-2 border-white">ログイン</div>
          <div className="pl-4">新規登録</div>
        </div>
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
        <button
          className="mt-40 btn btn-wide btn-outline text-white hover:bg-white hover:text-black hover:border-emerald-200">
          ゲストログイン
        </button>
        <button
          className="mt-10 btn btn-wide btn-outline text-white hover:bg-white hover:text-black hover:border-emerald-200">
          お問い合わせ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
