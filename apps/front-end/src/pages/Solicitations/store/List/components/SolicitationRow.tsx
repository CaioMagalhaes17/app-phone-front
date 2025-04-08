import { HSeparator, IconArrowBackward, Text } from "@app/ui";
import { Solicitation } from "../../../../../types/solicitation";
import { Link } from "react-router-dom";
import { getStepTwoAnswersByForm, getTopicFormatted, getTopicImg } from "../../../../../constants/solicitation-form-questions";
import { formatPhoneBrand, formatTimePreference, getTimePreferenceColor } from "../../../../../formaters/solicitations";
import dayjs from "dayjs";
import { DIRECT_SOLICITATION } from "../../../../../constants/solicitation-status";

export function SolicitationRow({ solicitation }: { solicitation: Solicitation }) {
  const answers = getStepTwoAnswersByForm(solicitation.form.problemTopic, solicitation.form.problemForm)

  return (
    <>
      <div className="hover:bg-[#5f577426] text-dark dark:text-white max-h-[140px] mt-5 flex flex-row items-start gap-5">
        <div className="w-[100px]">
          <img src={getTopicImg(solicitation.form.problemTopic)} className="rounded-3xl w-[150px] h-[150px]" />
        </div>
        <div className="flex w-full flex-col max-w-[80%]">
          <Text className="flex flex-row gap-5 items-center text-center  text-lg" as="span">
            {getTopicFormatted(solicitation.form.problemTopic)} - {answers[0].answer} {solicitation.status === DIRECT_SOLICITATION && (<><span className="text-warning">{solicitation.status}</span></>)}
          </Text>
          <div className="flex flex-row w-full ">
            <div className="w-full text-left flex flex-col ">
              <Text className=" mt-3" as="span">{formatPhoneBrand(solicitation.form.phoneForm.brand)} - {solicitation.form.phoneForm.model}</Text>

              {solicitation.form.timePreference === 'urgent' && (
                <Text className={`text-${getTimePreferenceColor(solicitation.form.timePreference)}`} as="span">{formatTimePreference(solicitation.form.timePreference)}</Text>
              )}
              <Text className="text-white-dark" as="span">{dayjs(solicitation.createdAt).format('DD/MM/YYYY')}</Text>

            </div>
            <div className="flex flex-row w-[40%] gap-5 items-center">
              <Link rel="noopener noreferrer" to={`/store/solicitation/${solicitation.id}`} className="btn-outline-primary btn w-full flex flex-row gap-2">
                <IconArrowBackward />
                Detalhes do defeito
              </Link>
            </div>
          </div>

        </div >
      </div >
      <HSeparator className="mt-8" />
    </>
  )
}