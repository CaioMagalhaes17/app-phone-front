import { PhoneFormType } from "../../../../types/solicitation";
import { PhoneFormComponent } from "../../../../components/Repair/Solicitations/Details/PhoneForm";

export function PhoneForm({ phoneForm, solicitationId }: { solicitationId: string, phoneForm: PhoneFormType }) {
  return (
    <PhoneFormComponent isOwner={false} phoneForm={phoneForm} solicitationId={solicitationId} />
  )
}