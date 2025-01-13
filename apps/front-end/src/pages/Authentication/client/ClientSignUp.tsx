import { Button, IconMail, IconPhone, IconUser, Input } from "@app/ui";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ClientSignUp() {
  const [useEmail, setUseEmail] = useState<boolean>(true)
  return (
    <>
      <div className="absolute inset-0 bg-black">

      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[570px] rounded-md p-2">
          <div className="relative flex flex-col justify-center rounded-md bg-dark px-6 py-10">
            <div className="mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-white">Crie sua conta</h1>
                <div className="w-full border-black/60 border mt-2" />

              </div>
              <form className="space-y-5 text-white">
                <div>
                  <label htmlFor="Name">Nome</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Digite seu nome completo" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconUser fill={true} />
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <label className="flex items-center">
                    <input type="radio" onClick={() => setUseEmail(true)} className="mr-2" checked={useEmail} />
                    <span>Usar Email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" onClick={() => setUseEmail(false)} className="mr-2" checked={!useEmail} />
                    <span>Usar Número de Telefone</span>
                  </label>
                </div>

                {useEmail ? (<div>
                  <label htmlFor="Name">Email</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Digite seu email" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail fill={true} />
                    </span>
                  </div>
                </div>) : (<div>
                  <label htmlFor="Name">Telefone</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" placeholder="Digite seu número de telefone" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconPhone fill={true} />
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

              <div className="text-center text-white mb-5">
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