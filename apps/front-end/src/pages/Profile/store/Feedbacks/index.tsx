import { Button, Panel, Text } from "@app/ui";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom"

export function StoreFeedbacks() {
  const { id } = useParams() as { id: string }
  const totalStars = 5;
  const filledStars = 4;
  return (
    <>
      <div className="flex justify-center">
        <Panel className="font-extrabold  max-w-[1200px] w-full">
          <div className="flex flex-row">
            <Text className="text-3xl text-white" as="h1">Avaliações</Text>
            <div className="ml-auto" />
            <Button className="btn-success mr-5">Resolvidos</Button>
            <Button className="btn-outline-warning">Em aberto</Button>
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
            <div className="ml-auto p-4 rounded-xl border border-success">
              <Text className="text-2xl text-success" as="span">Resolvido</Text>
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
      </div>

    </>
  )
}