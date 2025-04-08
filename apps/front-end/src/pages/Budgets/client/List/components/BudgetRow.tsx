import { HSeparator, IconArrowBackward, Text } from "@app/ui";
import { BudgetType } from "../../../../../types/budget";
import { formatPhoneBrand } from "../../../../../formaters/solicitations";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export function BudgetRow({ budget, distance }: { distance: number, budget: BudgetType }) {
  return (
    <>
      <div className="max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[100px]">
          <img width="100" height="100" src={budget.storeProfile.profileImg} className="rounded-3xl" />
        </div>
        <div className="flex w-full flex-col">
          <Text className="flex flex-row gap-5 items-center text-center text-black dark:text-white text-lg" as="span">
            {budget.storeProfile.name}
            <div className="flex flex-row mb-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={index < budget.storeProfile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                  size={16}
                />
              ))}
            </div>
          </Text>
          <div className="flex flex-row w-full">
            <div className="w-full text-left flex flex-col gap-2">
              <Text className="text-green" as="span">{budget.startValue} - {budget.endValue}</Text>
              <Text className="text-dark dark:text-white" as="span">{formatPhoneBrand(budget.solicitation.form.phoneForm.brand)} - {budget.solicitation.form.phoneForm.model}</Text>
              <Text as="span">Distância: {Math.floor(distance) >= 1000 ? `${Math.floor(Math.floor(distance) / 1000)} km` : `${Math.floor(distance)} m`}</Text>
            </div>
            <div className="w-full flex flex-row gap-5 items-center">
              <div className="ml-auto" />
              <Link to={`/budget/${budget.id}`} className="btn btn-primary flex flex-row gap-2"><IconArrowBackward />Ver detalhes</Link>
            </div>
          </div>

        </div >
      </div >
      <HSeparator />
    </>
  )
}