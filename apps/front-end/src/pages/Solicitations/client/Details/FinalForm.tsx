import { FinalFormComponent } from "../../../../components/Repair/Solicitations/Details/FinalForm"

export function FinalForm({ deliveryPreference, timePreference, details, solicitationId, canEdit }: {
  deliveryPreference: string
  timePreference: string
  details: string
  solicitationId: string
  canEdit: boolean
}) {

  return (
    <>
      <FinalFormComponent canEdit={canEdit} deliveryPreference={deliveryPreference} details={details} timePreference={timePreference} solicitationId={solicitationId} />
    </>
  )
}