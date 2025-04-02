import { Button, IconPhone, IconSearch, IconStreetMap, Panel, Text } from "@app/ui";
import { useNavigate } from "react-router-dom";
import { useGetStoresInsideClientRadius } from "../../../../hooks/geolocation/useGetStoresInsideClientRadius";
import { StoresRow } from "../../../Market/Stores/row/StoresRow";

export function AfterCreated({ solicitationId }: { solicitationId: string }) {
  const navigate = useNavigate()
  const { stores, storesLoading } = useGetStoresInsideClientRadius()
  return (
    <>
      <div className="mb-5 max-w-[1200px] w-full ml-auto mr-auto font-bold ">
        <Panel className="p-4 ">
          <div className="mb-5 w-full">
            <div className="flex flex-row items-center gap-10 justify-center text-center ">
              <div className="flex-col">
                <h1 className="text-5xl font-extrabold text-success dark:text-success mb-4">
                  Solicitação de conserto enviada com sucesso!
                </h1>

                <label className="text-md flex items-center gap-2 block mt-10">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full"
                    checked
                    disabled
                    style={{ backgroundColor: 'currentcolor' }}
                  />
                  <p className="text-lg text-dark dark:text-white-dark font-extrabold mb-2">
                    Sua solicitação foi enviada para () lojas perto de você!
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
                  <p onClick={() => navigate('/configurations')} className="text-lg text-dark dark:text-white-dark font-extrabold max-w-2xl mb-2">
                    Você pode escolher por <span className="text-primary hover:underline cursor-pointer">Receber notificações pelo WhatsApp.</span>
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
                  <p onClick={() => navigate('/budgets/list')} className="text-lg text-dark dark:text-white-dark font-extrabold max-w-2xl mb-2">
                    Acesse os orçamentos em <span className="cursor-pointer hover:underline text-primary">Reparo de celular {`>`} Orçamentos recebidos</span>
                  </p>
                </label>

                <div className="flex gap-5 flex-row w-full">
                  <Button onClick={() => navigate('/solicitation/' + solicitationId)} className="btn-primary flex flex-row gap-5 text-xl ml-auto mr-auto mt-10">
                    <IconPhone />
                    Acessar solicitação
                  </Button>
                  <Button className="flex flex-row gap-5 btn-outline-primary text-xl ml-auto mr-auto mt-10">
                    <IconSearch />
                    Procurar lojas próximas
                  </Button>
                </div>

              </div>
              <div className="flex-col">
                <img className="h-full w-full" src={'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png'} />
              </div>
            </div>
            <div className="border-b border-b-[#323b45] w-[50%] ml-auto mr-auto mt-10" />

          </div>
        </Panel>
      </div>
      {stores && stores.length > 0 && !storesLoading ?
        (
          <>
            <StoresRow title="Lojas Abertas Mais Próximas" stores={stores} />
          </>
        ) : (
          <div className="font-extrabold flex flex-col gap-5 mt-10">
            <Text className="text-center text-3xl" as="h1">Nenhuma Loja Próxima Encontrada</Text>
            <Text as="h2" onClick={() => navigate('/map')} className="cursor-pointer hover:underline text-xl ml-auto mr-auto flex flex-row">Tente alterar o raio de pesquisa pelo menu
              <span className="flex flex-row gap-2 ml-5">
                <IconStreetMap /> Mapa
              </span>
            </Text>
          </div>
        )
      }
    </>
  )
}