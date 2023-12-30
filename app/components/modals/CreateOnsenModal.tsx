import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Prefecture } from '../../src/types/prefecture'
import PrefectureSelect from '../selects/PrefectureSelect'
import { ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Textarea } from "@nextui-org/react"

interface CreateOnsenModalProps {
  onClose: () => void
}

interface OnsenData {
  onsen_name: string
  onsen_name_kana: string
  pref: string
  description: string
  quality: string
  effects: string
}

const CreateOnsenModal: React.FC<CreateOnsenModalProps> = ({ onClose }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])

  const fetchPrefectures = async () => {
    try {
      const res = await axios.get<Prefecture[]>('http://localhost:3000/api/v1/prefectures')

      setPrefectures(res.data)
    } catch (err) {
      console.log(err)
      alert('都道府県データの取得に失敗しました。')
    }
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
      description: ''
    }
  })

  const onSubmit = async (data :OnsenData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/onsens', { onsen: data });
      console.log(response.data)
      onClose()
    } catch (error) {
      console.error(error)
      alert('リクエストに失敗しました。データの重複等がないかを確認してください。')
    }
  }

  useEffect(() => {
    fetchPrefectures()
  }
  , [])

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
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
              className="w-full"
              {...register("description", {
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
          <h4 className='font-notojp text-gray-600 font-semibold text-base mt-3'>温泉の画像を選択</h4>
          <div>
            <input
              type="file"
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
