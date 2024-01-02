import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface Onsen {
  id: number
  onsen_name: string
}
interface OnsenSelectProps {
  label: string
  placeholder: string
  onsens: Onsen[]
  variant: 'flat' | 'bordered' | 'faded' | 'underlined' | undefined
  errorMessage?: string
  isInvalid?: boolean
  isRequired?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const OnsenSelect: React.FC<OnsenSelectProps> = ({ label, placeholder, onsens, variant, className, errorMessage, isInvalid,isRequired, ...field }) => {
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
      {onsens.map(onsen => (
        <SelectItem key={onsen.id} value={onsen.id} textValue={onsen.onsen_name}>
          {onsen.onsen_name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default OnsenSelect
