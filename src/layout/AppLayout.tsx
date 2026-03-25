import { Header } from '@/components/header/Header';
import clsx from 'clsx';
import { ReactNode } from 'react';

export const AppLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const year = new Date().getFullYear();
  return (
    <div>
      <Header />
      <main
        className={clsx(
          'bg-[#F9F7F8] px-7 640:px-10 880:px-[60px] pt-[60px] pb-[58px]',
          className,
        )}
      >
        {children}
      </main>
      <footer className='px-[60px] py-[18px] bg-primary-black flex justify-between items-center text-sm text-primary-white'>
        <p> &copy;{` ${year} Arena XP`}</p>
        <p>Privacy | Terms</p>
      </footer>
    </div>
  );
};
