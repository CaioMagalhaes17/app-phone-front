import { Button, IconSave, Input, Panel, Text, IconPencil } from "@app/ui";
import { StoreContact } from "./components/Contact";
import { StoreSocials } from "./components/Socials";
import useStore from "../../../../state";

export function EditStoreProfile() {
  const { storeInfos } = useStore()
  return (
    <>
      <ul className="flex font-semibold p-2 border-b border-[#191e3a] flex-row mb-5 whitespace-nowrap overflow-y-auto">
        <li className="inline-block mr-5">
          <Button className="btn-outline-primary">Preferências de Notificações</Button>
        </li>
        <li className="inline-block ">
          <Button className="btn-outline-primary">Alterar login/senha</Button>
        </li>
      </ul>
      <div className=" flex justify-center ">
        <Panel className="!shadow-lg !shadow-black font-extrabold max-w-[1200px] w-full">
          <div className="flex flex-row justify-center items-center">
            <Text className="text-3xl text-white" as="h1">Editar perfil</Text>
            <div className="mr-auto" />
            <Button className="btn-primary flex flex-row gap-2"><IconSave />Salvar</Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          <div className="flex flex-col mt-10">
            <div className="flex flex-row gap-5">
              <div>
                <img width={'500px'} height={'300px'} src={storeInfos.profileImg} className="rounded-3xl" />
              </div>
              <div className="w-full text-lg">
                <div className="w-full  gap-5 flex-row flex">
                  <div className="w-full">
                    <Text as="span">Nome</Text>
                    <Input type="text" placeholder="Nome" />
                  </div>
                  <div className="w-full">
                    <Text as="span">Horário de funcionamento</Text>
                    <div className="flex flex-row items-center gap-5">
                      <Input placeholder="dasdas" />
                      até
                      <Input placeholder="dasdas" />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex flex-col">
                  <Text className="text-center" as="span">Localização</Text>
                  <Input type="text" />
                  <Button className="ml-auto btn-outline-primary flex flex-row gap-2 mt-2"><IconPencil />Alterar Localização</Button>
                </div>
              </div>

            </div>

            <div className="border-b border-b-[#323b45] mt-10 mb-5" />
            <StoreContact />
            <div className="border-b border-b-[#323b45] mt-10 mb-5" />
            <StoreSocials />
          </div>
        </Panel >
      </div >
    </>
  )
}