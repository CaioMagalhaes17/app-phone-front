import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBudgetById } from "../../../../hooks/budgets/useGetBudgetById";
import { Button, IconArrowBackward, Panel, Text } from "@app/ui";
import { BudgetDetailsLocation } from "./components/Location";
import { StoreResume } from "../../../../components/Profiles/store/resume";


export function BudgetDetails() {
  const { id } = useParams() as { id: string }
  const { budget } = useGetBudgetById(id)
  const navigate = useNavigate()
  return (
    <>
      <Button className="btn-outline-primary" onClick={() => navigate(-1)}><IconArrowBackward /></Button>
      {budget && (
        <div className="flex flex-col ">
          <div className="flex gap-10 mr-auto ml-auto mr-auto mt-10 flex-row">
            <Panel className="min-w-[900px]">
              <div className="flex flex-col p-4 font-extrabold">
                <Text as="h1" className="text-black dark:text-white text-5xl">Orçamento</Text>
                <div className="border-b border-b-[#323b45] mt-5 " />
                <Text className="text-3xl mt-10 text-green" as="span">{budget.startValue} - {budget.endValue}</Text>
                <Text as="span" className="">Previsão da duração do conserto: <Text as="span" className="text-dark dark:text-white">2 dias úteis</Text></Text>
                <Text as="span" className="text-dark dark:text-[#c4c4c4] mt-10">Sobre a loja</Text>
                <div className="flex flex-row gap-5 text-lg text-dark dark:text-white">
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
                    <span className="font-extrabold">Entrega grátis</span>
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
              <div className="mt-10 flex flex-row">
                <div className="ml-auto" />
                <Link to={`/solicitation/${budget.solicitation.id}`} className="btn btn-outline-primary">Acessar solicitação</Link>
              </div>
            </Panel>
            <StoreResume storeProfile={budget.storeProfile} />
          </div>
          <BudgetDetailsLocation budget={budget} />
        </div>
      )}
    </>
  )
}