import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconChat, IconSend, Text } from "@app/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { PostFeedback } from "../../api/feedback/create-feedback";
import useStore from "../../state";

export function CreateFeedback({ storeName, storeId }: { storeId: string, storeName: string }) {

  const { mutateAsync } = useMutation({
    mutationFn: () => PostFeedback({ description: details, rating }, storeId),
    mutationKey: ['create-feedback']
  })
  const [rating, setRating] = useState<number>(0)
  const [details, setDetails] = useState('')
  const totalStars = 5

  async function onSaveClick() {
    await mutateAsync()
    client.refetchQueries({ queryKey: ['get-feedbacks'] })
    document.getElementById('closeModal')?.click()
  }

  const client = useQueryClient()
  const { isMobile } = useStore()
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button id="openModal" className={`${isMobile ? '!py-1 !px-1.5 !text-[11px]' : 'mr-5'} btn-primary flex flex-row gap-2`}><IconChat /> Avaliar Loja </Button>
        </DialogTrigger>
        <DialogContent className=" !z-51 font-extrabold bg-dark text-white-dark w-full">
          <DialogClose id="closeModal" className="hidden" />
          <DialogHeader>
            <DialogTitle className="font-extrabold text-white text-2xl">Avaliar loja {storeName}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
            <div>
              <Text as="span">Avaliação:</Text>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="placeholder:text-white-dark w-full rounded-md border text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
            </div>
            <div className="flex flex-row mb-2 mt-10">
              {[...Array(totalStars)].map((_, index) => (
                <Star
                  onClick={() => setRating(index + 1)}
                  key={index}
                  className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                  size={32}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button className="btn-primary flex flex-row gap-2" onClick={() => onSaveClick()}><IconSend />Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}