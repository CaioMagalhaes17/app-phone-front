import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, IconDollarSignCircle, IconSend, Input, Text } from "@app/ui";
import { useState } from "react";

export function ReturnBudget({ onSaveClick }: { onSaveClick: ({ startValue, endValue, details }: { startValue: string, endValue: string, details: string }) => void }) {
  const [startValue, setStartValue] = useState('')
  const [endValue, setEndValue] = useState('')
  const [details, setDetails] = useState('')

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(Number(numericValue) / 100);

    return formattedValue;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button id="openModal" className="btn-success !text-dark text-lg flex flex-row gap-2"><IconDollarSignCircle /> Retornar valor de conserto</Button>
        </DialogTrigger>
        <DialogContent className=" !z-51 font-extrabold bg-dark text-white-dark w-full">
          <DialogClose id="closeModal" className="hidden" />
          <DialogHeader>
            <DialogTitle className="font-extrabold text-white text-2xl">Retornar valor para reparo de celular</DialogTitle>
            <DialogDescription className="text-[#888EA8]">
              O orçamento não pode ser editado.
            </DialogDescription>
          </DialogHeader>
          <div className="gap-2 flex flex-row">
            <div>
              <Text as="span">De:</Text>
              <Input value={startValue} onChange={(e) => setStartValue(formatCurrency(e.target.value))} type="text" />
            </div>
            <div>
              <Text as="span">Até:</Text>
              <Input value={endValue} onChange={(e) => setEndValue(formatCurrency(e.target.value))} type="text" />
            </div>
          </div>
          <div>
            <Text as="span">Observações:</Text>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="placeholder:text-white-dark w-full rounded-md border text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary" />
          </div>
          <DialogFooter>
            <Button className="btn-primary flex flex-row gap-2" onClick={() => onSaveClick({ startValue, endValue, details })}><IconSend />Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}