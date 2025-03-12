import { Button, IconSave, IconTrash, IconX, Panel, Text } from "@app/ui";
import { useMutation } from "@tanstack/react-query";
import "react-image-lightbox/style.css";
import { EditSolicitation } from "../../../../api/repair/solicitation/edit-solicitation";
import { useEffect, useState } from "react";
import { useUploadFile } from "../../../../hooks/useUploadFile";
import { UploadSolicitationImg } from "../../../../api/repair/solicitation/upload-solicitation-imgs";
import Swal from "sweetalert2";

export function EditSolicitationImages({ images, setEditMode, solicitationId }: { solicitationId: string, setEditMode: React.Dispatch<React.SetStateAction<boolean>>, images: string[] }) {
  const [items, setItems] = useState<string[]>(images);

  const addImages = (newItem: string) => {
    setItems((prevItems: string[]) => [...prevItems, newItem]);
  };

  const removeImage = (index: number) => {
    Swal.fire({
      titleText: 'Excluir Imagem?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-green btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
      }
    })
  };

  const { mutateAsync: uploadImg } = useMutation({
    mutationFn: UploadSolicitationImg
  })

  const { handleFileChange, newFile, onSaveClick } = useUploadFile(uploadImg)

  useEffect(() => {
    if (newFile) {
      addImages(newFile)
    }
  }, [newFile])

  const { mutateAsync: editSolicitation } = useMutation({
    mutationFn: (data: any) => EditSolicitation(data, solicitationId)
  })

  async function handleSave() {
    await editSolicitation()
  }

  return (
    <>
      <Panel className="mt-10 font-extrabold ">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <Text className="text-dark dark:text-white text-2xl" as="h1">Imagens do Celular:</Text>
            <div className="ml-auto"></div>
            <Button onClick={() => setEditMode(false)} className="btn-danger mr-5"><IconX className="mr-2" />Cancelar</Button>
            <Button onClick={() => handleSave()} className="btn-primary"><IconSave className="mr-2" />Salvar</Button>
          </div>
          <div className="flex flex-row gap-10 mt-5">
            {items.map((item, i) => (
              <div key={i} onClick={() => removeImage(i)} className="relative group w-full">
                <img src={item} className="w-[300px] h-[200px] cursor-pointer" />
                <div className="w-[300px] h-[200px] rounded-3xl absolute inset-0 bg-dark bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-3xl font-bold flex flex-row gap-2 items-center"><IconTrash /> Excluir</span>
                </div>
              </div>
            ))}
            {items.length < 4 && (
              <Button className="btn-primary">Adicionar Imagem</Button>
            )}
          </div>
        </div>
      </Panel>
    </>
  )
}