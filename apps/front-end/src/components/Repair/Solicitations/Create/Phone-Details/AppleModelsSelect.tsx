import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { appleModels } from "../../../../../constants/solicitation-form-questions"

export function AppleModelsSelect({ register, questionId, errors, modelInputValue }: { modelInputValue?: string, errors: FieldErrors<FieldValues>, questionId: string, register: UseFormRegister<FieldValues> }) {
  return (
    <>
      <select {...register(questionId, { required: true })} className="form-select rounded bg-black form-select-lg text-white w-full mt-1" defaultValue={modelInputValue ? modelInputValue : 'default'}>
        {appleModels.map((item, index) => {
          return (
            <>
              <option key={index} value={item}>{item}</option>
            </>
          )
        })}
      </select>
      {errors.questionId && (<span className="text-danger">Campo Obrigatório</span>)}
    </>
  )
}