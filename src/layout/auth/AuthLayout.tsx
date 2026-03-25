import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';
import triangleImage1 from '@/assets/authImages/triangle_image_1.png';
import triangleImage2 from '@/assets/authImages/triangle_image_2.png';
import spinImage from '@/assets/authImages/Spin_image.png';

interface LayoutProps {
  sideContent: ReactNode;
  className?: string;
}

const AuthLayout = ({
  sideContent,
  children,
  className,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className='flex w-full h-screen overflow-hidden'>
      <div
        className={clsx(
          'hidden 1180:block 1180:w-[400px] 1400:w-[415px] sticky top-0 bg-primary-main h-full pt-[60px] overflow-hidden',
        )}
      >
        <div className={clsx('px-[60px]', className)}>{sideContent}</div>
        <div className='mt-14 grid place-self-center justify-center h-[40vh]'>
          <img
            src={triangleImage1}
            alt=''
            className='w-[199px] h-[141px] absolute -right-28'
          />
          <img src={spinImage} alt='' className=' w-[260px] h-[260px]' />
        </div>
        <img
          src={triangleImage2}
          alt=''
          className='w-[199px] h-[141px] absolute bottom-[-30px] left-[-57px] rotate-[290deg] '
        />
      </div>
      <main className='flex-1 overflow-y-auto bg-white h-full pt-14 pb-5 hidden-scrollbar'>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
