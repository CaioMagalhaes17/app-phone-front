/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"

export function useUploadFile(mutateAsync: any) {
  const [file, setFile] = useState<File>()
  const [newFile, setNewFile] = useState<string>()

  async function onSaveClick() {
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

  return { handleFileChange, onSaveClick, newFile }

}