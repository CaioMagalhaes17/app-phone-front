import { ClientProfileType } from "../types/client-profile"

export function formatClientProfile(clientProfile: {
  props: ClientProfileType,
  _id: string
}): ClientProfileType {
  return {
    id: clientProfile._id,
    createdAt: clientProfile.props.createdAt,
    updatedAt: clientProfile.props.updatedAt,
    email: clientProfile.props.email,
    name: clientProfile.props.name,
    telNum: clientProfile.props.telNum,
    userId: clientProfile.props.userId,
  }
}