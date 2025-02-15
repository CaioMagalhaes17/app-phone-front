import { Button } from '@app/ui';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate()
  const isStore = localStorage.getItem('isStore') === 'true'
  return (
    <div className="w-full h-full bg-black relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold">
        <div className="flex-col flex gap-5">
          <img
            src={'/404-dark.svg'}
            alt="404"
            className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
          />
          <p className="mt-5 text-base dark:text-white">Página não encontrada!</p>
          <Button onClick={() => navigate(isStore ? '/store/home' : '/')} className="text-lg btn-primary">Início</Button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
