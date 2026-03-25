import AuthLayout from '@/layout/auth/AuthLayout';
import mainLogo from '../../assets/logos/arenalogo.svg';
import blueLogo from '../../assets/logos/arenalogo_blue.png';
import { NavLink } from 'react-router-dom';
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  SmallGrayDot,
  UserIcon,
} from '@/components/svg/AuthIcons';
import { BasicInput } from '@/components/input/BasicInput';
import { PasswordInput } from '@/components/input/PasswordInput';
import { RadioInput } from '@/components/input/RadioInput';
import { Button } from '@/components/button/Button';

export const passwordValidations = [
  'One lowercase character',
  'One special character',
  'One uppercase character',
  '8 characters minimum',
  'One number',
];

const SignUp = () => {
  return (
    <AuthLayout
      sideContent={
        <div className='grid gap-5'>
          <img src={mainLogo} alt='logo' className='object-cover' />
          <UserIcon />
          <h2 className='font-semibold text-xl leading-[100%] text-primary-white'>
            Sign up to get started
          </h2>
          <p className='font-normal text-sm text-primary-white leading-6'>
            Sign up is quick and easy. Whether you're launching campaigns or
            earning from them, everything starts here.
          </p>
        </div>
      }
    >
      <div className='px-7 640:px-[3.75rem]'>
        <div className='flex items-center justify-center 640:justify-end gap-2'>
          <p>Already have an account?</p>
          <NavLink to={'/'} className='text-primary-main'>
            Sign In
          </NavLink>
        </div>
        <div className='auth_layout'>
          <img
            src={blueLogo}
            alt=''
            className=' 1180:hidden max-w-[220px] grid place-self-center mt-5 mb-8'
          />
          <div className='max-w-[330px] grid justify-items-center place-self-center gap-6 1180:mt-20'>
            <h2 className='text-center  text-primary-black text-[25px] 768:text-[30px]'>
              Create an account
            </h2>
            <div className='max-w-[160px] w-full flex justify-center items-center gap-5'>
              <GoogleIcon />
              <FacebookIcon />
              <AppleIcon />
            </div>

            <div className='flex items-center justify-center gap-4 w-full'>
              <span className='border border-secondary-transparentBlack30 w-full max-w-[140px]'></span>
              <span className='font-medium text-sm text-secondary-transparentBlack30'>
                Or
              </span>
              <span className='border border-secondary-transparentBlack30 w-full max-w-[140px]'></span>
            </div>
          </div>
          <p className='text-base font-medium text-primary-black mt-[28px] cursor-pointer text-center '>
            Sign up with email
          </p>

          <div className='flex w-full flex-col justify-center items-center py-6'>
            <div className='w-full '>
              <BasicInput
                placeHolder='Email'
                className='mb-6'
                inputClassName='full_rounded_input'
              />
              <PasswordInput
                placeHolder='Password'
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
                          <SmallGrayDot /> <p>{validation}</p>
                        </div>
                      );
                    })}
                  </div>
                }
              />
              <RadioInput />
              <Button
                buttonClass='default_button hover:bg-primary-blue70'
                className='py-4'
              >
                <span>Sign up</span>
              </Button>

              <p className='text-center text-xs font-medium text-secondary-transparentBlack30'>
                By continuing, you agree to Arena’s{' '}
                <span className='underline cursor-pointer'>Terms of Use</span>{' '}
                and{' '}
                <span className='underline cursor-pointer'>
                  {' '}
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
