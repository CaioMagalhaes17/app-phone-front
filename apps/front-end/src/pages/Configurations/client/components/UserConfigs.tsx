import { Button, IconSave, Input, Panel } from "@app/ui";

export function BasicConfigs() {
  return (
    <>
      <div className="mt-10 w-[900px] ml-auto mr-auto">
        <Panel className="flex flex-col gap-5 font-extrabold">
          <div className="flex gap-2 items-center flex-row">
            Nome:
            <Input />
          </div>
          <div className="flex gap-2 flex-row items-center ">
            Email:
            <Input />
          </div>
          <div className="flex gap-2 flex-row items-center ">
            Telefone:
            <Input />
          </div>
          <div className="ml-auto">
            <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
          </div>
        </Panel>
      </div>
    </>
  )
}