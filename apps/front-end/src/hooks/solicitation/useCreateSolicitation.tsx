import { useMutation } from "@tanstack/react-query";
import { CreateSolicitation } from "../../api/repair/solicitation/create-solicitation";

export function useCreateSolicitation() {
  const { mutateAsync } = useMutation({
    mutationFn: CreateSolicitation
  })

  return { mutateAsync }
}