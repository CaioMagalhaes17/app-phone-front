import { Button, IconSave, Input, Panel, Text } from "@app/ui";

export function BasicConfigs() {
  return (
    <>
      <div className="mt-10 w-[900px] ml-auto mr-auto">
        <Panel className="flex flex-col gap-5 font-extrabold">
          <div className="flex gap-2 items-center flex-row">
            <Text className="w-40 text-lg" as="span">Nome da loja:</Text>
            <Input />
          </div>
          <div className="flex gap-2 items-center flex-row">
            <Text className="w-40 text-lg" as="span">Login:</Text>
            <Input />
          </div>
          <div className="flex gap-2 items-center flex-row">
            <Text className="w-40 text-lg" as="span">Email:</Text>
            <Input />
          </div>
          <div className="border-b border-b-[#323b45]" />
          <Text className="text-white text-2xl" as="h1">Alterar Senha</Text>
          <div className="flex gap-2 items-center flex-row">
            <Text className="w-40 text-lg" as="span">Nova Senha:</Text>
            <Input type="text" value="12345678" />
          </div>
          <div className="flex gap-2 items-center flex-row">
            <Text className="w-40 text-lg" as="span">Confirmação:</Text>
            <Input type="text" value="12345678" />
          </div>
          <div className="ml-auto">
            <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
          </div>
        </Panel>
      </div>
    </>
  )
}