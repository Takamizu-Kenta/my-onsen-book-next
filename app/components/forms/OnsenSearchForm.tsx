"use client"

import { useEffect } from "react"
import axios from "axios"
import { Input } from "@nextui-org/react"
import PrefectureSelect from "../selects/PrefectureSelect"
import { Prefecture } from "@/app/src/types/prefecture"
import { onsensAtomFamily } from "@/app/atoms/onsens"
import { useSetRecoilState } from "recoil"
import { Controller, useForm } from "react-hook-form"
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

  const watchedName = methods.watch("name")
  const watchedPrefectureId = methods.watch("prefecture_id")

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
  }, [watchedName, watchedPrefectureId, methods, setOnsens, url])

  return (
    <>
      <Input
        classNames={{
          base: "h-14 mb-3 w-96 mr-3",
          mainWrapper: "h-full w-96",
          input: "text-md",
          inputWrapper: "h-full font-normal text-default-500",
        }}
        placeholder="温泉名を入力してください"
        size="sm"
        // startContent={<SearchIcon size={18} />}
        type="search"
        variant="underlined"
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
            variant="underlined"
            className="w-96 items-start"
          />
        )}
      />
    </>
  )
}
