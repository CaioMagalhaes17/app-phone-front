import { Button, IconLockDots, IconMail, IconPhone, IconUser, Input, Text } from "@app/ui";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup } from "../../../api/user/signup";

export default function ClientSignUp() {
  const [useEmail, setUseEmail] = useState<boolean>(true)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { mutateAsync } = useMutation({
    mutationFn: signup
  })
  async function onSubmit(data: FieldValues) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isStore')
    const response = await mutateAsync({
      login: data.email,
      password: data.password,
      isStore: false,
      name: data.name
    })
    localStorage.setItem('accessToken', response.token)
    localStorage.setItem('isStore', 'false')
    window.location.replace('/')
  }

  return (
    <>
      <div className="absolute inset-0 dark:bg-black">

      </div>

      <div className="font-extrabold relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[570px] rounded-md p-2">
          <div className="relative flex flex-col justify-center rounded-md border-2 dark:bg-dark px-6 py-10">
            <div className="mx-auto w-full">
              <div className="mb-5">
                <h1 className="text-3xl font-extrabold text-black dark:text-white">Crie sua conta</h1>
                <div className="w-full border-black/60 border mt-2" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-dark dark:text-white">
                <div>
                  <label htmlFor="Name">Nome</label>
                  <div className="relative text-white-dark">
                    <Input {...register('name', { required: true })} type="text" placeholder="Digite seu nome completo" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconUser fill={true} />
                    </span>
                  </div>
                  {errors.name && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <label className="flex items-center">
                    <input type="radio" onClick={() => setUseEmail(true)} className="mr-2" checked={useEmail} />
                    <span>Usar Email e Senha</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" onClick={() => setUseEmail(false)} className="mr-2" checked={!useEmail} />
                    <span>Usar Número de Telefone</span>
                  </label>
                </div>

                {useEmail ? (
                  <>
                    <div>
                      <label htmlFor="Name">Email</label>
                      <div className="relative text-white-dark">
                        <Input {...register('email', { required: true })} type="text" placeholder="Digite seu email" className="form-input !ps-10 placeholder:text-white-dark" />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconMail />
                        </span>
                      </div>
                      {errors.name && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}

                    </div>
                    <div>
                      <label htmlFor="Name">Senha</label>
                      <div className="relative text-white-dark">
                        <Input {...register('password', { required: true })} type="text" placeholder="Digite sua senha" className="form-input !ps-10 placeholder:text-white-dark" />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconLockDots />
                        </span>
                      </div>
                      {errors.password && (<p className="font-bold text-danger text-left">Campo Obrigatório*</p>)}
                    </div>
                  </>
                ) : (<div>
                  <label htmlFor="Name">Telefone</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" placeholder="Digite seu número de telefone" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconPhone />
                    </span>
                  </div>
                </div>)}
                <Button type="submit" className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                  Cadastrar
                </Button>
              </form>
              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-black"></span>
                <span className="relative px-2 font-extrabold uppercase text-white bg-white-dark rounded">Outras formas de criar conta</span>
              </div>

              <div className="flex flex-col mb-10">
                <div className="flex flex-row border-2 p-2 items-center justify-center">
                  <img src="https://www.cdnlogo.com/logos/g/35/google-icon.svg" className="w-[50px] h-[50px]" />
                  <Text className="ml-5 text-dark dark:text-white-dark" as="span">Cadastrar com Google</Text>
                </div>
              </div>


              <div className="text-center text-dark dark:text-white mb-5">
                Já possui uma conta?&nbsp;
                <Link to="/login" className="uppercase text-primary underline transition">
                  Entrar
                </Link>
              </div>

              <div className="text-center text-white">
                <Link to="/store/signup" className="uppercase text-primary underline transition">
                  Cadastro de conta LOJA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}