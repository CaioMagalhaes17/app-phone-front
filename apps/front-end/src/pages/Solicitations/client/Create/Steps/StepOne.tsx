import { Text } from "@app/ui";
import React from "react";

export function StepOne({ topic, setTopic }: { topic: string, setTopic: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <>
      <div className="items-center flex flex-col justify-center">
        <Text className="mt-2 font-extrabold text-white text-xl" as="h1">1. Onde está a raiz do defeito?</Text>
        <div className="grid grid-cols-2 gap-4 aspect-square mt-5 w-[26rem]">
          <button onClick={() => setTopic('battery')} >
            <div className={`h-full ${topic === 'battery' ? 'border-4 border-[#635bff]' : ''}  w-full bg-green-500 flex items-center text-white justify-center`}>Bateria</div>
          </button>
          <button onClick={() => setTopic('display')} >
            <div className={`h-full ${topic === 'display' ? 'border-4 border-[#635bff]' : ''}  w-full bg-gray-500 flex items-center text-white justify-center`}>Tela</div>
          </button>
          <div className="bg-blue-500 flex items-center justify-center">3</div>
          <div className="bg-yellow-500 flex items-center justify-center">4</div>
        </div>
      </div>
    </>
  )
}