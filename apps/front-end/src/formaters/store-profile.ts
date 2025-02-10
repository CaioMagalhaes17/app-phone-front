import { StoreProfileFromApi, StoreProfileType } from "../types/store-profile"

export function formatStoreProfile(storeProfile: StoreProfileFromApi): StoreProfileType {
  return {
    id: storeProfile._id,
    email: storeProfile.props.email,
    name: storeProfile.props.name,
    telNum: storeProfile.props.telNum,
    address: storeProfile.props.address,
    description: storeProfile.props.description,
    profileImg: storeProfile.props.profileImg,
    userId: storeProfile.props.userId,
    createdAt: storeProfile.props.createdAt,
    updatedAt: storeProfile.props.updatedAt,
  }
}