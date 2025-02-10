import { Button, IconPlus, Panel, Text } from "@app/ui";
import { useEffect, useState } from "react";
import useStore from "../../../state";
import { MapAdapter, MarkAdapter } from "../../../adapters/Map";
import { Star } from "lucide-react";
import { BudgetType } from "../../../types/budget";
import { formatPhoneBrand, formatTopic } from "../../../formaters/solicitations";
import { batteryQuestions, displayQuestions } from "../../../constants/solicitation-form-questions";


export function StoreProfileComponent({ name, rating, budgets }: { name: string, rating: number, budgets: BudgetType[] }) {
  const { storeInfos, isMapLoaded } = useStore()
  const totalStars = 5;
  const filledStars = 2;
  const [clintLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    setLocation({
      lat: storeInfos?.location.latitude,
      lng: storeInfos?.location.longitude,
    })
  }, [storeInfos])

  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px'
  }

  function getMainQuestion(problemForm: { [x: string]: string; }) {
    if (budgets.length > 0) {
      if ('display-A' in problemForm) {
        console.log(problemForm["display-A"])
        const result = displayQuestions[0].options.find((item) => item.optionId === problemForm["display-A"])
        if (result) return result.text
      }
      if ('battery-A' in problemForm) {
        const result = batteryQuestions[0].options.find((item) => item.optionId === problemForm["battery-A"])
        if (result) return result.text
      }
    }
  }



  return (
    <>
      {/*Painel Principal*/}
      <Panel>
        <div className="max-w-[1200px] mr-auto ml-auto flex flex-row gap-5">
          <div className="w-[350px] flex flex-col gap-2 ">
            <img width={'260px'} height={'260px'} src="https://avatars.githubusercontent.com/u/73131798?v=4" className="rounded-3xl" />
          </div>
          <div className="p-2 flex w-full text-left text-lg font-extrabold text-white gap-5 flex-col">
            <Text className="text-white font-extrabold text-3xl" as="span">{name}</Text>
            <div className="border-b border-b-[#323b45] " />
            <Text className="text-white-dark font-extrabold text-xl" as="span">Aberta/Fechada</Text>
            <div className="flex flex-row">{[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={index < rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                size={32}
              />
            ))}</div>
            <div className="border-b border-b-[#323b45] " />
            <div className="flex flex-row gap-5">
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Possui entregas</span>
              </label>
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Rápidos orçamentos</span>
              </label>

            </div>
            <div className="flex flex-row gap-5">
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Rápidos orçamentos</span>
              </label>
              <label className="text-md flex items-center gap-2 block">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full"
                  checked
                  disabled
                  style={{ backgroundColor: 'currentcolor' }}
                />
                <span className="font-extrabold">Rápidos orçamentos</span>
              </label>
            </div>
          </div>

        </div>
      </Panel>
      {/*Feedback e orçamentos*/}
      <div className="gap-5 flex mt-5 font-extrabold flex-row">
        <Panel className="w-full">
          <div className="flex flex-row">
            <Text className="text-3xl text-white" as="h1">Avaliações</Text>
            <Button className="ml-auto btn-primary flex flex-row gap-2"><IconPlus /> Ver todas</Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col gap-2 mt-5 ">
              <img width={'100px'} height={'100px'} src="https://avatars.githubusercontent.com/u/73131798?v=4" className="rounded-3xl" />
            </div>
            <div className="flex flex-col">
              <Text className="text-white text-lg" as="span">Angela Duarte Da silva Lima Rocha nigger</Text>
              <div className="flex flex-row">{[...Array(totalStars)].map((_, index) => (
                <Star
                  key={index}
                  className={index < filledStars ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                  size={16}
                />
              ))}</div>
              <Text className="text-white-dark" as="span">Angela Duarte Da silva Lima Rocha nigger</Text>
            </div>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col gap-2 mt-5 ">
              <img width={'100px'} height={'100px'} src="https://avatars.githubusercontent.com/u/73131798?v=4" className="rounded-3xl" />
            </div>
            <div className="flex flex-col">
              <Text className="text-white text-lg" as="span">Angela Duarte Da silva Lima Rocha nigger</Text>
              <div className="flex flex-row">{[...Array(totalStars)].map((_, index) => (
                <Star
                  key={index}
                  className={index < filledStars ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                  size={16}
                />
              ))}</div>
              <Text className="text-white-dark" as="span">Angela Duarte Da silva Lima Rocha nigger</Text>
            </div>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col gap-2 mt-5 ">
              <img width={'100px'} height={'100px'} src="https://avatars.githubusercontent.com/u/73131798?v=4" className="rounded-3xl" />
            </div>
            <div className="flex flex-col">
              <Text className="text-white text-lg" as="span">Angela Duarte Da silva Lima Rocha nigger</Text>
              <div className="flex flex-row">{[...Array(totalStars)].map((_, index) => (
                <Star
                  key={index}
                  className={index < filledStars ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                  size={16}
                />
              ))}</div>
              <Text className="text-white-dark" as="span">Angela Duarte Da silva Lima Rocha nigger</Text>
            </div>
          </div>

        </Panel>
        <Panel className="w-full">
          <div className="flex flex-row">
            <Text className="text-3xl text-white" as="h1">Ultimos Orçamentos</Text>
            <Button className="ml-auto btn-primary flex flex-row gap-2"><IconPlus /> Ver todas</Button>
          </div>
          <div className="border-b border-b-[#323b45] mt-5 mt-10" />
          {budgets.map((budget) => {
            return (
              <>
                <div className="flex flex-row items-center gap-5">
                  <div className="flex flex-col gap-2 mt-5 ">
                    <img width={'100px'} height={'100px'} src="https://avatars.githubusercontent.com/u/73131798?v=4" className="rounded-3xl" />
                  </div>
                  <div className="flex flex-col">
                    <Text className="text-white text-lg" as="span">{formatTopic(budget.solicitation.form.problemTopic)} - {formatPhoneBrand(budget.solicitation.form.phoneForm.brand)} {budget.solicitation.form.phoneForm.model}</Text>
                    <Text className="text-success text-lg" as="span">{budget.startValue} - {budget.endValue} </Text>
                    <Text className="text-white-dark" as="span">{getMainQuestion(budget.solicitation.form.problemForm)}</Text>
                  </div>
                </div>
                <div className="border-b border-b-[#323b45] mt-5 mt-10" />
              </>

            )
          })}
        </Panel>
      </div>
      {/*Localização Loja*/}
      <Panel className="mt-5 font-extrabold">
        <Text className="text-3xl text-white" as="h1">Localização e Contato</Text>
        <div className="border-b border-b-[#323b45] mt-5 mt-10" />
        <div className="flex flex-row relative h-full gap-5">

          <div style={{ borderRadius: '10px' }} className="max-w-xs flex flex-col  p-4 gap-2 items-center  w-[420px]">
            <Text className="text-white text-lg " as="span">Rua Resedá 248 - Santa Efigênia</Text>
            <Text className="text-white text-lg " as="span">Belo Horizonte</Text>
            <div className="border-b border-b-[#323b45] mt-5 mt-10 w-full" />
            <div className="mt-auto" />
            <Text className="text-white-dark text-md mt-10" as="span">(31) 9 99585-3806 - (descrição)</Text>
            <Text className="text-white-dark text-md " as="span">caiomagalhaesdefaria@hotmail.com</Text>
            <div className="border-b border-b-[#323b45] mt-5 mt-10 w-full" />
            <div className="flex flex-row mt-5 gap-2">
              <Button className="btn-outline-primary">WPP</Button>
              <Button className="btn-outline-primary">INSTA</Button>
              <Button className="btn-outline-primary">FCB</Button>
            </div>
          </div>
          <div className="h-[500px] w-full p-4">{clintLocation && isMapLoaded ? (
            <MapAdapter mapStyle={mapStyle} initialPosition={clintLocation}>
              <MarkAdapter position={clintLocation} />
            </MapAdapter>
          ) : (<>'Carregando...'</>)}</div>
        </div>
      </Panel>
    </>
  )
}