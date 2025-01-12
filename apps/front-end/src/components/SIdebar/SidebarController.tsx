import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from "@app/ui"
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
        <div className="w-full flex items-center">
          <Button className="btn-black hover:underline text-lg font-extrabold text-white">
            Solicitar Orçamento
          </Button>
        </div>
        <div className="border-b border-b-[#323b45] mb-5 mt-5" />
        <Link to="client/budgets" className="hover:underline text-white text-lg font-extrabold" >Orçamentos Recebidos</Link>
        <div className="border-b border-b-[#323b45] mb-5 mt-5" />
        <Link to="client/solicitations" className="hover:underline text-white text-lg font-extrabold" >Minhas Solicitações</Link>
        <div className="border-b border-b-[#323b45] mb-3 mt-5" />
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger className="mb-2 text-white text-lg font-extrabold">Ajuda</AccordionTrigger>
            <AccordionContent className="hover:text-white">
              <button className="font-bold">
                Como funciona
              </button>
            </AccordionContent>
            <AccordionContent className="hover:text-white">
              <button className="font-bold">
                Suporte
              </button>
            </AccordionContent>
            <AccordionContent className="hover:text-white">
              <button className="font-bold">
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