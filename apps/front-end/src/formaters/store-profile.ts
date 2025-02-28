import { StoreContacts, StoreContactsFromApi, StoreProfileFromApi, StoreProfileType, StoreSocialsFromApi, StoreSocialsType } from "../types/store-profile"

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
    rating: storeProfile.props.rating,
  }
}

export function formatStoreContact(storeContact: StoreContactsFromApi): StoreContacts {
  return {
    id: storeContact._id,
    email: storeContact.props.email,
    telNum: storeContact.props.telNum,
    description: storeContact.props.description,
    storeProfileId: storeContact.props.storeProfileId,
    main: storeContact.props.main,
    createdAt: storeContact.props.createdAt,
    updatedAt: storeContact.props.updatedAt
  }
}

export function formatStoreContacts(storeContacts: StoreContactsFromApi[]): StoreContacts[] {
  return storeContacts.map((storeContact) => formatStoreContact(storeContact));
}

export function formatStoreSocials(socials: StoreSocialsFromApi[]): StoreSocialsType[] {
  return socials.map((social) => formatStoreSocial(social));
}

export function formatStoreSocial(socials: StoreSocialsFromApi): StoreSocialsType {
  return {
    id: socials._id,
    link: socials.props.link,
    type: socials.props.type,
    createdAt: socials.props.createdAt,
    storeProfileId: socials.props.storeProfileId
  }
}

export function formatSocialType(socialType: string) {
  if (socialType === 'facebook') return 'Facebook'
  if (socialType === 'instagram') return 'Instagram'
  if (socialType === 'whatsapp') return 'WhatsApp'
}

export function formatSocialColor(socialType: string) {
  if (socialType === 'facebook') return 'blue'
  if (socialType === 'instagram') return ' text-white'
  if (socialType === 'whatsapp') return 'green'
}