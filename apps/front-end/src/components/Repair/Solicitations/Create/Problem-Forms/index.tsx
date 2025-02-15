import { Button, Text } from "@app/ui";
import { getQuestionsByTopic } from "../../../../../constants/solicitation-form-questions";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export function DefaultForm({ topicSelected, onSubmit, setActiveTab, stepTwoInfos }: {
  stepTwoInfos?: FieldValues, setActiveTab: React.Dispatch<React.SetStateAction<number>>, topicSelected: string, onSubmit: (data: FieldValues) => void
}) {
  const questions = getQuestionsByTopic(topicSelected)

  const { register, setError, handleSubmit, formState: { errors } } = useForm()

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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {questions && (
          <div className="mt-5">
            {/* Linha 1 */}
            <div className="flex items-center !mb-10">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[0].question}
                </Text>
                <select {...register(questions[0].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[0].questionId] ? stepTwoInfos[questions[0].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[1].question}
                </Text>
                <select {...register(questions[1].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[1].questionId] ? stepTwoInfos[questions[1].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
                    className="font-extrabold text-xl text-white"
                    as="span"
                  >
                    {questions[2].question}
                  </Text>
                  <select {...register(questions[2].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[2].questionId] ? stepTwoInfos[questions[2].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
                    className="font-extrabold text-xl text-white"
                    as="span"
                  >
                    {questions[3].question}
                  </Text>
                  <select {...register(questions[3].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[3].questionId] ? stepTwoInfos[questions[3].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
                    className="font-extrabold text-xl text-white"
                    as="span"
                  >
                    {questions[4].question}
                  </Text>
                  <select {...register(questions[4].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[4].questionId] ? stepTwoInfos[questions[4].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
                <div className="flex-1 p-4">
                  <Text
                    className="font-extrabold text-xl text-white"
                    as="span"
                  >
                    {questions[5].question}
                  </Text>
                  <select {...register(questions[5].questionId, { required: true })} defaultValue={stepTwoInfos?.[questions[5].questionId] ? stepTwoInfos[questions[5].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
              </div>
            )}
          </div>
        )}
        <div className="flex p-6 relative justify-between w-full mt-[100px]">
          <Button onClick={() => setActiveTab(1)} className="btn-primary">Voltar</Button>
          <Button type="submit" className="btn-primary">Próximo</Button>
        </div>
      </form>
    </>
  )
}