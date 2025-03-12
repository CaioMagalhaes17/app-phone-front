
import { BatteryFormType, DisplayFormType } from "../../../../types/solicitation";
import { ProblemFormComponent } from "../../../../components/Repair/Solicitations/Details/ProblemForm";

export function ProblemForm({ problemForm, topic, solicitationId, canEdit }: { canEdit: boolean, solicitationId: string, topic: string, problemForm: BatteryFormType | DisplayFormType }) {
  return (
    <ProblemFormComponent canEdit={canEdit} problemForm={problemForm} solicitationId={solicitationId} topic={topic} />
  )
}