import { IconHelpCircle, Panel, Text } from "@app/ui";
import { useState } from "react";

export function HowItWorks() {
  const [closeClientTutorial, setCloseClientTutorial] = useState(false)
  const [closeStoreTutorial, setCloseStoreTutorial] = useState(false)
  return (
    <Panel className="dark:!bg-[#060818] font-bold flex flex-col items-center justify-center !shadow-none">
      <div id="howItWorks" className="mb-5 max-w-[1200px] w-full">
        <Text className="text-3xl text-dark dark:text-white flex flex-row gap-2" as="h1"><IconHelpCircle className="w-[40px] h-[40px]" /> Como funciona</Text>

        <div className="flex flex-col p-4">
          <Text className="text-xl" as="span">Nosso sistema foi criado para facilitar a busca pelo melhor orçamento para o conserto do seu celular. Com poucos passos, você encontra a melhor opção sem precisar sair de casa.</Text>
          <Text onClick={() => setCloseClientTutorial(!closeClientTutorial)} className="cursor-pointer text-dark mt-5 form-select !bg-transparent !border-none dark:text-white text-xl" as="h1">Para pessoas com defeito no celular</Text>
          <div className={closeClientTutorial ? 'hidden' : ''}>
            <div className="ml-5 text-left mb-2">
              <Text className="text-dark dark:text-white text-lg" as="h1">1. Defina sua Localização:</Text>
              <Text className="text-lg" as="span">Primeiro, informe sua localização e o raio de busca que deseja alcançar. Assim, garantimos que você receberá orçamentos apenas de lojas próximas a você.</Text>
            </div>
            <div className="ml-5 text-left mb-2">
              <Text className="text-dark dark:text-white text-lg" as="h1">2. Descreva o Problema</Text>
              <Text className="text-lg" as="span">Preencha um formulário simples com as informações sobre o problema do seu telefone. Quanto mais detalhes, melhor será a avaliação das lojas especializadas. Mande fotos do aparelho, se precisar.</Text>
            </div>
            <div className="ml-5 text-left mb-2">
              <Text className="text-dark dark:text-white text-lg" as="h1">3. Escolha o Melhor Orçamento</Text>
              <Text className="text-lg" as="span">Após o envio, lojas dentro da sua área de busca enviarão propostas com preços e prazos para o conserto. Compare as opções e escolha a que mais se encaixa nas suas necessidades.</Text>
            </div>
            <div className="ml-5 text-left ">
              <Text className="text-dark dark:text-white text-lg" as="h1">4. Entre em Contato com quantas lojas quiser.</Text>
              <Text className="text-lg" as="span">Após o envio, lojas dentro da sua área de busca enviarão propostas com preços e prazos para o conserto. Compare as opções e escolha a que mais se encaixa nas suas necessidades.</Text>
            </div>
          </div>
          <Text onClick={() => setCloseStoreTutorial(!closeStoreTutorial)} className="cursor-pointer text-dark mt-5 form-select !bg-transparent !border-none dark:text-white text-xl" as="h1">Para lojas/assistências técnicas</Text>
          <div className={closeStoreTutorial ? 'hidden' : ''}>
            <div className="ml-5 text-left mb-2">
              <Text className="text-dark dark:text-white text-lg" as="h1">1. Crie o Perfil da Sua Loja</Text>
              <Text className="text-lg" as="span">Cadastre sua loja informando o nome, endereço, horário de funcionamento e fotos. Dessa forma, os clientes poderão conhecer melhor seu serviço antes de entrar em contato.</Text>
            </div>
            <div className="ml-5 text-left mb-2">
              <Text className="text-dark dark:text-white text-lg" as="h1">2. Envie Orçamentos para Clientes</Text>
              <Text className="text-lg" as="span">Acesse a lista de solicitações de orçamento, filtre pelos tipos de defeitos que sua loja atende e envie sua proposta diretamente para o cliente. Quanto mais rápido sua resposta, maiores as chances de fechar negócio!</Text>
            </div>
            <div className="ml-5 text-left mb-2">
              <Text className="text-dark dark:text-white text-lg" as="h1">3. Cadastre Produtos na Aba de Mercado</Text>
              <Text className="text-lg" as="span">Além dos serviços, sua loja pode cadastrar e vender acessórios e peças diretamente na plataforma, aumentando suas oportunidades de venda.</Text>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}