import { HSeparator, IconClock, IconPlus, IconSend, Panel, Text } from "@app/ui"
import { Link } from "react-router-dom"
import { BudgetType } from "../../../../types/budget"
import { formatPhoneBrand, formatTopic } from "../../../../formaters/solicitations"
import { batteryQuestions, displayQuestions, getTopicImg } from "../../../../constants/solicitation-form-questions";
import useStore from "../../../../state";

export interface StoreProfileBudgetProps {
  budgets: [] | BudgetType[]
  isOwner?: boolean
}
export function StoreProfileBudgets({ budgets, isOwner }: StoreProfileBudgetProps) {
  const { isMobile } = useStore()
  function getMainQuestion(problemForm: { [x: string]: string; }) {
    if (budgets.length > 0) {
      if ('display-A' in problemForm) {
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
      <Panel className="w-full font-bold">
        {budgets.length > 0 ? (
          <>
            <div className="flex flex-row gap-2">
              <Text className={`${!isMobile ? 'text-2xl' : 'text-[19px]'} text-dark dark:text-white flex flex-row gap-2 items-center`} as="h1"><IconClock className="w-[20px]" />Últimos Orçamentos</Text>
              <div className="ml-auto" />
              {isOwner ? <Link to="/store/budget/list" className={`${isMobile ? '!py-1 !px-3 !text-[12px] ' : ''} btn mr-2 btn-outline-primary`}><IconPlus /> Ver todas</Link>
                : <Link to={`/solicitations/create/${budgets[0].storeProfile.id}`} className={`${isMobile ? '!py-1 !px-3 !text-[12px] ' : ''} btn flex flex-row gap-2 btn-outline-primary`}><IconSend /> Solicitar {!isMobile && ('Conserto')}</Link>}

            </div>

            <HSeparator />
            {budgets.map((budget) => {
              return (
                <>
                  <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-col gap-2 mt-5 ">
                      <img width={'100px'} height={'100px'} src={getTopicImg(budget.solicitation.form.problemTopic)} className="rounded-3xl" />
                    </div>
                    <div className="flex flex-col">
                      <Text className="text-dark dark:text-white text-lg" as="span">{formatTopic(budget.solicitation.form.problemTopic)} - {formatPhoneBrand(budget.solicitation.form.phoneForm.brand)} {budget.solicitation.form.phoneForm.model}</Text>
                      <Text className="text-green text-lg" as="span">{budget.startValue} - {budget.endValue} </Text>
                      <Text className="text-white-dark" as="span">{getMainQuestion(budget.solicitation.form.problemForm)}</Text>
                    </div>
                  </div>
                  <HSeparator />
                </>

              )

            })}
          </>
        ) : (
          <>
            <div className="flex flex-row">
              <Text className={`${isMobile ? 'text-xl' : 'text-2xl'} text-dark dark:text-white`} as="h1">Últimos Orçamentos</Text>
            </div>
            <HSeparator />
            <div className="mt-10 h-[200px]">
              <Text className="text-3xl" as="span">Não foram encontrados registros</Text>
            </div>
          </>
        )}
      </Panel>

    </>
  )
}