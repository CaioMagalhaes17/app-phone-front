import { HSeparator, IconPhone, Panel, Text } from "@app/ui"
import { phoneQuestions, samsungModels } from "../../../../constants/solicitation-form-questions"
import { AppleModelsSelect } from "../Create/Phone-Details/AppleModelsSelect"
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { SearchModelsInput } from "../Create/Phone-Details/SearchModelsInput"
import { useState } from "react"
import { PhoneFormType } from "../../../../types/solicitation"

export function PhoneForm({ defaultValue, register, errors, watch, setValue, }: { defaultValue?: PhoneFormType, setValue: UseFormSetValue<FieldValues>, register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, watch: UseFormWatch<FieldValues> }) {
  const questions = phoneQuestions
  const [searchModel, setSearchModel] = useState("");
  return (
    <Panel className="sombra p-4 rounded-xl bg-white dark:bg-black w-full">
      <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconPhone width="40px" height="40px" />Sobre o telefone</Text>
      <HSeparator className="mt-2 mb-2" />
      <div className="flex flex-col gap-5 mb-5">
        {
          questions.map((question) => {
            return (
              <>
                <div className="flex flex-col">
                  <Text className="text-dark dark:text-white text-xl" as="span">{question.question}</Text>
                  {
                    question.options.length > 0 ? (
                      <select defaultValue={defaultValue && defaultValue[question.questionId]} {...register(question.questionId, { required: true })} className="text-dark dark:bg-black dark:text-white">
                        <option value="">Escolher</option>
                        {question.options.map((option) => {
                          return (
                            <option className="text-dark dark:bg-dark dark:text-white" value={option.optionId}>{option.text}</option>
                          )
                        })}
                      </select>
                    ) : (
                      <>
                        {watch('brand') === 'apple' && (<AppleModelsSelect errors={errors} register={register} questionId={questions[1].questionId} />)}
                        {watch('brand') === 'samsung' && (<SearchModelsInput setValue={setValue} errors={errors} register={register} searchModel={searchModel} setSearchModel={setSearchModel} brand={'Samsung'} phoneModels={samsungModels} />)}
                      </>
                    )
                  }
                  {errors[question.questionId] || errors.model ? (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>) : ''}

                </div>
              </>
            )
          })
        }
      </div>
    </Panel>
  )
}