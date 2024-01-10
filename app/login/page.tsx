"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input, Button } from '@nextui-org/react'
import { EyeFilledIcon } from '../components/icons/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../components/icons/EyeSlashFilledIcon'

import axios from 'axios'
import { currentUserAtom } from '../atoms/currentUser'
import { useRecoilState } from 'recoil'

const SignInPage = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)
  const { register, handleSubmit, formState: { errors } } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onSubmit'
  })

  const sendSignInRequest = async (params :any) => {
    const res = await axios.post("http://localhost:3000/api/v1/auth/sign_in", params, { withCredentials: true })

    if (res.status === 200) {
      const data = res.data.data
      setCurrentUser(data)
      console.log(data)
      router.push('/')
    } else {
      alert('ログインに失敗しました。')
    }
  }

  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className='flex h-screen justify-center items-center flex-col'>
      <h1 className='text-4xl font-bold font-notojp text-theme my-8'>MyOnsenBook</h1>
      <div className='w-1/3 bg-white text-center font-notojp text-gray-600 rounded-xl shadow-none py-8 px-5'>
        <h1 className='text-2xl font-semibold mb-6'>ゲストログイン</h1>
        <form onSubmit={handleSubmit(sendSignInRequest)}>
          <div className='flex flex-col items-center'>
            <label htmlFor="email" className='font-semibold mb-2'>メールアドレス</label>
            <Input
              autoFocus
              id="email"
              type="email"
              label="メールアドレス"
              variant="bordered"
              placeholder="sample@mail.com"
              errorMessage={errors.email ? String(errors.email.message) : ""}
              isInvalid={!!errors.email}
              className="max-w-sm mb-5"
              {...register("email", {
                required: {
                  value: true,
                  message: "メールアドレスが入力されていません。",
                }
              })}
            />

            <label htmlFor="password" className='font-semibold mb-2'>パスワード</label>
            <Input
              id="password"
              label="パスワード"
              variant="bordered"
              placeholder="パスワードを入力してください"
              errorMessage={errors.password ? String(errors.password.message) : ""}
              isInvalid={!!errors.password}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-sm"
              {...register("password", {
                required: {
                  value: true,
                  message: "パスワード入力されていません。",
                }
              })}
            />
          </div>
          <Button
            type="submit"
            className='mt-5 w-40 mb-5 bg-theme border-theme font-notojp font-semibold text-white text-base'
          >
            ログイン
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignInPage
