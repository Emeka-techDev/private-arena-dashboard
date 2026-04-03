import AuthLayout from '@/layout/auth/AuthLayout';
import mainLogo from '../../assets/logos/arenalogo.svg';
import { SmallGrayDot, UserIcon } from '@/components/svg/AuthIcons';
import { PasswordInput } from '@/components/input/PasswordInput';
import { Button } from '@/components/button/Button';
import blueLogo from '../../assets/logos/arenalogo_blue.png';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { passwordValidations } from '@/utils';

export const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout
      sideContent={
        <div className='grid gap-5'>
          <img src={mainLogo} alt='logo' className='object-cover' />
          <UserIcon />
          <h1 className='font-semibold text-xl leading-[100%] text-primary-white'>
            Reset your password
          </h1>
          <p className='font-normal text-sm text-primary-white leading-6'>
            Choose a strong new password to secure your Arena XP account and
            continue.
          </p>
        </div>
      }
    >
      <div className='px-7 640:px-[3.75rem]'>
        <div className='auth_layout'>
          <img
            src={blueLogo}
            alt='arena Logo'
            className=' 1180:hidden max-w-[220px] grid place-self-center mt-5 mb-8'
          />

          <div>
            <h2 className='text-center 1180:mt-[101px] text-primary-black text-[25px] 768:text-[30px]'>
              Reset password
            </h2>

            <div className='flex w-full flex-col justify-center items-center py-6'>
              <div className='w-full '>
                <PasswordInput
                  placeHolder='New password'
                  inputClassName='full_rounded_input'
                  className='mb-5'
                />
                <PasswordInput
                  placeHolder='Confirm password'
                  inputClassName='full_rounded_input'
                  className='mb-5'
                  helper={
                    <div className='max-w-[410px] w-full flex flex-wrap items-center gap-x-12'>
                      {passwordValidations.map((validation, i) => {
                        return (
                          <div
                            key={i}
                            className='flex items-center max-w-[180px] w-full '
                          >
                            <SmallGrayDot />
                            <p className={clsx('text-primary-black')}>
                              {validation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  }
                />

                <Button
                  onClick={() => navigate('/')}
                  buttonClass={clsx('default_button hover:bg-primary-blue70')}
                >
                  <span>Reset password</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
