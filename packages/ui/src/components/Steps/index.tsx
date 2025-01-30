import { ButtonStep } from "./button-step"
import React from 'react'

type StepsProps = {
  steps: string[]
  activeTab: number
  handleChangeTab: (activeTab: number) => void
}
export function Steps({ steps, activeTab, handleChangeTab }: StepsProps) {
  function getCorrectWidth() {
    const widthPercentage = (activeTab / steps.length) * 100;
    if (steps.length > 0 && steps.length < 3) {
      return `${widthPercentage - 25}%`
    }
    if (steps.length >= 3 && steps.length < 5) {
      return `${widthPercentage - 7}%`
    }
    if (steps.length >= 5 && steps.length < 9) {
      return `${widthPercentage - 8}%`
    }
    if (steps.length >= 9) {
      return `${widthPercentage - 5}%`
    }
  }

  const qtdItems = steps.length
  return (
    <div className="relative z-[1]">
      <div
        className={`bg-primary h-1 absolute top-[30px] m-auto -z-[1] transition-[width] max-w-full`}
        style={{ width: getCorrectWidth() }}
      ></div>
      <ul className={`mb-5 flex flex-row`}>
        {steps.map((item: string, index: number) => {
          const current = index + 1
          return (
            <ButtonStep
              id={`${current}`}
              name={item}
              isActive={activeTab === current || activeTab >= current}
              onClick={() => handleChangeTab(current)} />
          )
        })}
      </ul>
    </div>
  )
}