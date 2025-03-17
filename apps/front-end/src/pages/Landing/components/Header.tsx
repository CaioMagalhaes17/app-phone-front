import { Button, Header, Text, VSeparator } from "@app/ui";
import { ChooseTheme } from "../../../components/Header/ChooseTheme";
import { useNavigate } from "react-router-dom";

export function LandingHeader() {
  const navigate = useNavigate()
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header className="">
        <div className="font-extrabold h-[80px] shadow-md relative flex w-full items-center px-5 py-2.5 dark:bg-black dark:border-b-[#323b45]">
          <div className={`horizontal-logo flex justify-between items-center mr-2`}>
            <img className="h-[40px]" src="/phone.png" />
            <Text className="text-3xl text-black dark:text-[#c4c4c4] font-extrabold " as="h1">Ponto dos celulares</Text>
          </div>
          <div className="mr-auto" />
          <div className="mr-[100px] items-center flex flex-row gap-5">
            <Text onClick={() => scrollToSection("howItWorks")} className="text-lg cursor-pointer hover:underline text-black dark:text-[#c4c4c4]" as="span">Como funciona</Text>
            <VSeparator className="ml-2 mr-2" />
            <Text onClick={() => scrollToSection("plans")} className="text-lg cursor-pointer hover:underline text-black dark:text-[#c4c4c4]" as="span">Planos para Lojas</Text>
            <VSeparator className="ml-2 mr-2" />
            <Text onClick={() => scrollToSection("about")} className="text-lg cursor-pointer hover:underline text-black dark:text-[#c4c4c4]" as="span">Sobre Nós</Text>
          </div>
          <ChooseTheme />
          <Button onClick={() => navigate('/chooseProfileType/login')} className="btn-outline-primary ml-10 mr-2">Entrar</Button>
          <Button onClick={() => navigate('/chooseProfileType/signup')} className="btn-primary">Cadastrar</Button>
        </div>
      </Header>
    </>
  )
}