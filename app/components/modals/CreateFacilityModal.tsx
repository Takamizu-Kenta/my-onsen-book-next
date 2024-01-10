import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { Prefecture } from '../../src/types/prefecture'
import { Onsen } from '../../src/types/onsen'
import { FacilityType } from '../../src/types/facilityType'
import PrefectureSelect from '../selects/PrefectureSelect'
import OnsenSelect from '../selects/OnsenSelect'
import FacilityTypeSelect from '../selects/FacilityTypeSelect'
import { ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Textarea, Select } from "@nextui-org/react"
import { toast } from 'react-toastify'

interface CreateFacilityModalProps {
  onClose: () => void
  prefectures: Prefecture[]
  onsens: Onsen[]
  facilityTypes: FacilityType[]
}

interface OnsenData {
  [key: string]: string | File
  onsen_name: string
  onsen_name_kana: string
  pref: string
  quality: string
  effects: string
  onsen_description: string
  onsen_image: string
  add_my_onsen_book: string
}

interface FacilityData {
  [key: string]: string | File | number
  onsen_id: number
  facility_name: string
  facility_name_kana: string
  facility_type_id: number
  pref: string
  address: string
  facility_description: string
  facility_link: string
  facility_image: string
}

interface CombinedFormData extends OnsenData, FacilityData { }

