import { Button, Text } from "@app/ui"
import { finalQuestions } from "../../../../../constants/solicitation-form-questions"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

export function StepFor({ stepFourInfos, setActiveTab, onSubmit }: { stepFourInfos?: FieldValues, onSubmit: (data: FieldValues) => void, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm()

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    let hasError: boolean = false
    Object.entries(data).forEach(([key, value]) => {
      if (value === "default") {
        setError(key as keyof FieldValues, {
          type: "manual",
          message: "Esse valor não é permitido",
        });
        hasError = true
      }
    });
    if (hasError) return
    await onSubmit(data);
  };

  return (
    <>
      {finalQuestions && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-5">
            {/* Linha 1 */}
            <div className="flex items-center !mb-10">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {finalQuestions[0].question}
                </Text>
                <select {...register(finalQuestions[0].questionId, { required: true })} defaultValue={stepFourInfos?.[finalQuestions[0].questionId] ? stepFourInfos[finalQuestions[0].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option value="default">Selecione</option>
                  {finalQuestions[0].options.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item.optionId}>{item.text}</option>
                      </>
                    )
                  })}
                </select>
                {errors[finalQuestions[0].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}

              </div>
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {finalQuestions[1].question}
                </Text>
                <select {...register(finalQuestions[1].questionId, { required: true })} defaultValue={stepFourInfos?.[finalQuestions[1].questionId] ? stepFourInfos[finalQuestions[1].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                  <option value="default">Selecione</option>
                  {finalQuestions[1].options.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item.optionId}>{item.text}</option>
                      </>
                    )
                  })}
                </select>
                {errors[finalQuestions[1].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {finalQuestions[2].question}
                </Text>
                <textarea defaultValue={stepFourInfos?.[finalQuestions[2].questionId] ? stepFourInfos[finalQuestions[2].questionId] : ''} {...register(finalQuestions[2].questionId, { required: true })} placeholder="Sobrou algo para especificar? Conta pra gente!" className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
              </div>

            </div>
            {errors[finalQuestions[2].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
            <div className="flex p-6 relative justify-between w-full">
              <Button type="button" onClick={() => setActiveTab(4)} className="btn-primary">Voltar</Button>
              <Button type="submit" className="btn-primary">Enviar orçamento</Button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}