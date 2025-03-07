import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBudgetById } from "../../../../hooks/budgets/useGetBudgetById";
import { Button, IconArrowBackward, IconMail, IconStore, IconWhatsApp, Panel, Text } from "@app/ui";
import { Star } from "lucide-react";
import { BudgetDetailsLocation } from "./components/Location";


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
            <Panel className="min-w-[400px] p-4">
              <Text className="text-black dark:text-white text-5xl mt-4 font-extrabold " as="h1">Loja</Text>
              <div className="border-b border-b-[#323b45] mt-5 " />
              <div className="font-extrabold flex flex-row gap-5 mt-10">
                <div className="w-[100px] max-h-[80px] ">
                  <img width="100" height="100" src={budget.storeProfile.profileImg} className="rounded-3xl" />
                </div>
                <div className="flex w-full flex-col">
                  <Text className="flex flex-row gap-5 items-center text-center text-dark dark:text-white text-lg" as="span">
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
                      <Text className="text-lg text-green" as="span">Aberto</Text>
                      <Text as="span">Distância em km: {budget.solicitation.form.details}</Text>
                    </div>
                  </div>
                </div >
              </div >
              <div className="border-b border-b-[#323b45] mb-5 mt-5" />
              <div className="flex flex-col gap-5">
                <Button className="btn-green flex flex-row gap-2"><IconWhatsApp />Chamar no Whatsapp</Button>
                <Button className="btn-blue flex flex-row gap-2"><IconMail />Enviar Email</Button>
                <Link target="_blank" to={`/store-profile/${budget.storeProfile.id}`} className="btn-primary btn flex flex-row gap-2"><IconStore />Perfil da loja</Link>
              </div>
            </Panel>
          </div>
          <BudgetDetailsLocation budget={budget} />
        </div>
      )}
    </>
  )
}