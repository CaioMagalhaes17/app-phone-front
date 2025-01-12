import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Text } from "@app/ui"
import useStore from "../../state"
import { Link } from "react-router-dom"

export function SidebarController() {
  const { userInfos } = useStore()

  function getSidebarItems() {
    if (userInfos.isStore === false) return getClientItems()
  }

  function getClientItems() {
    return (
      <>
        <Text as="span" className="font-bold hover:underline text-lg text-white"> Início (Mapa) </Text>
        <div className="border-b border-b-[#323b45] mt-5" />
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger className="mb-2 text-white text-lg font-extrabold">Reparo de celular</AccordionTrigger>
            <AccordionContent className="hover:text-white">
              <button className="font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
                Solicitar Orçamento
              </button>
            </AccordionContent>
            <AccordionContent className="">
              <button className="font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
                Orçamentos Recebidos
              </button>
            </AccordionContent>
            <AccordionContent className="hover:text-white">
              <button className="font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
                Minhas Solicitações
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger className="mb-2 text-white text-lg font-extrabold">Ajuda</AccordionTrigger>
            <AccordionContent className="hover:text-white">
              <button className="font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
                Como funciona
              </button>
            </AccordionContent>
            <AccordionContent className="hover:text-white">
              <button className="font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
                Suporte
              </button>
            </AccordionContent>
            <AccordionContent className="hover:text-white">
              <button className="font-bold hover:text-white hover:underline text-lg text-[#c4c4c4]">
                Relatar erro
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  }

  return { getSidebarItems }
}