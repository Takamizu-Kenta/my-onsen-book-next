import { Onsen } from './onsen'

export type Facility = {
  id: number
  facility_name: string
  facility_type: string
  post_code: string
  city: string
  facility_link: string
  pref: string
  address: string
  description: string
  onsen_name: string
}

export type FacilityResponse = {
  facility: Facility
  related_onsen?: Onsen
}