const CreateFacilityModal: React.FC<CreateFacilityModalProps> = ({ onClose, prefectures, onsens, facilityTypes }) => {
  const [OnsenSelectedFile, setOnsenSelectedFile] = useState(null)
  const [FacilitySelectedFile, setFacilitySelectedFile] = useState(null)

  const handleOnsenFileChange = (event: any) => {
    setOnsenSelectedFile(event.target.files[0])
  }

  const handleFacilityFileChange = (event: any) => {
    setFacilitySelectedFile(event.target.files[0])
  }

  const { watch, register, handleSubmit, control, setValue, formState: { errors } } = useForm<CombinedFormData>({
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: {
      onsen_name: '',
      onsen_name_kana: '',
      pref: '',
      quality: '',
      effects: '',
      onsen_description: '',
      add_my_onsen_book: "false",
    }
  })

  const onSubmit = async (data: CombinedFormData) => {
    const formData = new FormData()

    // React Hook Formから得られたフォームデータを追加
    Object.keys(data).forEach((key) => {
      formData.append(`facility[${key}]`, data[key])
    })

    formData.append('facility[onsen_id]', data.onsen_id.toString())

    if (FacilitySelectedFile) {
      formData.append('facility[facility_image]', FacilitySelectedFile)
    }

    if (!isOnsenSelected) {
      Object.keys(data).forEach((key) => {
        formData.append(`onsen[${key}]`, data[key])
      })

      if (OnsenSelectedFile) {
        formData.append('onsen[onsen_image]', OnsenSelectedFile)
      }
    }

    let onsenId = data.onsen_id

    const onsenData: OnsenData = {
      onsen_name: data.onsen_name,
      onsen_name_kana: data.onsen_name_kana,
      pref: data.pref,
      quality: data.quality,
      effects: data.effects,
      onsen_description: data.onsen_description,
      onsen_image: data.onsen_image,
      add_my_onsen_book: "false"
    }

    const facilityData: FacilityData = {
      facility_name: data.facility_name,
      facility_name_kana: data.facility_name_kana,
      facility_type_id: data.facility_type_id,
      onsen_id: onsenId,
      pref: data.pref,
      address: data.address,
      facility_description: data.facility_description,
      facility_link: data.facility_link,
      facility_image: data.facility_image
    }

    if (!isOnsenSelected) {
      try {
        await axios.post('http://localhost:3000/api/v1/facility_registrations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })
        onClose()
        toast.success('登録が完了しました。')
      } catch (error) {
        console.error(error)
        alert('温泉･施設登録リクエストに失敗しました。データの重複等がないかを確認してください。')
      }
    } else {
      try {
        console.table(facilityData)
        const facilityResponse = await axios.post('http://localhost:3000/api/v1/facilities', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(facilityResponse.data)
        onClose()
        toast.success('登録が完了しました。')
      } catch (error) {
        console.error(error)
        alert('施設登録リクエストに失敗しました。データの重複等がないかを確認してください。')
      }
    }
    mutate('http://localhost:3000/api/v1/facilities')
  }

  const [isOnsenSelected, setIsOnsenSelected] = useState(true)
  const handleOnsenSelectChange = (event: any) => {
    setIsOnsenSelected(event.target.value !== "0")
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate >
        <ModalHeader className="flex flex-col gap-1">施設新規登録</ModalHeader>
        <ModalBody>
          <h4 className='font-notojp text-gray-600 font-semibold text-base'>施設情報入力</h4>
          <div className='grid grid-cols-2 gap-x-3.5 gap-y-3.5'>
            <Input
              autoFocus
              isRequired
              label="施設名"
              placeholder="積善館"
              variant="bordered"
              errorMessage={errors.facility_name?.message}
              isInvalid={!!errors.facility_name}
              className="w-full"
              {...register("facility_name", {
                required: {
                  value: true,
                  message: "施設名の入力は必須です。",
                }
              })}
            />
            <Input
              isRequired
              label="施設名かな"
              placeholder="せきぜんかん"
              variant="bordered"
              errorMessage={errors.facility_name_kana?.message}
              isInvalid={!!errors.facility_name_kana}
              className="w-full"
              {...register("facility_name_kana", {
                required: {
                  value: true,
                  message: "施設名かなの入力は必須です。",
                },
                pattern: {
                  value: /^[ぁ-んー ]*$/,
                  message: "施設名かなはひらがなで入力してください。",
                }
              })}
            />
            <Controller
              name="facility_type_id"
              control={control}
              rules={{ required: '施設タイプの選択は必須です。' }}
              render={({ field }) => (
                <FacilityTypeSelect
                  {...field}
                  isRequired={true}
                  label="施設タイプ"
                  placeholder="施設タイプを選択してください"
                  facilityTypes={facilityTypes}
                  variant="bordered"
                  errorMessage={errors.facility_type_id?.message}
                  isInvalid={!!errors.facility_type_id}
                  className="w-full"
                />
              )}
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
              isRequired
              label="所在地"
              placeholder="埼玉県新座市新堀"
              variant="bordered"
              errorMessage={errors.address?.message}
              isInvalid={!!errors.address}
              className="w-full"
              {...register("address", {
                required: {
                  value: true,
                  message: "所在地の入力は必須です。",
                }
              })}
            />
            <Controller
              name="onsen_id"
              control={control}
              rules={{ required: '温泉の選択は必須です。' }}
              render={({ field }) => (
                <OnsenSelect
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOnsenSelectChange(e)
                  }}
                  isRequired={true}
                  label="温泉"
                  placeholder="温泉を選択してください"
                  onsens={[...onsens, { id: 0, onsen_name: "該当なし" }]}
                  variant="bordered"
                  errorMessage={errors.onsen_id?.message}
                  isInvalid={!!errors.onsen_id}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className='grid grid-cols-1'>
            <Input
              isRequired
              label="施設URL"
              placeholder="https://www.sekizenkan.co.jp/"
              variant="bordered"
              errorMessage={errors.facility_link?.message}
              isInvalid={!!errors.facility_link}
              className="w-full"
              {...register("facility_link", {
                required: {
                  value: true,
                  message: "施設URLの入力は必須です。",
                },
                pattern: {
                  value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                  message: "施設URLは正しい形式で入力してください。",
                }
              })}
            />
            <Textarea
              isRequired
              label="施設の説明"
              placeholder="元禄４年に建てられ日本最古の湯宿建築として今も昔も変わらず営業している「積膳館 本館」。湯治場ならではの昔と変わらぬ人のあたたかさと共に体感できる"
              variant="bordered"
              errorMessage={errors.facility_description?.message}
              isInvalid={!!errors.facility_description}
              className="w-full mt-3.5"
              {...register("facility_description", {
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
            <h4 className='font-notojp text-gray-600 font-semibold text-base my-3'>施設の画像を選択<span className='text-red-600'> *</span></h4>
            <div>
              <input
                type="file"
                onChange={handleFacilityFileChange}
                className="file-input file-input-bordered file-input-ghost w-full text-gray-600 bg-white border-gray-600"
              />
            </div>
          </div>
          {!isOnsenSelected && (
            <div className='grid grid-cols-1 mt-3.5'>
              <h4 className='font-notojp text-gray-600 font-semibold text-base mb-3.5'>温泉情報入力</h4>
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
              <h4 className='font-notojp text-gray-600 font-semibold text-base my-3'>温泉の画像を選択<span className='text-red-600'> *</span></h4>
              <div>
                <input
                  type="file"
                  onChange={handleOnsenFileChange}
                  className="file-input file-input-bordered file-input-ghost w-full text-gray-600 bg-white border-gray-600"
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <div className='flex flex-col w-full'>
            <Checkbox
              classNames={{
                label: "text-base font-notojp text-gray-600",
              }}
              {...register("add_my_onsen_book")}
              onValueChange={(value) => {
                setValue("add_my_onsen_book", value.toString())
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

export default CreateFacilityModal
