import { HSeparator, IconHelpCircle, Panel, Text } from "@app/ui";
import { getTopicFormatted } from "../../../../constants/solicitation-form-questions";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { convertNumbertToLetter } from "../../../../utils/convert-number-to-letter";
import Swal from "sweetalert2";

export function ProblemForm({ errors, topic, questions, register }: { errors: FieldErrors<FieldValues>, register: UseFormRegister<FieldValues>, topic: string, questions: { question: string, options: { optionId: string, text: string }[] }[] }) {
  function handleFormClick() {
    console.log('return neggr')
    if (topic === '') {
      Swal.fire({
        icon: 'info',
        title: 'Selecione um tópico antes'
      })
    }
  }
  return (
    <>
      <Panel onClick={() => handleFormClick()} className={`sombra p-4 rounded-xl bg-white dark:bg-black w-full`}>
        <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconHelpCircle className="w-[40px] h-[40px]" />Sobre o defeito - {getTopicFormatted(topic)}</Text>
        <HSeparator className="mt-2 mb-2" />
        <div className={`${topic === '' ? 'pointer-events-none blur' : ''} flex flex-col gap-5 mb-5 `}>
          {questions.length > 0 && questions.map((item, i) => {
            return (
              <>
                <div className="flex flex-col">
                  <Text className="text-dark dark:text-white text-xl" as="span">{item.question}</Text>
                  <select {...register(topic + '-' + convertNumbertToLetter(i), { required: true })} className="text-dark dark:text-white dark:bg-black">
                    <option value="">Escolher</option>
                    {item.options.map((option) => {
                      return (
                        <option className="text-dark dark:text-white dark:bg-dark" value={option.optionId}>{option.text}</option>
                      )
                    })}
                  </select>
                  {errors[topic + '-' + convertNumbertToLetter(i)] && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                </div>
              </>
            )
          })}
        </div>
      </Panel>
    </>
  )
}