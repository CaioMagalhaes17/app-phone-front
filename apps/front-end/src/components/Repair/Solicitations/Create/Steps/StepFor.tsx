
import { Button, IconPlus, IconSend, IconTrash, Text } from "@app/ui"
import { finalQuestions } from "../../../../../constants/solicitation-form-questions"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { SolicitationImgsModal } from "../images-modal/SolicitationImagesModal"
import { useState } from "react"
import Swal from "sweetalert2"

export function FinalsQuestions({ stepFourInfos, setActiveTab, onSubmit }: { stepFourInfos?: FieldValues, onSubmit: (data: FieldValues, images: string[]) => void, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
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
    await onSubmit(data, items);
  };

  const [items, setItems] = useState<string[]>([]);

  const removeImage = (index: number) => {
    Swal.fire({
      titleText: 'Excluir Imagem?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      padding: '2em',
      customClass: {
        confirmButton: 'btn btn-green btn-lg m-1',
        cancelButton: 'btn btn-danger btn-lg m-1',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
      }
    })
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
                  className="font-extrabold text-xl text-dark dark:text-white"
                  as="span"
                >
                  {finalQuestions[0].question}
                </Text>
                <select {...register(finalQuestions[0].questionId, { required: true })} defaultValue={stepFourInfos?.[finalQuestions[0].questionId] ? stepFourInfos[finalQuestions[0].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
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
                  className="font-extrabold text-xl text-dark dark:text-white"
                  as="span"
                >
                  {finalQuestions[1].question}
                </Text>
                <select {...register(finalQuestions[1].questionId, { required: true })} defaultValue={stepFourInfos?.[finalQuestions[1].questionId] ? stepFourInfos[finalQuestions[1].questionId] : 'default'} className="form-select rounded dark:bg-black form-select-lg text-dark dark:text-white w-full mt-1">
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
                  className="font-extrabold text-xl text-dark dark:text-white"
                  as="span"
                >
                  {finalQuestions[2].question}
                </Text>
                <textarea defaultValue={stepFourInfos?.[finalQuestions[2].questionId] ? stepFourInfos[finalQuestions[2].questionId] : ''} {...register(finalQuestions[2].questionId, { required: true })} placeholder="Sobrou algo para especificar? Conta pra gente!" className="placeholder:text-white-dark w-full mt-5 rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] dark:bg-[#121e32] text-white-dark focus:border-primary" />
              </div>
            </div>
            {errors[finalQuestions[2].questionId] && (<span className="text-danger">Campo Obrigatório</span>)}
            <div className="flex flex-col items-center justify-center">
              <Text className="text-lg font-extrabold dark:text-white text-dark" as="h1">Adicionar fotos do aparelho (não obrigatório)</Text>
              <div className="flex flex-row gap-5">
                {items.length > 0 && items.map((item, index) => (
                  <div key={index} onClick={() => removeImage(index)} className="relative group w-full">
                    <img src={item} className="w-[200px] h-[200px] cursor-pointer" />
                    <div className="w-[200px] h-[200px] rounded-3xl absolute inset-0 bg-dark bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-3xl font-bold flex flex-row gap-2 items-center"><IconTrash /> Excluir</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={() => document.getElementById('openModal')?.click()} type="button" className="btn-primary flex flex-row gap-2 mt-5"><IconPlus />Adicionar imagens</Button>
            </div>
            <div className="mt-auto" />
            <div className="flex p-6 flex-row justify-between w-full">
              <Button type="button" onClick={() => setActiveTab(4)} className="btn-primary">Voltar</Button>
              <Button type="submit" className="btn-primary flex flex-row gap-2"><IconSend /> Enviar orçamento</Button>
            </div>
          </div>
        </form>
      )}
      <SolicitationImgsModal setItems={setItems} items={items} />
    </>
  )
}