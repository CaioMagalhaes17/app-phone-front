import { Button, HSeparator, IconWhatsApp, Panel, Text } from "@app/ui";
import { pokemon } from "../../../../constants/images";
import { ProductsRow } from "../../Products/row/ProductsRow";

export function MarketProduct() {
  return (
    <>
      <div className="w-[1500px] mr-auto ml-auto">
        <Panel className="p-4 flex flex-col items-center font-extrabold">
          <div className="flex flex-row w-[900px] justify-center">
            <div className="w-[350px]">
              <img src={pokemon} />
            </div>
            <Panel className="ml-auto flex flex-col max-w-[410px]">
              <Text className="text-black dark:text-white text-2xl" as="h1">Pokemon Chimchar Pokédéx</Text>
              <Text className="text-success text-lg" as="h1">R$120,00</Text>
              <Text className="mt-5 text-lg" as="h1">Em estoque</Text>
              <HSeparator />
              <Text className="mt-5" as="h1">Pokemon Chimchar da pokedex especializado em em ccomer xerecquinha  em ccomer xerecquinha em ccomer xerecquinhaem ccomer xerecquinha  em ccomer xerecquinha em ccomer xerecquinhar</Text>
              <Button className="btn-green mt-auto flex flex-row gap-2">
                <IconWhatsApp />
                Reservar
              </Button>
            </Panel>
          </div>
        </Panel>
      </div>
      <Panel className="mt-10">
        <ProductsRow title="Veja também" isOwner={false} id="1" />
      </Panel>
      <Panel className="mt-10">
        <ProductsRow title="Outros" isOwner={false} id="1" />
      </Panel>

    </>
  )
}