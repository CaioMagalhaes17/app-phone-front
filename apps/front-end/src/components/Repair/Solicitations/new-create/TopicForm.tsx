import { Button, HSeparator, IconSettings, Panel, Text } from "@app/ui";
import { pokemon } from "../../../../constants/images";
import { ProblemTopicType } from "../../../../types/solicitation";

export function TopicForm({ handleSelectTopic, selectedTopic }: { selectedTopic: string, handleSelectTopic: (topic: ProblemTopicType) => void }) {

  const servies: { topicImg: string, topicName: string, topicId: ProblemTopicType }[] = [
    {
      topicImg: pokemon,
      topicName: 'Troca de Baterias',
      topicId: 'battery'
    },
    {
      topicImg: pokemon,
      topicName: 'Troca de Tela',
      topicId: 'display'
    },
    {
      topicImg: pokemon,
      topicName: 'Troca de Baterias',
      topicId: 'display'
    },
    {
      topicImg: pokemon,
      topicName: 'Troca de Baterias',
      topicId: 'display'
    }
  ]
  return (
    <>
      <Panel className="sombra p-4 rounded-xl bg-white dark:bg-black w-full">
        <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconSettings />Tipo de serviço</Text>
        <HSeparator className="mt-2 mb-5" />
        <div className="flex flex-row gap-10 mb-5">
          {servies.map((item) => (
            <div onClick={() => handleSelectTopic(item.topicId)} className="flex flex-col max-w-[270px]">
              <img width={'350px'} height={'230px'} src={item.topicImg} className="sombra rounded-3xl" />
              <Text className="mt-5 font-bold text-dark dark:text-white" as="span">{item.topicName}</Text>
              <Button type="button" className={`btn-outline-primary mt-5 ${selectedTopic === item.topicId ? 'btn-primary text-white' : ''}`}>{selectedTopic === item.topicId ? 'Selecionado' : 'Selecionar'}</Button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}