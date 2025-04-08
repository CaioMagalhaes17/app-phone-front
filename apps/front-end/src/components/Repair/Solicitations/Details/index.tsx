import { Button, HSeparator, IconArrowBackward, IconDollarSignCircle, IconStore, IconX, Panel, Text, VSeparator } from "@app/ui";
import { formatPhoneBrand, getStatusColor } from "../../../../formaters/solicitations";
import { Link, useNavigate } from "react-router-dom";
import { ProblemFormComponent } from "./ProblemForm";
import { PhoneFormComponent } from "./PhoneForm";
import { FinalFormComponent } from "./FinalForm";
import { SolicitationImages } from "./SolicitationImages";
import { Solicitation } from "../../../../types/solicitation";
import { BudgetType } from "../../../../types/budget";
import { getTopicFormatted, getTopicImg } from "../../../../constants/solicitation-form-questions";

export function SolicitationDetailsComponent(
  {
    storeBudget, isStore, canEdit, handleDeleteSolicitation, canCancelSolicitation, solicitationData, solicitationId, budgets, budgetsLoading, isOwner
  }: {
    storeBudget?: React.ReactNode, isStore: boolean, canEdit?: boolean, handleDeleteSolicitation?: () => void, canCancelSolicitation?: boolean, solicitationData: Solicitation, solicitationId: string, budgets?: BudgetType[], budgetsLoading?: boolean, isOwner: boolean
  }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="p-4">
        <Button onClick={() => navigate(-1)} className="btn-outline-primary flex flex-row gap-2"><IconArrowBackward /></Button>
        <div className="max-w-[1200px] mx-auto dark:bg-black p-6 rounded-xl">
          <div className="flex gap-5 flex-row ">
            <img src={getTopicImg(solicitationData.form.problemTopic)} className="rounded-3xl w-[150px] h-[150px]" />
            <div className="flex flex-col">
              <Text className="text-dark dark:text-white font-extrabold text-3xl flex flex-row gap-5 " as="h1">Defeito em<span className="underline">{getTopicFormatted(solicitationData?.form.problemTopic)}</span></Text>
              <Text className="font-extrabold text-xl" as="h1">{formatPhoneBrand(solicitationData.form.phoneForm.brand)} - {solicitationData.form.phoneForm.model}</Text>
              <Text className={`font-extrabold text-md mt-2 text-${getStatusColor(solicitationData.status)}`} as="h1">{solicitationData.status}</Text>
            </div>
            <div className="mr-auto" />
            {canCancelSolicitation && !isStore && handleDeleteSolicitation ? (
              <Button onClick={() => handleDeleteSolicitation()} className="h-[50px] btn-danger flex flex-row gap-2"><IconX />Cancelar solicitação de conserto</Button>
            ) : ''}
            {isStore ? (<>{storeBudget}</>) : ''}
          </div>

          <HSeparator />
          <div className="mt-10 flex items-center flex-row gap-6 w-full">
            <ProblemFormComponent canEdit={canEdit} solicitationId={solicitationId} topic={solicitationData.form.problemTopic} problemForm={solicitationData.form.problemForm} />
            <VSeparator className="h-[200px]" />
            <PhoneFormComponent isOwner={isOwner} canEdit={canEdit} solicitationId={solicitationId} phoneForm={solicitationData.form.phoneForm} />
          </div>
          <HSeparator />

          <FinalFormComponent canEdit={canEdit} solicitationId={solicitationId} deliveryPreference={solicitationData.form.deliveryPreference} timePreference={solicitationData.form.timePreference} details={solicitationData.form.details} />
          <HSeparator />

          <SolicitationImages images={solicitationData.form.solicitationImgs} />
          <HSeparator />

          {budgets && budgets.length > 0 && !budgetsLoading ?
            (
              <Panel className="font-bold mt-6 max-w-[1200px] w-full">
                <div className="flex flex-row">
                  <Text className="text-2xl text-dark dark:text-white" as="h1">Todos orçamentos retornados:</Text>
                  <div className="ml-auto" />
                </div>
                {budgets.map((budget) => {
                  return (
                    <>
                      <div className="flex flex-row items-center gap-5">
                        <div className="flex flex-col gap-2 mt-5 ">
                          <img width={'100px'} height={'100px'} src={budget.storeProfile.profileImg} className="rounded-3xl" />
                        </div>
                        <div className="flex flex-col">
                          <Text className="text-dark dark:text-white text-lg" as="span">{budget.storeProfile.name}</Text>
                          <Text className="text-green" as="span">{budget.startValue} - {budget.endValue}</Text>
                        </div>
                        <div className="ml-auto">
                          <Link target="_blank" rel="noopener noreferrer" to={`/store-profile/${budget.storeProfile.id}`} className="btn-primary btn flex flex-row gap-2"><IconStore />Acessar perfil da loja</Link>
                        </div>
                        <div className="">
                          <Button className="btn-outline-green flex flex-row gap-2"><IconDollarSignCircle />Escolher orçamento</Button>
                        </div>
                      </div>
                      <HSeparator />
                    </>
                  )
                })}
              </Panel>
            )
            : ''}
        </div>
      </div>
    </>
  )
}