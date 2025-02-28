import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, IconBill, IconChat, IconDollarSignCircle, IconHelpCircle, IconHome, IconMap, IconPencil, IconSmartphone, IconStore, IconStreetMap } from "@app/ui"
import { Link } from "react-router-dom"
import useStore from "../../state"

export function StoreSidebar() {
  const { storeInfos } = useStore()
  return (
    <>
      <Link to='/store/home' className="font-bold hover:underline text-lg cursor-pointer text-white flex flex-row gap-5 mb-4">
        <IconHome />
        Início
      </Link>
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
              Histórico de orçamentos
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
            <Link to={`/store-feedbacks/${storeInfos.id}`} className="flex flex-row gap-2 items-center font-bold hover:text-white hover:underline text-lg ml-5 text-[#c4c4c4]">
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
              <IconMap />
              Localização pelo mapa
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