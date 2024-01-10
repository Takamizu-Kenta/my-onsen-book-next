"use client"

import { useEffect } from "react"
import axios from "axios"
import { Input } from "@nextui-org/react"
import PrefectureSelect from "../selects/PrefectureSelect"
import { Prefecture } from "@/app/src/types/prefecture"
import { onsensAtomFamily } from "@/app/atoms/onsens"
import { useSetRecoilState } from "recoil"
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Onsen } from "@/app/src/types/onsen"

interface Props {
  prefectures: Prefecture[]
  url: string
}

export default function OnsenSearchForm({ prefectures, url }: Props) {
  const setOnsens = useSetRecoilState(onsensAtomFamily(url))
  const methods = useForm({
    defaultValues: {
      name: "",
      prefecture_id: "",
    },
  })

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const data = await axios.post<Onsen[]>(url, {
        body: methods.getValues(),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }, { withCredentials: true }).then(res => res.data)
      console.log(JSON.stringify(methods.getValues()))
      setOnsens(data)
    }, 500)

    return () => clearTimeout(debounce)
  }, [methods.watch("name"), methods.watch("prefecture_id")])

  return (
    <>
      <Input
        classNames={{
          base: "h-12 mb-3",
          mainWrapper: "h-full w-96",
          input: "text-md",
          inputWrapper: "h-full w-full font-normal text-default-500 bg-default-300/20",
        }}
        placeholder="温泉名を入力してください"
        size="sm"
        // startContent={<SearchIcon size={18} />}
        type="search"
        {...methods.register("name")}
      />
      <Controller
        name="prefecture_id"
        control={methods.control}
        render={({ field }) => (
          <PrefectureSelect
            {...field}
            isRequired={true}
            label="都道府県"
            placeholder="都道府県を選択してください"
            prefectures={prefectures}
            variant="bordered"
            className="w-full"
          />
        )}
      />
    </>
  )
}
