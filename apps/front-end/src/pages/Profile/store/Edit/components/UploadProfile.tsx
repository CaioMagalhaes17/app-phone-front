import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconSave, Text } from "@app/ui";
import { useEffect, useState } from "react";
import { UploadStoreProfileImg } from "../../../../../api/user/store/upload-store-profile-img";
import { useMutation } from "@tanstack/react-query";
import useStore from "../../../../../state";

export function UploadProfile() {
  const { storeInfos, setStoreInfos } = useStore()
  const [file, setFile] = useState<File>()
  const [newFile, setNewFile] = useState<string>()

  const { mutateAsync } = useMutation({
    mutationFn: UploadStoreProfileImg
  })

  async function onSaveClick() {
    console.log(file)
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await mutateAsync(formData)

      if (response?.data?.status === 'ok') {
        setNewFile(response?.data?.url)
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) return setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (newFile) {
      console.log(newFile)
      setStoreInfos({ ...storeInfos, profileImg: newFile })
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
            <DialogTitle className="font-extrabold text-white text-2xl">Alterar imagem de perfil</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="">
              <img className="rounded-xl" src={storeInfos.profileImg} />
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