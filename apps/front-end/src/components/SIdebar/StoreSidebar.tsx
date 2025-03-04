import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, IconBill, IconChat, IconDollarSignCircle, IconHelpCircle, IconHome, IconMap, IconPencil, IconShoppingBag, IconSmartphone, IconStore, IconStreetMap, Text } from "@app/ui"
import { Link, useNavigate } from "react-router-dom"
import useStore from "../../state"

export function StoreSidebar() {
  const { storeInfos } = useStore()
  const navigate = useNavigate()
  return (
    <>
      <Link to='/store/home' className="font-bold hover:underline text-lg cursor-pointer text-black dark:text-white flex flex-row gap-5 mb-4">
        <IconHome />
        Início
      </Link>
      <Text as="span" onClick={() => navigate('/store/market')} className="font-extrabold hover:underline text-lg cursor-pointer text-black dark:text-white flex flex-row gap-5 mt-7 mb-5">
        <IconShoppingBag />
        Seu Mercado
      </Text>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-black dark:text-white text-lg flex flex-row font-extrabold">
            <div className="flex flex-row gap-5">
              <IconStore />Sua Loja
            </div>
          </AccordionTrigger>

          <AccordionContent className="hover:text-white">
            <Link to='/store/profile' className="flex flex-row gap-2 items-center font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg ml-5">
              <IconStore />
              Perfil
            </Link>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <Link to='/store/profile/edit' className="flex flex-row gap-2 items-center font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg ml-5 ">
              <IconPencil />
              Editar perfil
            </Link>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <Link to={`/store-feedbacks/${storeInfos.id}`} className="flex flex-row gap-2 items-center font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg ml-5">
              <IconChat />
              Avaliações
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mb-2 text-black dark:text-white text-lg font-extrabold">
            <div className="flex flex-row gap-5">
              <IconSmartphone />
              Retornar Orçamentos
            </div>
          </AccordionTrigger>
          <AccordionContent className="hover:text-white">
            <Link to='/store/avaliable/solicitations' className="ml-5 items-center font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg flex flex-row gap-2">
              <IconBill />
              Lista de Defeitos
            </Link>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <Link to='/store/budget/list' className="ml-5 items-center font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg  flex flex-row gap-2">
              <IconDollarSignCircle />
              Histórico de Orçamentos
            </Link>
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
            <Link to='/store/map/edit' className="flex flex-row gap-2 items-center font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg ml-5">
              <IconMap />
              Localização pelo mapa
            </Link>
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
            <button className="ml-5 font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg">
              Como funciona
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg">
              Suporte
            </button>
          </AccordionContent>
          <AccordionContent className="hover:text-white">
            <button className="ml-5 font-bold text-dark dark:text-[#c4c4c4] hover:underline text-lg">
              Relatar erro
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}