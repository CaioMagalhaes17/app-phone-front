import { Button, IconLockDots, IconMail, IconMap, IconPhone, IconUser, Input, Text } from "@app/ui";
import { Link } from "react-router-dom";

export default function StoreSignUp() {
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center bg-black bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative w-full max-w-[570px] rounded-md p-2">
          <div className="relative flex flex-col justify-center rounded-md bg-dark px-6 py-10">
            <div className="mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-white">Cadastre sua loja</h1>
                <Text className="text-white-dark font-bold" as="span">Todas as informações dadas poderão ser facilmente alteradas em seu perfil.</Text>
                <div className="w-full border-black/60 border mt-2" />

              </div>
              <form className="space-y-5 text-white">
                <div>
                  <label htmlFor="Name">Nome</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Digite o nome de sua loja" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconUser />
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="Name">Email (será utilizado como login)</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Digite o email de sua loja" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail />
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <div >
                    <label htmlFor="Name">Senha</label>
                    <div className="relative text-white-dark">
                      <Input id="Name" type="text" placeholder="Senha" className="form-input !ps-10 placeholder:text-white-dark" />
                      <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots />
                      </span>
                    </div>
                  </div>
                  <div >
                    <label htmlFor="Name">Confirmação da senha</label>
                    <div className="relative text-white-dark">
                      <Input id="Name" type="text" placeholder="Confirmação" className="form-input !ps-10 placeholder:text-white-dark" />
                      <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots />
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="Name">Telefone celular principal (Caso deseje receber notificações)</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Digite telefone principal" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconPhone />
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="Name">Endereço (Posteriormente pediremos que marque a localização exata no mapa)</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Exemplo: Rua João 100, Santa Tereza, Belo Horizonte" className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMap />
                    </span>
                  </div>
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
              <div className="text-center text-white mb-5">
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