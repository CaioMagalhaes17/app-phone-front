import { Button, IconLockDots, IconMail, IconMap, IconPhone, IconUser, Input, Text } from "@app/ui";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AutoCompleteAdapter } from "../../../adapters/Map";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../api/user/signup";
import Swal from "sweetalert2";
import { LoadGoogleApi } from "../../../adapters/Map/lib/ApiLoader";
import ReactInputMask from "react-input-mask";

export default function StoreSignUp() {
  const isLoaded = LoadGoogleApi()
  const [isActive, setIsActive] = useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [storeLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const { mutateAsync } = useMutation({
    mutationFn: signup
  })
  const [error, setError] = useState({ type: '', text: '' })

  async function onSubmit(data: FieldValues) {
    setError({ type: '', text: '' })
    if (data.password !== data.confirmPassword) return setError({ type: 'password', text: 'As senhas não estão iguais' })
    if (selectedAddress.includes('Endereço não')) {
      console.log('nigger')
      return Swal.fire({
        title: 'Endereço Inválido',
        text: 'Escreva novamente e clique no endereço'
      })
    }
    console.log(data)
    if (selectedAddress !== '' && storeLocation && storeLocation.lat && storeLocation.lng) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('isStore')
      const response = await mutateAsync({
        address: selectedAddress,
        isStore: true,
        location: {
          lat: storeLocation?.lat,
          lng: storeLocation?.lng
        },
        login: data.email,
        name: data.name,
        password: data.password,
        telNum: data.telNum,
        useTelNumAsWpp: isActive
      })
      localStorage.setItem('accessToken', response.token)
      localStorage.setItem('isStore', 'true')
      window.location.replace('/store/dashboard')
    }
    return setError({ type: 'location', text: 'O campo de endereço não pode ser vazio' })
  }

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center dark:bg-black bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[570px] rounded-md border-2 dark:border-black p-2">
          <div className=" font-extrabold  relative flex flex-col justify-center rounded-md dark:bg-dark px-6 py-10">
            <div className="mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-dark dark:text-white">Cadastre sua loja</h1>
                <Text className="text-white-dark font-bold" as="span">Todas as informações dadas poderão ser facilmente alteradas em seu perfil.</Text>
                <div className="w-full border-black/60 border mt-2" />

              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 dark:text-white">
                <div>
                  <label htmlFor="Name">Nome</label>
                  <div className="relative text-white-dark">
                    <Input {...register('name', { required: true })} type="text" placeholder="Digite o nome de sua loja" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconUser />
                    </span>
                  </div>
                  {errors.name && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                </div>
                <div>
                  <label htmlFor="Name">Email (será utilizado como login)</label>
                  <div className="relative text-white-dark">
                    <Input {...register('email', { required: true })} type="text" placeholder="Digite o email de sua loja" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail />
                    </span>
                  </div>
                  {errors.email && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                </div>

                <div className="flex flex-row justify-between">
                  <div >
                    <label htmlFor="Name">Senha</label>
                    <div className="relative text-white-dark">
                      <Input {...register('password', { required: true })} type="password" placeholder="Senha" className="form-input !ps-10 placeholder:text-white-dark" />
                      <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots />
                      </span>
                    </div>
                    {errors.password && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                  </div>
                  <div >
                    <label htmlFor="Name">Confirmação da senha</label>
                    <div className="relative text-white-dark">
                      <Input id="Name" type="password" {...register('confirmPassword', { required: true })} placeholder="Confirmação" className="form-input !ps-10 placeholder:text-white-dark" />
                      <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots />
                      </span>
                    </div>
                    {errors.confirmPassword && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                  </div>
                </div>
                {error.type === 'password' && (<p className="font-bold text-danger text-left">{error.text}</p>)}
                <div>
                  <label htmlFor="Name">Telefone principal</label>
                  <div className="relative text-white-dark">
                    <ReactInputMask
                      className="form-input-custom !ps-10"
                      mask={'(99) 99999-9999'}
                      alwaysShowMask={false}
                      maskPlaceholder="(99) 99999-9999"
                      type={'text'}
                      {...register('telNum')}
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconPhone />
                    </span>
                  </div>
                  {errors.telNum && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                  <div className="flex flex-row gap-5 mt-2">
                    <label className="text-white-dark" htmlFor="Name">Usar como número do WhatsApp?</label>
                    <button
                      onClick={() => setIsActive(!isActive)}
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${isActive ? "bg-primary" : "bg-gray-300"
                        }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>

                </div>

                <div>
                  <label htmlFor="Name">Endereço</label>
                  <div className="relative text-white-dark">
                    {isLoaded && (
                      <AutoCompleteAdapter setLocation={setLocation} setSelectedAddress={setSelectedAddress}>
                        <Input type="text" placeholder="Exemplo: Rua João 100, Santa Tereza, Belo Horizonte" className="form-input !ps-10 placeholder:text-white-dark" />
                      </AutoCompleteAdapter>
                    )}
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMap />
                    </span>
                  </div>
                  {error.type === 'location' && (<p className="font-bold text-danger text-left">{error.text}</p>)}
                </div>
                {/* <div>
                  <label htmlFor="Name">Descrição/Detalhes da loja</label>
                  <div className="relative text-white-dark">
                    <textarea placeholder="Exemplo: Trabalhamos com Android e IOS - Aberto de 08h até 17h - Andar/Box/Sala" className="placeholder:text-white-dark w-full rounded-md border px-4 py-2 text-sm font-semibold !outline-none focus:border-primary focus:ring-transparent border-[#17263c] bg-[#121e32] text-white-dark focus:border-primary"></textarea>
                  </div>
                </div> */}
                <Button type="submit" className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                  Cadastrar
                </Button>
              </form>
              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-black"></span>
              </div>
              <div className="text-center text-dark dark:text-white mb-5">
                Já possui uma conta?&nbsp;
                <Link to="/store/login" className="uppercase text-primary underline transition">
                  Entrar
                </Link>
              </div>

              <div className="text-center text-white">
                <Link to="/signup" className="uppercase text-primary underline transition">
                  Cadastro de conta CLIENTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}