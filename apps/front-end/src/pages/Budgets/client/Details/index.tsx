import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBudgetById } from "../../../../hooks/budgets/useGetBudgetById";
import { Button, HSeparator, IconArrowBackward, IconDollarSignCircle, IconSend, Panel, Text } from "@app/ui";
import { BudgetDetailsLocation } from "./components/Location";
import { StoreResume } from "../../../../components/Profiles/store/resume";
import { storeTags } from "../../../../constants/store-tags";


export function BudgetDetails() {
  const { id } = useParams() as { id: string }
  const { budget, distance } = useGetBudgetById(id)
  const navigate = useNavigate()
  return (
    <>
      <Button className="btn-outline-primary" onClick={() => navigate(-1)}><IconArrowBackward /></Button>
      {budget && (
        <div className="sombra p-4 dark:bg-black rounded-xl p-4 flex flex-col max-w-[1200px] ml-auto mr-auto font-bold">
          <div className="flex gap-10 mr-auto ml-auto mr-auto mt-10 flex-row">
            <Panel className="min-w-[600px]">
              <div className="flex flex-col">
                <Text as="h1" className="text-dark dark:text-white text-3xl flex flex-row gap-5 items-center"><IconDollarSignCircle className="w-[40px] h-[40px]" />Orçamento</Text>
                <HSeparator />
                <div className="flex flex-row mt-10">
                  <div className="flex flex-col">
                    <Text className="text-3xl  text-green" as="span">{budget.startValue} - {budget.endValue}</Text>
                    <Text as="span" className="text-dark dark:text-white text-lg mt-5">Previsão da duração do conserto: <Text as="span" className="text-dark dark:text-white-dark underline">{budget.estimatedTime}</Text></Text>
                  </div>
                  {budget.details && (
                    <div className="ml-auto flex flex-col mr-10">
                      <Text className="text-lg text-dark dark:text-white" as="span">Observações:</Text>
                      <textarea value={budget.details} className="placeholder:text-white-dark rounded-md border text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] dark:bg-[#121e32] text-white-dark focus:border-primary" />
                    </div>
                  )}
                </div>
                <Text as="span" className="text-dark dark:text-[#c4c4c4] mt-10">Sobre a loja</Text>
                <div className="flex text-sm flex-row flex-wrap gap-2 mt-5 text-white max-w-[500px]">
                  {budget.storeProfile.tags && budget.storeProfile.tags.map((tag) => {
                    const tagName = storeTags.filter((item) => item.id === tag)[0]
                    return (
                      <button className={`text-dark dark:text-white border rounded-xl p-1`}>{tagName.name}</button>
                    )
                  })}
                </div>
              </div>
              <Link to={`/solicitation/${budget.solicitation.id}`} className="btn btn-outline-primary mt-5 w-[250px]"><IconSend /><span className="ml-5">Acessar solicitação</span></Link>
            </Panel>
            <StoreResume distance={distance} storeProfile={budget.storeProfile} />
          </div >
          <BudgetDetailsLocation budget={budget} />
        </div >
      )
      }
    </>
  )
}