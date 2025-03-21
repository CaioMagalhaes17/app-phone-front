import { useEffect, useState } from "react"
import { StoreContacts } from "../../types/store-profile"
import { useQuery } from "@tanstack/react-query"
import { getStoreContacts } from "../../api/user/store/get-contacts"
import { formatStoreContact } from "../../formaters/store-profile"

export function useGetStoreContacts(id?: string) {
  const [contacts, setContacts] = useState<StoreContacts>()

  const { data: contactsData, isLoading: isLoadingContacts } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: () => getStoreContacts(id)
  })

  useEffect(() => {
    if (!isLoadingContacts && contactsData) {
      setContacts(formatStoreContact(contactsData))
    }
  }, [contactsData, isLoadingContacts])
  return { isLoadingContacts, contacts }
}