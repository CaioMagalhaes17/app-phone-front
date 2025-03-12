import { FinalFormComponent } from "../../../../components/Repair/Solicitations/Details/FinalForm";

export function FinalForm({ deliveryPreference, timePreference, details, solicitationId }: {
  deliveryPreference: string
  timePreference: string
  details: string
  solicitationId: string
}) {
  return (
    <>
      <FinalFormComponent canEdit={false} deliveryPreference={deliveryPreference} details={details} timePreference={timePreference} solicitationId={solicitationId} />
    </>
  )
}