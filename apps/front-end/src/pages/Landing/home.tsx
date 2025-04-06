import { Button, HSeparator, IconSearch, IconSend, Panel } from "@app/ui";
import DefaultLanding from "./components/Default";
import { useNavigate } from "react-router-dom";
import { HowItWorks } from "./components/HowItWorks";
import PricingTable from "./components/Plans";
import { About } from "./components/About";
import { StoreServicesGrid } from "../../components/Profiles/store/components/Services";
import { pokemon } from "../../constants/images";
import { scrollToSection } from "../../utils/scroll-to";

export function LandingHome() {
  const navigate = useNavigate()
  const services = [
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Baterias',
      topic: 'battery'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Tela',
      topic: 'display'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de vidro',
      topic: 'glass'
    },
    {
      serviceImg: pokemon,
      serviceName: 'Troca de Tela',
      topic: 'display'
    }
  ]
  return (
    <>
      <DefaultLanding>
        <Panel className="dark:!bg-[#060818] flex !shadow-none flex-col items-center justify-center ">
          <div className="mb-5 max-w-[1100px] w-full">
            <div className="flex flex-row items-center gap-10 justify-center text-center ">
              <div className="flex-col">
                <h1 className="text-5xl font-extrabold text-black dark:text-white mb-4">
                  Facilitando serviços de assistência a celulares
                </h1>

                <label className="text-md flex items-center gap-2 block">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full"
                    checked
                    disabled
                    style={{ backgroundColor: 'currentcolor' }}
                  />
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold mb-2">
                    Solicite orçamentos para todas as lojas mais próximas de você, sem sair de casa!
                  </p>
                </label>

                <label className="text-md flex items-center gap-2 block">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full"
                    checked
                    disabled
                    style={{ backgroundColor: 'currentcolor' }}
                  />
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold max-w-2xl mb-2">
                    Procure por produtos e acessórios de celulares!
                  </p>
                </label>

                <label className="text-md flex items-center gap-2 block">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full"
                    checked
                    disabled
                    style={{ backgroundColor: 'currentcolor' }}
                  />
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold max-w-2xl mb-2">
                    Escolha o melhor preço!
                  </p>
                </label>

                <div className="flex gap-5 flex-row w-full">
                  <Button onClick={() => scrollToSection('services')} className="btn-primary flex flex-row gap-5 text-xl ml-auto mr-auto mt-10">
                    <IconSend />
                    Solicitar orçamento
                  </Button>
                  <Button onClick={() => navigate('/signup')} className="flex flex-row gap-5 btn-outline-primary text-xl ml-auto mr-auto mt-10">
                    <IconSearch />
                    Procurar lojas próximas
                  </Button>
                </div>

              </div>
              <div className="flex-col">
                <img className="h-full w-full" src={'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png'} />
              </div>
            </div>
          </div>
          <img className="rounded-xl" src="/teste.png" />
        </Panel>
        <div id="services" className="flex justify-center mb-10">
          <HSeparator className="w-[80%]" />
        </div>
        <StoreServicesGrid services={services} title="Manutenção em celulares" onServiceClick={(topic) => navigate('/landing/solicitations/create?topic=' + topic)} />
        <div className="flex justify-center mb-10">
          <HSeparator className="w-[80%]" />
        </div>
        <HowItWorks />
        <div className="flex justify-center">
          <HSeparator className="w-[80%]" />
        </div>
        <PricingTable />
        <div className="flex justify-center mb-10">
          <HSeparator className="w-[80%]" />
        </div>
        <About />
      </DefaultLanding>
    </>
  )
}