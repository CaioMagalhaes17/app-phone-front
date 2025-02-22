import { IconPlus, IconSend, Panel, Text } from "@app/ui"
import { Link } from "react-router-dom"
import { BudgetType } from "../../../../types/budget"
import { formatPhoneBrand, formatTopic } from "../../../../formaters/solicitations"
import { batteryQuestions, displayQuestions } from "../../../../constants/solicitation-form-questions";

export interface StoreProfileBudgetProps {
  budgets: [] | BudgetType[]
  isOwner?: boolean
}
export function StoreProfileBudgets({ budgets, isOwner }: StoreProfileBudgetProps) {
  console.log(budgets)
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
      <Panel className="w-full">
        {budgets.length > 0 ? (
          <>
            <div className="flex flex-row">
              <Text className="text-3xl text-white" as="h1">Ultimos Orçamentos</Text>
              {isOwner ? <Link to="/store/budget/list" className="btn ml-auto btn-primary flex flex-row gap-2"><IconPlus /> Ver todas</Link>
                : <Link to={`/solicitations/create/${budgets[0].storeProfile.id}`} className="btn ml-auto btn-primary flex flex-row gap-2"><IconSend /> Pedir orçamento de conserto direto para loja</Link>}

            </div>
            <div className="border-b border-b-[#323b45] mt-5 " />
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
                  <div className="border-b border-b-[#323b45] mt-5 " />
                </>

              )

            })}
          </>
        ) : (
          <>
            <div className="flex flex-row">
              <Text className="text-3xl text-white" as="h1">Ultimos Orçamentos</Text>
            </div>
            <div className="border-b border-b-[#323b45] mt-5 " />
            <div className="mt-10 h-[200px]">
              <Text className="text-3xl" as="span">Não foram encontrados registros</Text>
            </div>
          </>
        )}
      </Panel>

    </>
  )
}