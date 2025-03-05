/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconSave, Text } from "@app/ui";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUploadFile } from "../../../../hooks/useUploadFile";
import { UploadProductImg } from "../../../../api/products/update-product-img";

export function EditProductImgModal({ productId, productImg }: { productId: string, productImg: string }) {
  const { mutateAsync } = useMutation({
    mutationFn: (formData: any) => UploadProductImg(productId, formData)
  })
  const { handleFileChange, newFile, onSaveClick } = useUploadFile(mutateAsync)
  const client = useQueryClient()

  useEffect(() => {
    if (newFile) {
      client.refetchQueries({ queryKey: ['get-product'] })
      client.refetchQueries({ queryKey: ['get-products'] })
      client.refetchQueries({ queryKey: ['get-products-rows'] })
      client.refetchQueries({ queryKey: ['get-products-row'] })
      document.getElementById('closeModal')?.click()
    }
  }, [newFile])

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div id="openModal" className="span"></div>
        </DialogTrigger>
        <DialogContent className=" !z-51 font-extrabold bg-dark text-white-dark w-full">
          <DialogClose id="closeModal" className="hidden" />
          <DialogHeader>
            <DialogTitle className="font-extrabold text-white text-2xl">Alterar imagem do produto</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="">
              <img className="rounded-xl" src={productImg} />
              <Text as="span">Imagem Atual</Text>
            </div>
            <input
              id="ctnFile"
              type="file"
              onChange={handleFileChange}
              className="text-white form-input mt-2 file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-black dark:file:bg-primary ltr:file:mr-5 rtl:file-ml-5 file:text-white"
            />
          </div>
          <DialogFooter>
            <Button className="btn-primary flex flex-row gap-2" onClick={() => onSaveClick()}><IconSave />Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}