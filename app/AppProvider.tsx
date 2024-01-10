"use client"

import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "./atoms/currentUser";

export default function AppProvider({ children }: {children: React.ReactNode}) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)

  useEffect(() => {
    const getUserData = () => {
      axios.get("http://localhost:3000/api/v1/current/user", { withCredentials: true })
        .then((response) => {
          const { data, status } = response
          console.log(data)
          setCurrentUser(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getUserData()
  }, [setCurrentUser])

  return(
    <>
      <NextUIProvider navigate={(path) => router.push(path)}>
        {children}
      </NextUIProvider>
    </>
  )
}
