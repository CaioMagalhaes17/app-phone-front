import { Button, HSeparator, IconMail, IconShoppingBag, IconStore, IconWhatsApp, Panel, Text } from "@app/ui";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { StoreProfileType } from "../../../../types/store-profile";

export function StoreResume({ storeProfile, showMarket }: { showMarket?: boolean, storeProfile: StoreProfileType }) {
  return (
    <>
      <Panel className="min-w-[300px] p-4">
        <Text className="text-black dark:text-white text-5xl mt-4 font-extrabold " as="h1">Loja</Text>
        <HSeparator />
        <div className="font-extrabold flex flex-row gap-5 mt-5">
          <div className="w-[100px] max-h-[80px] ">
            <img width="100" height="100" src={storeProfile.profileImg} className="rounded-3xl" />
          </div>
          <div className="flex w-full flex-col">
            <Text className="flex flex-row gap-5 items-center text-center text-dark dark:text-white text-lg" as="span">
              {storeProfile.name}
              <div className="flex flex-row mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={index < storeProfile.rating ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-300"}
                    size={16}
                  />
                ))}
              </div>
            </Text>
            <div className="flex flex-row w-full">
              <div className="w-full text-left flex flex-col gap-2">
                <Text className="text-lg text-green" as="span">Aberto</Text>
                <Text as="span">Distância em km: {storeProfile.email}</Text>
              </div>
            </div>
          </div >
        </div >
        <HSeparator className="mb-5" />
        <div className="flex flex-col gap-5">
          <Button className="btn-green flex flex-row gap-2"><IconWhatsApp />Chamar no Whatsapp</Button>
          <Button className="btn-blue flex flex-row gap-2"><IconMail />Enviar Email</Button>
          {showMarket ? (
            <Link target="_blank" to={`/market/store/${storeProfile.id}`} className="btn-primary btn flex flex-row gap-2"><IconShoppingBag />Produtos da loja</Link>
          ) : (
            <Link target="_blank" to={`/store-profile/${storeProfile.id}`} className="btn-primary btn flex flex-row gap-2"><IconStore />Perfil da loja</Link>
          )}
        </div>
      </Panel >
    </>
  )
}