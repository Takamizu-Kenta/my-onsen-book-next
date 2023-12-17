import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface OnsenSelectProps {
  label: string
  placeholder: string
  onsens: Array<{ id: number; quality: string; pref: string }>
  displayValue: (onsen: { id: number; quality: string; pref: string }) => React.ReactNode
  displayText: (onsen: { id: number; quality: string; pref: string }) => string
  className?: string
}

const OnsenSelect: React.FC<OnsenSelectProps> = ({ label, placeholder, onsens, displayValue, displayText, className }) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      selectionMode="multiple"
      className={className}
    >
      {onsens.map(onsen => (
        <SelectItem key={onsen.id} value={onsen.id} textValue={displayText(onsen)}>
          {displayValue(onsen)}
        </SelectItem>
      ))}
    </Select>
  );
};

export default OnsenSelect;
