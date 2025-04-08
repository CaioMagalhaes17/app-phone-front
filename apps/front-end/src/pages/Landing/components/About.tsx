import { IconThreeDots, IconWhatsApp, Panel, Text } from "@app/ui";

export function About() {
  return (
    <>
      <Panel className="dark:!bg-[#060818] font-bold flex flex-col items-center justify-center !shadow-none">
        <div id="about" className="mb-5 max-w-[1200px] w-full">
          <Text className="text-2xl text-dark dark:text-white flex flex-row items-center gap-5" as="h1"><IconThreeDots />Sobre nós</Text>
          <div className="flex flex-col p-4">
            <Text className="text-lg dark:text-white-dark text-dark" as="span">O Ponto dos celulares nasceu da minha própria necessidade. Meu nome é Caio Magalhães de Faria, sou o fundador e desenvolvedor deste projeto, e tudo começou quando eu ainda estava na escola.</Text>
            <Text className="text-lg dark:text-white-dark text-dark mt-5" as="span">Tive um problema com meu celular e não fazia ideia de quanto custaria o conserto. Além disso, minha rotina era corrida, eu não tinha tempo para ir de loja em loja buscando orçamentos, e, sem um celular funcionando, também não conseguia entrar em contato com as assistências.</Text>
            <Text className="text-lg dark:text-white-dark text-dark mt-5" as="span">Foi nesse momento que surgiu a ideia: um site que facilitasse esse processo. Um lugar onde qualquer pessoa pudesse descrever o problema do seu celular apenas uma vez e, com poucos cliques, comparar orçamentos e escolher a melhor opção.</Text>
            <Text className="text-lg dark:text-white-dark text-dark mt-5" as="span">Nosso objetivo é simplificar sua vida, economizar seu tempo e garantir que você tenha acesso às melhores opções para o seu reparo.</Text>
            <Text className="text-lg dark:text-white text-black mt-10" as="span">Se quiser saber mais, entre em contato:</Text>
            <Text className="text-lg dark:text-white text-black " as="span">📧 Email: <Text as="span" className="text-gray-600">caiomagalhaesdefaria@hotmail.com</Text></Text>
            <Text className="text-lg dark:text-white text-black  flex flex-row gap-2 items-center" as="span"><IconWhatsApp />WhatsApp: <Text as="span" className="text-gray-600">(31) 99585-3806 </Text></Text>
          </div>
        </div>
      </Panel>
    </>
  )
}