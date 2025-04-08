import { Button, HSeparator, IconSmartphone, Text } from "@app/ui";
import { ProblemTopicType } from "../../../../types/solicitation";
import { useState } from "react";

export function StoreServicesGrid({ services, title, onServiceClick }: {
  services: {
    topicImg: string;
    topicName: string;
    topicId: ProblemTopicType;
  }[],
  title: string
  onServiceClick: (topic: string) => void
}) {
  const [showMore, setShowMore] = useState<boolean>(false)

  return (
    <>

      <div className="flex items-center font-bold justify-center flex flex-col">
        <div className="p-4 rounded-xl dark:bg-black w-[1242px]">
          <Text className="text-3xl  text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconSmartphone />{title}</Text>
          <HSeparator className="w-full mb-5 mt-2" />
          <div className="flex flex-wrap gap-10 mb-5">
            {services.map((item, i) => (
              <>
                {showMore ? (
                  <div className="flex flex-col max-w-[270px]">
                    <img
                      src={item.topicImg}
                      className="w-[270px] h-[270px] sombra rounded-3xl"
                      alt={item.topicName}
                    />
                    <Text className="mt-5 font-bold text-dark dark:text-white" as="span">{item.topicName}</Text>
                    <Button onClick={() => onServiceClick(item.topicId)} className="btn-outline-primary mt-5">Solicitar</Button>
                  </div>
                ) : (
                  <>
                    {i <= 3 && (
                      <div className="flex flex-col max-w-[270px]">
                        <img
                          src={item.topicImg}
                          className="w-[270px] h-[270px] sombra rounded-3xl"
                          alt={item.topicName}
                        />
                        <Text className="mt-5 font-bold text-dark dark:text-white" as="span">{item.topicName}</Text>
                        <Button onClick={() => onServiceClick(item.topicId)} className="btn-outline-primary mt-5">Solicitar</Button>
                      </div>
                    )}
                  </>
                )}
              </>

            ))}
          </div>
          <Text onClick={() => setShowMore(!showMore)} className="text-lg text-dark dark:text-white-dark cursor-pointer" as="span">{!showMore ? 'Ver mais' : 'Ver menos'}</Text>
        </div>
      </div>
    </>
  )
}