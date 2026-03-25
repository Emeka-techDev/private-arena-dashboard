import AuthLayout from '@/layout/auth/AuthLayout';
import mainLogo from '../../assets/logos/arenalogo.svg';
import { UserIcon } from '@/components/svg/AuthIcons';
import { BasicInput } from '@/components/input/BasicInput';
import { Button } from '@/components/button/Button';
import { NavLink } from 'react-router';
import blueLogo from '../../assets/logos/arenalogo_blue.png';

export const ForgotPassword = () => {
  return (
    <AuthLayout
      sideContent={
        <div className='grid gap-5'>
          <img src={mainLogo} alt='logo' className='object-cover' />
          <UserIcon />
          <h1 className='font-semibold text-xl leading-[100%] text-primary-white '>
            Forgot your password?
          </h1>
          <p className='font-normal text-sm text-primary-white leading-6'>
            No worries — enter your email and we’ll send you reset instructions.
          </p>
        </div>
      }
    >
      <div className='px-7 640:px-[3.75rem]'>
        <div className='auth_layout'>
          <img
            src={blueLogo}
            alt=''
            className=' 1180:hidden max-w-[220px] grid place-self-center mt-5 mb-8'
          />
          <h2 className='text-center 1180:mt-[101px]  text-primary-black text-[25px] 768:text-[30px]'>
            Enter email to reset password
          </h2>

          <div className='flex w-full flex-col justify-center items-center py-6'>
            <div className='w-full '>
              <BasicInput
                placeHolder='Email'
                className='mb-6'
                inputClassName='full_rounded_input'
              />

              <NavLink to={'/otp-verify'}>
                <Button buttonClass='default_button hover:bg-primary-blue70'>
                  <span>Reset password</span>
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
