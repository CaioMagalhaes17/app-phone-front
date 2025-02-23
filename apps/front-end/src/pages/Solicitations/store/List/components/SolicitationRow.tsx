import { IconSmartphone, Text } from "@app/ui";
import { Solicitation } from "../../../../../types/solicitation";
import { Link } from "react-router-dom";
import { getStepTwoAnswersByForm } from "../../../../../constants/solicitation-form-questions";
import { formatPhoneBrand, formatTimePreference, getTimePreferenceColor } from "../../../../../formaters/solicitations";
import dayjs from "dayjs";
import { DIRECT_SOLICITATION } from "../../../../../constants/solicitation-status";

export function SolicitationRow({ solicitation }: { solicitation: Solicitation }) {
  const answers = getStepTwoAnswersByForm(solicitation.form.problemTopic, solicitation.form.problemForm)
  return (
    <>
      <div className="hover:bg-[#5f577426] max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[100px]">
          <img width="100" height="100" src={'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png'} className="rounded-3xl" />
        </div>
        <div className="flex w-full flex-col max-w-[80%]">
          <Text className="flex flex-row gap-5 items-center text-center text-white text-lg" as="span">
            {answers[0].answer} {solicitation.status === DIRECT_SOLICITATION && (<><span className="text-warning">{solicitation.status}</span></>)}
          </Text>
          <div className="flex flex-row w-full ">
            <div className="w-full text-left flex flex-col ">
              <Text className="text-white mt-3" as="span">{formatPhoneBrand(solicitation.form.phoneForm.brand)} - {solicitation.form.phoneForm.model}</Text>

              {solicitation.form.timePreference === 'urgent' && (
                <Text className={`text-${getTimePreferenceColor(solicitation.form.timePreference)}`} as="span">{formatTimePreference(solicitation.form.timePreference)}</Text>
              )}
              <Text as="span">{dayjs(solicitation.createdAt).format('DD/MM/YYYY')}</Text>

            </div>
            <div className="flex flex-row w-[30%] gap-5 items-center">
              <Link rel="noopener noreferrer" to={`/store/solicitation/${solicitation.id}`} className="btn-outline-primary btn w-full flex flex-row gap-2">
                <IconSmartphone />
                Detalhes do defeito
              </Link>
            </div>
          </div>

        </div >
      </div >
      <div className="border-b border-b-[#323b45] mt-5" />
    </>
  )
}