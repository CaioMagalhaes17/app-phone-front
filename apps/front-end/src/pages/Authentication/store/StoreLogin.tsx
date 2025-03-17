import { Button, IconLockDots, IconMail, Input } from "@app/ui";
import { Link } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/user/login";

interface LoginForm {
  login: string;
  password: string;
}


export default function ClientLogin() {
  const { register, formState: { errors }, handleSubmit } = useForm()

  const { mutateAsync } = useMutation({
    mutationFn: (data: LoginForm) => login(data, true),
    mutationKey: ['login']
  })


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isStore')
    const response = await mutateAsync(data as LoginForm);
    localStorage.setItem('accessToken', response.token)
    localStorage.setItem('isStore', 'true')
    window.location.replace('/store/dashboard')
  };

  return (
    <>
      <div className="absolute inset-0 dark:bg-black">

      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16">
        <div className="relative font-extrabold w-full max-w-[570px] rounded-md border-2 dark:border-black p-2">
          <div className="relative flex flex-col justify-center rounded-md dark:bg-dark px-6 py-10">
            <div className="mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-dark dark:text-white">Acessar sua Loja</h1>
                <div className="w-full border-black/60 border mt-2" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-dark dark:text-white">
                <div>
                  <label htmlFor="Name">Email</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="text" placeholder="Digite o email de sua loja" {...register('login', { required: true })} className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail />
                    </span>
                  </div>
                  {errors.login && (<p className="font-bold text-danger">Campo Obrigatório</p>)}
                </div>

                <div>
                  <label htmlFor="Name">Senha</label>
                  <div className="relative text-white-dark">
                    <Input id="Name" type="password" placeholder="Senha" {...register('password', { required: true })} className="form-input !ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconLockDots />
                    </span>
                  </div>
                  {errors.password && (<p className="font-bold text-danger">Campo Obrigatório</p>)}
                </div>

                <Button type="submit" className="btn btn-primary !mt-6 w-full border-0 uppercase ">
                  Entrar
                </Button>
              </form>
              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-black"></span>
              </div>

              <div className="text-center text-dark dark:text-white mb-5">
                Não possui uma conta?&nbsp;
                <Link to="/store/signup" className="uppercase text-primary underline transition">
                  Cadastrar
                </Link>
              </div>

              <div className="text-center">
                <Link to="/login" className="uppercase text-primary underline transition">
                  ENTRAR COM CONTA CLIENTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}