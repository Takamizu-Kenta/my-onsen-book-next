import React, { forwardRef } from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface Attributes {
  id: number
  str_key: string
  name: string
}

interface Prefecture {
  attributes: Attributes
}

interface PrefectureSelectProps {
  label: string
  placeholder: string;
  prefectures: Prefecture[]
  variant: 'flat' | 'bordered' | 'faded' | 'underlined' | undefined
  errorMessage?: string
  isInvalid?: boolean
  isRequired?: boolean
  className?: string
}

const PrefectureSelect = forwardRef<HTMLDivElement, PrefectureSelectProps>(
  ({ label, placeholder, prefectures, variant, className, isRequired, errorMessage, isInvalid, ...field }) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      selectionMode="single"
      variant={variant}
      className={className}
      isRequired={isRequired}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      {...field}
    >
      {prefectures.map(prefecture => (
        <SelectItem key={prefecture.attributes.id} value={prefecture.attributes.str_key} textValue={prefecture.attributes.name}>
          {prefecture.attributes.name}
        </SelectItem>
      ))}
    </Select>
  )
})

PrefectureSelect.displayName = 'PrefectureSelect'
export default PrefectureSelect
