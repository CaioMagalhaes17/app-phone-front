
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconSave, Text } from "@app/ui";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUploadFile } from "../../../../../hooks/useUploadFile";
import { UploadSolicitationImg } from "../../../../../api/repair/solicitation/upload-solicitation-imgs";

export function SolicitationImgsModal({ items, setItems }: { items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>> }) {

  const addImages = (newItem: string) => {
    setItems((prevItems: string[]) => [...prevItems, newItem]);
  };

  const { mutateAsync } = useMutation({
    mutationFn: UploadSolicitationImg
  })
  const { handleFileChange, newFile, onSaveClick } = useUploadFile(mutateAsync)

  useEffect(() => {
    if (newFile) {
      addImages(newFile)
    }
  }, [newFile])

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div id="openModal" className="span"></div>
        </DialogTrigger>
        <DialogContent className="!z-51 font-extrabold bg-dark text-white-dark w-[900px] max-w-full">
          <DialogClose id="closeModal" className="hidden" />
          <DialogHeader>
            <DialogTitle className="font-extrabold text-white text-2xl">Adicionar imagens do aparelho (máximo 4 fotos)</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <Text as="span">{items.length > 0 ? 'Imagens atuais' : 'Escolha uma imagem e clique em Adicionar'}</Text>
            <div className="flex flex-row gap-5 w-full">
              {items.length > 0 && items.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className="max-w-[200px] max-h-[200px] object-contain"
                />
              ))}

            </div>
            <input
              id="ctnFile"
              type="file"
              onChange={handleFileChange}
              className="text-white form-input mt-2 file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-black dark:file:bg-primary ltr:file:mr-5 rtl:file-ml-5 file:text-white"
            />
          </div>
          <DialogFooter className="items-center">
            <Text as="span">Salve uma imagem por vez</Text>
            <Button disabled={items.length > 3} className="btn-primary flex flex-row gap-2" onClick={() => onSaveClick()}><IconSave />Salvar Imagem</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}