import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, IconBill, IconChat, IconDollarSignCircle, IconHelpCircle, IconHome, IconPencil, IconSmartphone, IconStore, IconStreetMap } from "@app/ui"
import { Link } from "react-router-dom"

export function StoreSidebar() {
  return (
    <>
      <Link to='/store' className="font-bold hover:underline text-lg cursor-pointer text-white flex flex-row gap-5">
        <IconHome />
        Início
      </Link>
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
            <Link to='/store/avaliable/solicitations' className="ml-5 items-center font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2">
              <IconBill />
              Lista de defeitos
            </Link>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <Link to='/store/budget/list' className="ml-5 items-center font-bold hover:text-white hover:underline text-lg text-[#c4c4c4] flex flex-row gap-2">
              <IconDollarSignCircle />
              Orçamentos Enviados
            </Link>
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
            <Link to='/store/profile' className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconStore />
              Detalhes perfil
            </Link>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <Link to='/store/profile/edit' className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconPencil />
              Editar perfil
            </Link>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <Link to='/store/feedbacks/123' className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconChat />
              Avaliações
            </Link>
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
            <Link to='/store/map/edit' className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
              <IconPencil />
              Editar localização da loja
            </Link>
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