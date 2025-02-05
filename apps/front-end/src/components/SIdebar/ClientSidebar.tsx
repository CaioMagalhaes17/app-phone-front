import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, IconBill, IconHelpCircle, IconHome, IconPencil, IconSearch, IconSend, IconSmartphone, IconStreetMap, IconUser, Text } from "@app/ui"
import { useNavigate } from "react-router-dom"

export function ClientSidebar() {
  const navigate = useNavigate()
  return (
    <>
      <Text as="span" onClick={() => navigate('/')} className="font-bold hover:underline text-lg cursor-pointer text-white flex flex-row gap-5">
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
            <button onClick={() => navigate('/solicitations/create')} className="ml-5 font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2">
              <IconSend />
              Solicitar Orçamento
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2">
              <IconBill />
              Orçamentos Recebidos
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button onClick={() => navigate('/solicitations')} className="ml-5 font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2 items-center">
              <IconUser />
              Minhas Solicitações
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
            <button onClick={() => navigate('/map')} className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconSearch />
              Lojas Próximas
            </button>
          </AccordionContent>
          <AccordionContent className="">
            <button onClick={() => navigate('/map/edit')} className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline ml-5 text-lg text-[#c4c4c4]">
              <IconPencil />
              Editar localização
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