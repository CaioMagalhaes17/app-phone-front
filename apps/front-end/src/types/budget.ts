import { Solicitation, SolicitationsFromApi } from "./solicitation"
import { StoreProfileFromApi, StoreProfileType } from "./store-profile"

export type BudgetFormProps = {
  startValue: string
  endValue: string
  solicitationId: string
  details?: string
}

export type BudgetFromApiType = {
  props: {
    startValue: string
    endValue: string
    details: string
    solicitation: SolicitationsFromApi
    storeProfile: StoreProfileFromApi
    updatedAt: string,
    createdAt: string,
  }
  _id: string
}

export type BudgetType = {
  id: string,
  startValue: string
  endValue: string
  details: string
  solicitation: Solicitation
  storeProfile: StoreProfileType
  updatedAt: string,
  createdAt: string,
}