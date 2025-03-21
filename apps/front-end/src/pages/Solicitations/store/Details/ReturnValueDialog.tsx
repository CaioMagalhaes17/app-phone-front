import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconDollarSignCircle, IconSend, Input, Text } from "@app/ui";
import { useState } from "react";
import { formatCurrency } from "../../../../utils/currency-formatter";
import { FieldValues, useForm } from "react-hook-form";

export function ReturnBudget({ handleSave }: { handleSave: ({ startValue, endValue, details }: { startValue: string, estimatedTime: string, endValue: string, details: string }) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [startValue, setStartValue] = useState('')
  const [endValue, setEndValue] = useState('')
  const [valuesError, setValuesError] = useState('')

  function onSubmit(data: FieldValues) {
    if (startValue === '' || endValue === '') return setValuesError('Campo Obrigatório!')
    const numberStartValue = parseFloat(startValue.replace(/[^\d,]/g, '').replace(',', '.'));
    const numberEndValue = parseFloat(endValue.replace(/[^\d,]/g, '').replace(',', '.'));
    if (numberStartValue > numberEndValue) return setValuesError('O valor inicial não pode ser maior que o final!')
    handleSave({ details: data.details, startValue, endValue, estimatedTime: data.estimatedTime })
  }

  const estimatedTimeOptions = [
    'No mesmo dia',
    'Entre um ou dois dias',
    'Mais de três dias'
  ]

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button id="openModal" className="btn-green text-white text-lg flex flex-row gap-2"><IconDollarSignCircle /> Retornar valor de conserto</Button>
        </DialogTrigger>
        <DialogContent className=" !z-51 font-extrabold bg-dark text-white-dark w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogClose id="closeModal" className="hidden" />
            <DialogHeader>
              <DialogTitle className="font-extrabold text-white text-2xl">Retornar valor para reparo de celular</DialogTitle>
              <DialogDescription className="text-[#888EA8]">
                O orçamento não pode ser editado.
              </DialogDescription>
            </DialogHeader>
            <div className="gap-2 mt-5 flex flex-row">
              <div>
                <Text as="span">De:</Text>
                <Input value={startValue} onChange={(e) => setStartValue(formatCurrency(e.target.value))} type="text" />
              </div>
              <div>
                <Text as="span">Até:</Text>
                <Input value={endValue} onChange={(e) => setEndValue(formatCurrency(e.target.value))} type="text" />
              </div>
            </div>
            {valuesError && (<p className="font-bold text-danger text-left">{valuesError}</p>)}
            <div className="mt-5">
              <Text as="span">Tempo Estimado para conclusão do serviço: (Obrigatório)</Text>
              <select className="form-select rounded dark:bg-dark form-select-lg text-dark dark:text-white w-full" {...register('estimatedTime')}>
                {estimatedTimeOptions.map((option) => (
                  <option value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.estimatedTime && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
            </div>
            <div className="mt-5">
              <Text as="span">Observações: (Opcional)</Text>
              <textarea {...register('details')} className="placeholder:text-white-dark w-full rounded-md border text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
            </div>
            <DialogFooter>
              <Button type="submit" className="btn-primary flex flex-row gap-2"><IconSend />Enviar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}