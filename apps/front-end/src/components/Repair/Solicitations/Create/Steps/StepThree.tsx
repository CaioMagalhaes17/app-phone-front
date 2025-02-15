import { Button, Text } from "@app/ui"
import { phoneQuestions, samsungModels } from "../../../../../constants/solicitation-form-questions"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { AppleModelsSelect } from "../Phone-Details/AppleModelsSelect"
import { SearchModelsInput } from "../Phone-Details/SearchModelsInput"
import { useState } from "react"

export function PhoneFormStep({ setActiveTab, onSubmit, stepThreeInfos }: { stepThreeInfos?: FieldValues, onSubmit: (data: FieldValues) => void, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  const questions = phoneQuestions
  const { register, watch, handleSubmit, formState: { errors }, setError } = useForm()
  const [searchModel, setSearchModel] = useState("");
  const [searchInputError, setSearchInputError] = useState(false)

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    let hasError: boolean = false

    if (searchModel === '') {
      if (stepThreeInfos?.brand && stepThreeInfos?.brand !== 'apple') {
        setSearchInputError(true)
        hasError = true
      } else if (watch('brand') && watch('brand') !== 'apple') {
        setSearchInputError(true)
        hasError = true
      }
    }

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
    setSearchInputError(false)
    if (searchModel && watch('brand') && watch('brand') !== 'apple') {
      onSubmit({
        ...data,
        'model': searchModel,
      });
    } else {
      onSubmit(data)
    }

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

                {watch('brand') ? (
                  <>
                    {watch('brand') === 'apple' ? (<AppleModelsSelect errors={errors} register={register} questionId={questions[1].questionId} />) : ''}
                    {watch('brand') === 'samsung' ? (<SearchModelsInput searchInputError={searchInputError} searchModel={searchModel} setSearchModel={setSearchModel} brand={'Samsung'} phoneModels={samsungModels} />) : ''}
                  </>
                ) : (
                  <>
                    {stepThreeInfos?.['brand'] === 'apple' ? (<AppleModelsSelect modelInputValue={stepThreeInfos[questions[1].questionId]} errors={errors} register={register} questionId={questions[1].questionId} />) : ''}
                    {stepThreeInfos?.['brand'] === 'samsung' ? (<SearchModelsInput searchInputError={searchInputError} searchedValue={stepThreeInfos[questions[1].questionId]} searchModel={searchModel} setSearchModel={setSearchModel} brand={'Samsung'} phoneModels={samsungModels} />) : ''}
                  </>
                )}

                {
                  watch('brand') === 'default' && (
                    <>
                      <select className="form-select rounded bg-black form-select-lg text-white w-full mt-1">
                        <option value="default">Selecione</option>
                      </select>
                      {errors[questions[0].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
                    </>
                  )
                }

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