import { Button, Text } from "@app/ui"
import { phoneQuestions, samsungModels, xiaomiModels } from "../../../../../constants/solicitation-form-questions"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { AppleModelsSelect } from "../Phone-Details/AppleModelsSelect"
import { SearchModelsInput } from "../Phone-Details/SearchModelsInput"

export function StepThree({ setActiveTab, onSubmit, stepThreeInfos }: { stepThreeInfos?: FieldValues, onSubmit: (data: FieldValues) => void, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  const questions = phoneQuestions
  const { register, watch, handleSubmit, formState: { errors }, setError } = useForm()

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
    setActiveTab(4)
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
                <select {...register(questions[0].questionId, { required: true })} defaultValue={stepThreeInfos?.[questions[0].questionId] ? stepThreeInfos[questions[0].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
            </div>
            <div className="flex items-center !mb-10">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[1].question}
                </Text>
                {watch('phone-A') === 'phone-A-1' && (<AppleModelsSelect />)}
                {watch('phone-A') === 'phone-A-2' && (<SearchModelsInput brand={'Samsung'} phoneModels={samsungModels} />)}
                {watch('phone-A') === 'phone-A-3' && (<SearchModelsInput brand={'Xiaomi'} phoneModels={xiaomiModels} />)}
                {watch('phone-A') === 'phone-A-4' && (<SearchModelsInput brand={'Motorola'} phoneModels={samsungModels} />)}
                {watch('phone-A') === 'default' || !watch('phone-A') ? (
                  <>
                    <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                      <option value="default">Selecione</option>
                    </select>
                    {errors[questions[1].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
                  </>
                ) : ''}
              </div>
            </div>
            <div className="flex items-center !mb-10">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[2].question}
                </Text>
                <select {...register(questions[2].questionId, { required: true })} defaultValue={stepThreeInfos?.[questions[2].questionId] ? stepThreeInfos[questions[2].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
                <select {...register(questions[3].questionId, { required: true })} defaultValue={stepThreeInfos?.[questions[3].questionId] ? stepThreeInfos[questions[3].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
            <div className="flex items-center">
              <div className="flex-1 p-4">
                <Text
                  className="font-extrabold text-xl text-white"
                  as="span"
                >
                  {questions[4].question}
                </Text>
                <select {...register(questions[4].questionId, { required: true })} defaultValue={stepThreeInfos?.[questions[4].questionId] ? stepThreeInfos[questions[4].questionId] : 'default'} className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
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
            </div>
          </div>
        )}
        <div className="flex p-6 relative justify-between w-full">
          <Button type="button" onClick={() => setActiveTab(2)} className="btn-primary">Voltar</Button>
          <Button type="submit" className="btn-primary">Próximo</Button>
        </div>
      </form>
    </>
  )
}