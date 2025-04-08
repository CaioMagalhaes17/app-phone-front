import { Button, HSeparator, IconSettings, Panel, Text } from "@app/ui";
import { ProblemTopicType } from "../../../../types/solicitation";
import { useState } from "react";
import { services } from "../../../../constants/services";

export function TopicForm({ handleSelectTopic, selectedTopic }: { selectedTopic?: string, handleSelectTopic: (topic: ProblemTopicType) => void }) {

  const [showMore, setShowMore] = useState<boolean>(false)
  return (
    <>
      <Panel className="sombra p-4 rounded-xl bg-white dark:bg-black  w-full">
        <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconSettings />Tipo de serviço</Text>
        <HSeparator className="mt-2 mb-5" />
        <div className="flex flex-wrap gap-10  mb-5">
          {services.map((item, i) => (
            <>
              {showMore ? (
                <div onClick={() => handleSelectTopic(item.topicId)} className="flex flex-col h-full w-[200px]">
                  <img
                    src={item.topicImg}
                    className="w-[200px] h-[200px] sombra rounded-3xl"
                    alt={item.topicName}
                  />
                  <Text className="mt-5 font-bold text-dark dark:text-white" as="span">{item.topicName}</Text>
                  <Button type="button" className={`btn-outline-primary mt-5 ${selectedTopic === item.topicId ? 'btn-primary text-white' : ''}`}>{selectedTopic === item.topicId ? 'Selecionado' : 'Selecionar'}</Button>
                </div>
              ) : (
                <>
                  {i <= 3 && (
                    <div onClick={() => handleSelectTopic(item.topicId)} className="flex flex-col h-full  w-[200px]">
                      <img
                        src={item.topicImg}
                        className="w-[200px] h-[200px] sombra rounded-3xl"
                        alt={item.topicName}
                      />
                      <Text className="mt-5 font-bold text-dark dark:text-white" as="span">{item.topicName}</Text>
                      <Button type="button" className={`btn-outline-primary mt-5 ${selectedTopic === item.topicId ? 'btn-primary text-white' : ''}`}>{selectedTopic === item.topicId ? 'Selecionado' : 'Selecionar'}</Button>
                    </div>
                  )}
                </>
              )}
            </>
          ))}
        </div>
        <Text onClick={() => setShowMore(!showMore)} className="text-lg text-dark dark:text-white-dark cursor-pointer" as="span">{!showMore ? 'Ver mais' : 'Ver menos'}</Text>
      </Panel>
    </>
  )
}