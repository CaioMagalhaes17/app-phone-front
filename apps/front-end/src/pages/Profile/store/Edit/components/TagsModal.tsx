import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, HSeparator, IconSave } from "@app/ui";
import { storeTags } from "../../../../../constants/store-tags";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateStore } from "../../../../../api/user/store/update-profile";
import useStore from "../../../../../state";


export function TagsModal({ tags }: { tags: string[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);
  const { storeInfos, setStoreInfos } = useStore()
  const handleTagClick = (tagId: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tagId)) {
        return prevTags.filter((id) => id !== tagId);
      } else if (prevTags.length < 5) {
        return [...prevTags, tagId];
      }
      return prevTags;
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateStore,
  })

  async function handleSave() {
    await mutateAsync({ tags: selectedTags })
    setStoreInfos({
      ...storeInfos,
      tags: selectedTags
    })
    document.getElementById('closeTagModal')?.click()
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div id="openTagModal" className="span"></div>
        </DialogTrigger>
        <DialogContent className=" !z-51 font-extrabold bg-dark text-white-dark w-full w-[900px] max-w-none">
          <DialogClose id="closeTagModal" className="hidden" />
          <DialogHeader>
            <DialogTitle className="font-extrabold text-white text-2xl">Adicionar Caracteristicas</DialogTitle>
          </DialogHeader>
          <HSeparator className="mt-2 mb-2" />
          <div className="flex text-sm flex-row flex-wrap gap-2 text-white">
            {storeTags.map((tag) => {
              return (
                <button onClick={() => handleTagClick(tag.id)} className={`${selectedTags.includes(tag.id) ? 'bg-[#c4c4c4] text-dark' : ''} border rounded-xl p-1`}>{tag.name}</button>
              )
            })}
          </div>
          <DialogFooter>
            <Button onClick={() => handleSave()} className="btn-primary flex flex-row"><IconSave className="mr-2" />Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}