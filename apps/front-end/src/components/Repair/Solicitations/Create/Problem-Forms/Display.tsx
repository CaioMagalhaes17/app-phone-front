import { Button, Text } from "@app/ui";
import { getQuestionsByTopic } from "../../../../../constants/solicitation-form-questions";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export function DisplayForm({ onSubmit, setActiveTab, stepTwoInfos }: { stepTwoInfos?: FieldValues, onSubmit: (data: FieldValues) => void, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  const questions = getQuestionsByTopic('display')
  const [optionalField, setOptionalField] = useState(false)
  const { register, watch, formState: { errors }, setError, handleSubmit } = useForm()
  useEffect(() => {
    if (watch('display-E') === 'display-E-1') return setOptionalField(true)
    if (watch('display-E') === 'display-E-2' || watch('display-E') === 'display-E-3' || watch('display-E') === 'default') return setOptionalField(false)
  }, [watch()])

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
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
    onSubmit(data);
    setActiveTab(3)
  };

  return (
    <>
      {questions && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-5">
            {/* Linha 1 */}
            <div className="flex items-center !mb-10">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-dark dark:text-white"
                  as="span"
                >
                  {questions[0].question}
                </Text>
                <select {...register(questions[0].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[0].questionId] ? stepTwoInfos[questions[0].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-white w-full mt-1">
                  <option value="default">Selecione</option>
                  {questions[0].options.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item.optionId}>{item.text}</option>
                      </>
                    )
                  })}
                </select>
                {errors[questions[0].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
              </div>
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-dark dark:text-white"
                  as="span"
                >
                  {questions[1].question}
                </Text>
                <select {...register(questions[1].questionId)} defaultValue={stepTwoInfos?.[questions[1].questionId] ? stepTwoInfos[questions[1].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
                  <option value="default">Selecione</option>
                  {questions[1].options.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item.optionId}>{item.text}</option>
                      </>
                    )
                  })}
                </select>
                {errors[questions[1].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
              </div>
            </div>
            {/* Linha 2 */}
            {questions.length >= 3 && (
              <div className="flex items-center !mb-10">
                <div className="flex-1 p-4">
                  <Text
                    className="font-extrabold text-xl text-dark dark:text-white"
                    as="span"
                  >
                    {questions[2].question}
                  </Text>
                  <select {...register(questions[2].questionId)} defaultValue={stepTwoInfos?.[questions[2].questionId] ? stepTwoInfos[questions[2].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[2].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
                        </>
                      )
                    })}
                  </select>
                  {errors[questions[2].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
                </div>
                <div className="flex-1 p-4">
                  <Text
                    className="font-extrabold text-xl text-dark dark:text-white"
                    as="span"
                  >
                    {questions[3].question}
                  </Text>
                  <select {...register(questions[3].questionId)} defaultValue={stepTwoInfos?.[questions[3].questionId] ? stepTwoInfos[questions[3].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[3].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
                        </>
                      )
                    })}
                  </select>
                  {errors[questions[3].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}

                </div>
              </div>
            )}

            {/* Linha 3 */}
            {questions.length >= 5 && (
              <div className="flex items-center">
                <div className="flex-1 p-4">
                  <Text
                    className="font-extrabold text-xl text-dark dark:text-white"
                    as="span"
                  >
                    {questions[4].question}
                  </Text>
                  <select {...register(questions[4].questionId)} defaultValue={stepTwoInfos?.[questions[4].questionId] ? stepTwoInfos[questions[4].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
                    <option value="default">Selecione</option>
                    {questions[4].options.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.optionId}>{item.text}</option>
                        </>
                      )
                    })}
                  </select>
                  {errors[questions[4].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}

                </div>
                {optionalField && (
                  <div className="flex-1 p-4">
                    <Text
                      className="font-extrabold text-xl text-dark dark:text-white"
                      as="span"
                    >
                      {questions[5].question}
                    </Text>
                    <select {...register(questions[5].questionId)} defaultValue={stepTwoInfos?.[questions[5].questionId] ? stepTwoInfos[questions[5].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
                      <option value="default">Selecione</option>
                      {questions[5].options.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item.optionId}>{item.text}</option>
                          </>
                        )
                      })}
                    </select>
                    {errors[questions[5].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}

                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex p-6 relative justify-between mt-[100px] w-full">
            <Button onClick={() => setActiveTab(1)} className="btn-primary">Voltar</Button>
            <Button type="submit" className="btn-primary">Próximo</Button>
          </div>
        </form>
      )}
    </>
  )
}