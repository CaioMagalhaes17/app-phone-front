import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, IconBill, IconHelpCircle, IconHome, IconPencil, IconSearch, IconSend, IconShoppingBag, IconSmartphone, IconStreetMap, IconUser, Text } from "@app/ui"
import { Link, useNavigate } from "react-router-dom"

export function ClientSidebar() {
  const navigate = useNavigate()
  return (
    <>
      <Text as="span" onClick={() => navigate('/dashboard')} className="font-extrabold hover:underline text-lg cursor-pointer text-black dark:text-white flex flex-row gap-5 mb-5">
        <IconHome />
        Início
      </Text>
      <Link to='/market' className="font-extrabold hover:underline text-lg cursor-pointer text-black dark:text-white flex flex-row gap-5 mt-7 mb-5">
        <IconShoppingBag />
        Mercado
      </Link>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 dark:text-white text-black text-lg font-extrabold">
            <div className="flex flex-row gap-5">
              <IconSmartphone />
              Reparo de celular
            </div>
          </AccordionTrigger>
          <AccordionContent className="hover:text-black dark:hover:text-white">
            <button onClick={() => navigate('/solicitations/create')} className="ml-5 font-bold hover:underline text-lg text-dark dark:text-[#c4c4c4] flex flex-row gap-2">
              <IconSend />
              Solicitar Orçamento
            </button>
          </AccordionContent>
          <AccordionContent className="text-black dark:text-white">
            <Link to="/budgets/list" className="ml-5 font-bold hover:underline text-lg dark:text-[#c4c4c4] text-dark flex flex-row gap-2">
              <IconBill />
              Orçamentos Recebidos
            </Link>
          </AccordionContent>
          <AccordionContent className="text-black dark:text-white">
            <button onClick={() => navigate('/solicitations')} className="ml-5 font-bold dark:text-[#c4c4c4] text-dark hover:underline text-lg flex flex-row gap-2 items-center">
              <IconUser />
              Minhas Solicitações
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-black dark:text-white text-lg flex flex-row font-extrabold">
            <div className="flex flex-row gap-5">
              <IconStreetMap />Mapa
            </div>
          </AccordionTrigger>

          <AccordionContent className="hover:text-white">
            <Link to='/map' className="flex flex-row gap-2 dark:text-[#c4c4c4] text-dark items-center font-bold hover:underline text-lg ml-5">
              <IconSearch />
              Lojas Próximas
            </Link>
          </AccordionContent>
          <AccordionContent className="">
            <button onClick={() => navigate('/map/edit')} className="flex flex-row gap-2 items-center font-bold dark:text-[#c4c4c4] text-dark hover:underline ml-5 text-lg">
              <IconPencil />
              Editar localização
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-black dark:text-white text-lg font-extrabold">
            <div className="flex flex-row gap-5">
              <IconHelpCircle />
              Ajuda
            </div>
          </AccordionTrigger>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold dark:text-[#c4c4c4] text-dark hover:underline text-lg">
              Como funciona
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold dark:text-[#c4c4c4] text-dark hover:underline text-lg">
              Suporte
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold dark:text-[#c4c4c4] text-dark hover:underline text-lg">
              Relatar erro
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}