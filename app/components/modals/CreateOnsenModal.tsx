import React, { useState } from 'react'
import axios from 'axios'
import { mutate } from 'swr'
import { useForm, Controller } from 'react-hook-form'
import { Prefecture } from '../../src/types/prefecture'
import PrefectureSelect from '../selects/PrefectureSelect'
import { ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Textarea } from "@nextui-org/react"

interface CreateOnsenModalProps {
  onClose: () => void
  prefectures: Prefecture[]
}

interface OnsenData {
  [key: string]: string | File
  onsen_name: string
  onsen_name_kana: string
  pref: string
  quality: string
  effects: string
  onsen_description: string
}

const CreateOnsenModal: React.FC<CreateOnsenModalProps> = ({ onClose, prefectures }) => {
  const [OnsenSelectedFile, setOnsenSelectedFile] = useState(null)

  const handleOnsenFileChange = (event: any) => {
    setOnsenSelectedFile(event.target.files[0])
  }

  const { register, handleSubmit, control, formState: { errors } } = useForm<OnsenData>({
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: {
      onsen_name: '',
      onsen_name_kana: '',
      pref: '',
      quality: '',
      effects: '',
      onsen_description: ''
    }
  })

  const onSubmit = async (data :OnsenData) => {
    const formData = new FormData()

    // React Hook Formから得られたフォームデータを追加
    Object.keys(data).forEach((key) => {
      formData.append(`onsen[${key}]`, data[key])
    })

    if (OnsenSelectedFile) {
      formData.append('onsen[onsen_image]', OnsenSelectedFile)
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/onsens', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)
      onClose()
      mutate('http://localhost:3000/api/v1/onsens/all')
    } catch (error) {
      console.error(error)
      alert('リクエストに失敗しました。データの重複等がないかを確認してください。')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate >
        <ModalHeader className="flex flex-col gap-1">温泉新規登録</ModalHeader>
        <ModalBody>
          <h4 className='font-notojp text-gray-600 font-semibold text-base'>温泉情報入力</h4>
          <div className='grid grid-cols-2 gap-x-3.5 gap-y-3.5'>
            <Input
              autoFocus
              isRequired
              label="温泉名"
              placeholder="草津温泉"
              variant="bordered"
              errorMessage={errors.onsen_name?.message}
              isInvalid={!!errors.onsen_name}
              className="w-full"
              {...register("onsen_name", {
                required: {
                  value: true,
                  message: "温泉名の入力は必須です。",
                }
              })}
            />
            <Input
              isRequired
              label="温泉名かな"
              placeholder="くさつおんせん"
              variant="bordered"
              errorMessage={errors.onsen_name_kana?.message}
              isInvalid={!!errors.onsen_name_kana}
              className="w-full"
              {...register("onsen_name_kana", {
                required: {
                  value: true,
                  message: "温泉名かなの入力は必須です。",
                },
                pattern: {
                  value: /^[ぁ-んー ]*$/,
                  message: "温泉名かなはひらがなで入力してください。",
                }
              })}
            />
            <Controller
              name="pref"
              control={control}
              rules={{ required: '都道府県の選択は必須です。' }}
              render={({ field }) => (
                <PrefectureSelect
                  {...field}
                  isRequired={true}
                  label="都道府県"
                  placeholder="都道府県を選択してください"
                  prefectures={prefectures}
                  variant="bordered"
                  errorMessage={errors.pref?.message}
                  isInvalid={!!errors.pref}
                  className="w-full"
                />
              )}
            />
            <Input
              label="温泉地名"
              placeholder="草津温泉"
              variant="bordered"
              className="w-full"
            />
            <Input
              isRequired
              label="泉質"
              placeholder="塩化物温泉"
              variant="bordered"
              errorMessage={errors.quality?.message}
              isInvalid={!!errors.quality}
              className="w-full"
              {...register("quality", {
                required: {
                  value: true,
                  message: "泉質の入力は必須です。",
                }
              })}
            />
            <Input
              isRequired
              label="効能"
              placeholder="神経痛、筋肉痛、関節..."
              variant="bordered"
              errorMessage={errors.effects?.message}
              isInvalid={!!errors.effects}
              className="w-full"
              {...register("effects", {
                required: {
                  value: true,
                  message: "効能の入力は必須です。",
                }
              })}
            />
          </div>
          <div className='grid grid-cols-1 mt-3.5'>
            <Textarea
              isRequired
              label="温泉の説明"
              placeholder="日本三名泉の1つである草津温泉。 自然湧出量は日本一を誇り毎分32,300リットル以上、1日にドラム缶約23万本分もの温泉が湧き出しています"
              variant="bordered"
              errorMessage={errors.onsen_description?.message}
              isInvalid={!!errors.onsen_description}
              className="w-full"
              {...register("onsen_description", {
                required: {
                  value: true,
                  message: "説明の入力は必須です。",
                },
                minLength: {
                  value: 50,
                  message: "説明は50文字以上で入力してください。",
                },
              })}
            />
          </div>
          <h4 className='font-notojp text-gray-600 font-semibold text-base mt-3'>温泉の画像を選択<span className='text-red-600'> *</span></h4>
          <div>
            <input
              type="file"
              onChange={handleOnsenFileChange}
              className="file-input file-input-bordered file-input-ghost w-full text-gray-600 bg-white border-gray-600"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='flex flex-col w-full'>
            <Checkbox
              classNames={{
                label: "text-base font-notojp text-gray-600",
              }}
            >
              MyOnsenBookにも追加する
            </Checkbox>
            <Button
              className="w-full mt-5 bg-theme border-theme font-notojp font-medium text-white text-base"
              type="submit"
              variant="solid"
            >
              登録する
            </Button>
          </div>
        </ModalFooter>
      </form>
      <div>
    </div>
    </>
  )
}

export default CreateOnsenModal
