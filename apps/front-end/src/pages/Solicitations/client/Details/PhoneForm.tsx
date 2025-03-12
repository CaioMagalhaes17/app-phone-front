import { PhoneFormType } from "../../../../types/solicitation";

import { PhoneFormComponent } from "../../../../components/Repair/Solicitations/Details/PhoneForm";

export function PhoneForm({ phoneForm, solicitationId, canEdit }: { canEdit: boolean, solicitationId: string, phoneForm: PhoneFormType }) {

  return <PhoneFormComponent isOwner={true} phoneForm={phoneForm} canEdit={canEdit} solicitationId={solicitationId} />
} 