import { Button, HSeparator, IconSmartphone, Text } from "@app/ui";

export function StoreServicesGrid({ services, title, onServiceClick }: {
  services: {
    serviceImg: string;
    serviceName: string;
    topic: string
  }[],
  title: string
  onServiceClick: (topic: string) => void
}) {
  return (
    <>

      <div className="flex items-center font-bold justify-center flex flex-col">
        <div className="w-[1242px]">
          <Text className="text-3xl  text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconSmartphone />{title}</Text>
          <HSeparator className="w-full mb-5 mt-2" />
          <div className="flex flex-row gap-10 mb-5">
            {services.map((item) => (
              <div className="flex flex-col max-w-[270px]">
                <img width={'350px'} height={'230px'} src={item.serviceImg} className="sombra rounded-3xl" />
                <Text className="mt-5 font-bold text-dark dark:text-white" as="span">{item.serviceName}</Text>
                <Button onClick={() => onServiceClick(item.topic)} className="btn-outline-primary mt-5">Solicitar</Button>
              </div>
            ))}
          </div>
          <Text className="mt-5 text-dark dark:text-white-dark font-bold text-lg" as="span">Ver Mais</Text>
        </div>
      </div>
    </>
  )
}