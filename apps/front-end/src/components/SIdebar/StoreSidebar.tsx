import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, IconBill, IconDollarSignCircle, IconHelpCircle, IconHome, IconPencil, IconSmartphone, IconStore, IconStreetMap, Text } from "@app/ui"
import { useNavigate } from "react-router-dom"

export function StoreSidebar() {
  const navigate = useNavigate()
  return (
    <>
      <Text as="span" onClick={() => navigate('/store')} className="font-bold hover:underline text-lg cursor-pointer text-white flex flex-row gap-5">
        <IconHome />
        Início
      </Text>
      <div className="border-b border-b-[#323b45] mt-5" />
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-white text-lg font-extrabold">
            <div className="flex flex-row gap-5">
              <IconSmartphone />
              Reparo de celular
            </div>
          </AccordionTrigger>
          <AccordionContent className="hover:text-white">
            <button onClick={() => navigate('/store/avaliable/solicitations')} className="ml-5 items-center font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2">
              <IconBill />
              Lista de defeitos
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button onClick={() => navigate('/store/budget/list')} className="ml-5 items-center font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2">
              <IconDollarSignCircle />
              Orçamentos Enviados
            </button>
          </AccordionContent>

        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-white text-lg flex flex-row font-extrabold">
            <div className="flex flex-row gap-5">
              <IconStore />Perfil da loja
            </div>
          </AccordionTrigger>

          <AccordionContent className="hover:text-white">
            <button onClick={() => navigate('/store/profile')} className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconStore />
              Detalhes perfil
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button onClick={() => navigate('/map')} className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconPencil />
              Editar perfil
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-white text-lg flex flex-row font-extrabold">
            <div className="flex flex-row gap-5">
              <IconStreetMap />Mapa
            </div>
          </AccordionTrigger>

          <AccordionContent className="hover:text-white">
            <button onClick={() => navigate('/store/map/edit')} className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconPencil />
              Editar localização da loja
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-white text-lg font-extrabold">
            <div className="flex flex-row gap-5">
              <IconHelpCircle />
              Ajuda
            </div>
          </AccordionTrigger>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
              Como funciona
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
              Suporte
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
              Relatar erro
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}