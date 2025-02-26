import { useEffect, useState } from "react"
import { StoreContacts } from "../../types/store-profile"
import { useQuery } from "@tanstack/react-query"
import { getStoreContacts } from "../../api/user/store/get-contacts"
import { formatStoreContacts } from "../../formaters/store-profile"

export function useGetStoreContacts(id?: string) {
  const [contacts, setContacts] = useState<StoreContacts[] | null>(null)

  const { data: contactsData, isLoading: isLoadingContacts } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: () => getStoreContacts(id)
  })

  useEffect(() => {
    if (!isLoadingContacts && contactsData) return setContacts(formatStoreContacts(contactsData))
  }, [contactsData, isLoadingContacts])

  return { isLoadingContacts, contacts }
}