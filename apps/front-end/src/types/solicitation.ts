import { ClientProfileType } from "./client-profile"

export type SolicitationFormProps = {
  problemTopic: ProblemTopicType
  problemForm: BatteryFormType | DisplayFormType
  phoneForm: PhoneFormType
  deliveryPreference: string
  timePreference: string
  details: string
  createdAt?: string
  updatedAt?: string
  id?: string
}

export type PhoneFormType = {
  brand: PhoneBrandType
  model: string
  previousRepair: string
  originalHardware: string
  usageTime: string
}

export type BatteryFormType = {
  "battery-A": "battery-A-1" | "battery-A-2" | "battery-A-3" | "battery-A-4"
  "battery-B": "battery-B-1" | "battery-B-2" | "battery-B-3"
  "battery-C": "battery-C-1" | "battery-C-2" | "battery-C-3"
  "battery-D": "battery-D-1" | "battery-D-2" | "battery-D-3"
  "battery-E": "battery-E-1" | "battery-E-2" | "battery-E-3"
  "battery-F": "battery-F-1" | "battery-F-2" | "battery-F-3"
}

export type DisplayFormType = {
  "display-A": "display-A-1" | "display-A-2" | "display-A-3" | "display-A-4"
  "display-B": "display-B-1" | "display-B-2" | "display-B-3"
  "display-C": "display-C-1" | "display-C-2" | "display-C-3"
  "display-D": "display-D-1" | "display-D-2"
  "display-E": "display-E-1" | "display-E-2" | "display-E-3"
  "display-F": "display-F-1" | "display-F-2" | "display-F-3"
}

export type ProblemTopicType = "battery" | "display"

export type PhoneBrandType = 'samsung' | 'apple'

export type SolicitationsFromApi = {
  props: {
    createdAt: string,
    updatedAt: string,
    status: string,
    form: {
      props: SolicitationFormProps & { createdAt: string, updatedAt: string },
      _id: string
    }
    clientProfile: {
      props: ClientProfileType,
      _id: string
    },

  },
  _id: string
}

export type Solicitation = {
  id: string,
  createdAt: string,
  updatedAt: string,
  status: string,
  form: SolicitationFormProps,
  clientProfile: ClientProfileType,
}