import { HSeparator, IconSend, Text } from "@app/ui";
import { SolicitationForm } from "../../../components/Repair/Solicitations/new-create/SolicitationForm";
import DefaultLanding from "../components/Default";

export function LandingCreateSolicitation() {
  return (
    <>
      <DefaultLanding>
        <div className="p-4">
          <div className="max-w-[1400px] mr-auto ml-auto">
            <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center font-bold" as="h1"><IconSend />Solicitar Conserto</Text>
            <HSeparator className="mb-5 mt-2" />
          </div>
          <SolicitationForm isAuthenticated={false} />
        </div>
      </DefaultLanding>
    </>

  )
}