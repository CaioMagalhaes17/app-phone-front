import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconSave } from "@app/ui";

function onSaveClick() {
  console.log('niggerNIGGERSNIGGERSNIGGERS')
}
export function UploadProfile() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div id="openModal" className="span"></div>
        </DialogTrigger>
        <DialogContent className=" !z-51 font-extrabold bg-dark text-white-dark w-full">
          <DialogClose id="closeModal" className="hidden" />
          <DialogHeader>
            <DialogTitle className="font-extrabold text-white text-2xl">Fazer upload de foto</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">


          </div>
          <DialogFooter>
            <Button className="btn-primary flex flex-row gap-2" onClick={() => onSaveClick()}><IconSave />Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}