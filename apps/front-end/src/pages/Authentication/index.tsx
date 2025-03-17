import { IconStore, IconUser, Text } from "@app/ui";
import { useNavigate, useParams } from "react-router-dom";

export function UserSignUp() {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }
  return (
    <>
      <div className="absolute inset-0 dark:bg-black">
      </div>
      <div className="top-[-130px] relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[570px] rounded-md p-2">
          <div className="font-extrabold relative flex flex-col justify-center rounded-md  px-6 py-10">
            <Text as="h1" className="text-black dark:text-white text-5xl ">Antes de tudo...</Text>
            <Text as="h1" className="text-dark dark:text-white-dark text-lg ">Queremos te conhecer melhor. Para isso, primeiro nos fale em qual perfil você se identifica no momento:</Text>
            <button onClick={() => navigate(id === 'login' ? '/login' : '/signup')} className="rounded-xl mt-10 p-2 w-full flex flex-row border border-[#c4c4c4] hover:bg-[#c4c4c438]">
              <IconUser className="h-[100px] w-[100px] dark:text-white mr-10 ml-5" />
              <div className="flex flex-col">
                <Text className="text-dark dark:text-white text-2xl" as="h1">Perfil de cliente</Text>
                <Text className="text-white-dark" as="h1">Tenho um defeito no celular, quero receber orçamentos e procurar por assistências técnicas</Text>
              </div>
            </button>
            <button onClick={() => navigate(id === 'login' ? '/store/login' : '/store/signup')} className="mt-10 rounded-xl  p-2 w-full flex flex-row border border-[#c4c4c4] hover:bg-[#c4c4c438]">
              <IconStore className="h-[100px] w-[100px] dark:text-white mr-10 ml-5" />
              <div className="flex flex-col">
                <Text className="text-dark dark:text-white text-2xl" as="h1">Perfil de Loja</Text>
                <Text className="text-white-dark" as="h1">Tenho uma loja de assistência técnica e gostaria de retornar orçamentos, cadastrar produtos, etc...</Text>
              </div>
            </button>

          </div>
        </div>
      </div>
    </>
  )
}