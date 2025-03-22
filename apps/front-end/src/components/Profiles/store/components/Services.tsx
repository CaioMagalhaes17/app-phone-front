import { Button, HSeparator, IconSmartphone, Text } from "@app/ui";

export function StoreProfileServices({ storeProfileImg }: { storeProfileImg: string }) {
  return (
    <>

      <div className="flex items-center font-bold justify-center mt-[80px] flex flex-col">
        <div className="w-[1242px]">
          <Text className="text-3xl  text-black dark:text-white flex flex-row gap-5 items-center" as="h1"><IconSmartphone />Serviços</Text>
          <HSeparator className="w-full mb-5 mt-2" />
          <div className="flex flex-row gap-10 mb-5">
            <div className="flex flex-col max-w-[270px]">
              <img width={'350px'} height={'230px'} src={storeProfileImg} className="rounded-3xl" />
              <Text className="mt-2 font-bold text-dark dark:text-white" as="span">Troca de baterias</Text>
              <Button className="btn-outline-primary mt-5">Solicitar Serviço</Button>
            </div>
            <div className="flex flex-col max-w-[270px]">
              <img width={'350px'} height={'230px'} src={storeProfileImg} className="rounded-3xl" />
              <Text className="mt-2 font-bold text-dark dark:text-white" as="span">Conserto de telas</Text>
              <Button className="btn-outline-primary mt-5">Solicitar Serviço</Button>
            </div>
            <div className="flex flex-col max-w-[270px]">
              <img width={'350px'} height={'230px'} src={storeProfileImg} className="rounded-3xl" />
              <Text className="mt-2 font-bold text-dark dark:text-white" as="span">Troca de baterias</Text>
              <Button className="btn-outline-primary mt-5">Solicitar Serviço</Button>
            </div>
            <div className="flex flex-col max-w-[270px]">
              <img width={'350px'} height={'230px'} src={storeProfileImg} className="rounded-3xl" />
              <Text className="mt-2 font-bold text-dark dark:text-white" as="span">Troca de baterias</Text>
              <Button className="btn-outline-primary mt-5">Solicitar Serviço</Button>
            </div>
          </div>
          <Text className="mt-5 text-dark dark:text-white-dark font-bold text-lg" as="span">Ver Mais</Text>
        </div>
      </div>
    </>
  )
}