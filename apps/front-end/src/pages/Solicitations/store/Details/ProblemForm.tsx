import { BatteryFormType, DisplayFormType } from "../../../../types/solicitation";
import { ProblemFormComponent } from "../../../../components/Repair/Solicitations/Details/ProblemForm";

export function ProblemForm({ topic, problemForm, solicitationId }: { solicitationId: string, problemForm: BatteryFormType | DisplayFormType, topic: string }) {
  return (
    <>
      <ProblemFormComponent canEdit={false} topic={topic} problemForm={problemForm} solicitationId={solicitationId} />
    </>
  )
}