import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface Attributes {
  id: number
  str_key: string
  name: string
}

interface FacilityType {
  attributes: Attributes
}

interface FacilityTypeSelectProps {
  label: string
  placeholder: string;
  facilityTypes: FacilityType[]
  variant: 'flat' | 'bordered' | 'faded' | 'underlined' | undefined
  errorMessage?: string
  isInvalid?: boolean
  isRequired?: boolean
  className?: string
}

const FacilityTypeSelect: React.FC<FacilityTypeSelectProps> = ({ label, placeholder, facilityTypes, variant, className, isRequired, errorMessage, isInvalid, ...field }) => {
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
      {facilityTypes.map(facilityType => (
        <SelectItem key={facilityType.attributes.id} value={facilityType.attributes.str_key} textValue={facilityType.attributes.name}>
          {facilityType.attributes.name}
        </SelectItem>
      ))}
    </Select>
  )
}

export default FacilityTypeSelect
