import { Button, HSeparator, IconHelpCircle, IconPlus, IconTrash, Panel, Text } from "@app/ui"
import { finalQuestions } from "../../../../constants/solicitation-form-questions"

import Swal from "sweetalert2";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { SolicitationImgsModal } from "../Create/images-modal/SolicitationImagesModal";

export function FinalForm({ errors, register, solicitationImgs, setSolicitationImgs }: { solicitationImgs: string[], setSolicitationImgs: React.Dispatch<React.SetStateAction<string[]>>, errors: FieldErrors<FieldValues>, register: UseFormRegister<FieldValues> }) {
  const questions = finalQuestions
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
        setSolicitationImgs((prevItems) => prevItems.filter((_, i) => i !== index));
      }
    })
  };
  return (
    <>
      <Panel className="sombra p-4 rounded-xl bg-white dark:bg-black w-full">
        <Text className="text-3xl text-dark dark:text-white flex flex-row gap-5 items-center" as="h1"><IconHelpCircle className="h-[40px] w-[40px]" />Perguntas Finais</Text>
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
                        <select {...register(question.questionId, { required: true })} className="text-dark dark:bg-black dark:text-white">
                          <option value="">Escolher</option>
                          {question.options.map((option) => {
                            return (
                              <option className="text-dark dark:bg-dark dark:text-white" value={option.optionId}>{option.text}</option>
                            )
                          })}
                        </select>
                      ) : (
                        <textarea {...register(question.questionId, { required: true })} placeholder="Sobrou algo para especificar? Conta pra gente!" className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] dark:bg-[#121e32] text-white-dark focus:border-primary" />
                      )
                    }

                    {errors[question.questionId] && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                  </div>
                </>
              )
            })
          }
          <HSeparator />
          <div className="flex flex-col items-center justify-center">
            <Text className="text-lg font-extrabold dark:text-white text-dark" as="h1">Adicionar fotos do aparelho (não obrigatório)</Text>
            <div className="flex flex-row gap-5">
              {solicitationImgs.length > 0 && solicitationImgs.map((item, index) => (
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
        </div>
      </Panel>
      <SolicitationImgsModal setItems={setSolicitationImgs} items={solicitationImgs} />

    </>
  )
}