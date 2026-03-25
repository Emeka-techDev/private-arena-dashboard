import { GreenCheckMark, UserIcon } from '@/components/svg/AuthIcons';
import useOtpInput from '@/hooks/useOtpInput';
import AuthLayout from '@/layout/auth/AuthLayout';
import { maskedEmail } from '@/utils/formatters';
import blueLogo from '../../assets/logos/arenalogo_blue.png';
import mainLogo from '../../assets/logos/arenalogo.svg';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const OtpVerification = () => {
  const navigate = useNavigate();
  const { otp, otpRef, handleOtpChange, handleOtpPaste, handleOtpKeyDown } =
    useOtpInput(6);

  const allvalue = otp.every((field) => field && field.trim() !== '');

  useEffect(() => {
    if (allvalue) {
      setTimeout(() => navigate('/reset-password'), 500);
    }
  }, [otp]);

  // useEffect(() => {
  //   const param = new URLSearchParams(location.search);
  //   const emailFromUrl = param.get('email');

  //   if (emailFromUrl) setEmail(emailFromUrl);
  // }, [location.search]);
  return (
    <AuthLayout
      sideContent={
        <div className='grid gap-5'>
          <img src={mainLogo} alt='logo' className='object-cover' />
          <UserIcon />
          <h1 className='font-semibold text-xl leading-[100%] text-primary-white'>
            OTP Verification
          </h1>
          <p className='font-normal text-sm text-primary-white leading-6'>
            Please verify your identity by entering the One-Time Password (OTP)
            sent to your registered email.
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

          <h2 className='text-center 1180:mt-[101px] mb-5  text-primary-black text-[25px] 768:text-[30px] '>
            OTP Verification
          </h2>
          <p className='font-normal text-base 768:text-xl leading-[100%] text-center mb-[30px]'>
            Enter the OTP sent to{' '}
            <span className='font-semibold '>
              {maskedEmail('arena@arena.com')}
            </span>
          </p>
          <div className='w-fit grid place-self-center mb-5'>
            <div className='mb-5 flex items-center justify-center gap-[10px] '>
              {otp.map((data, i) => (
                <input
                  key={i}
                  value={data}
                  name={`otp-${i}`}
                  autoComplete='off'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  type='text'
                  maxLength={1}
                  ref={(el) => {
                    otpRef.current[i] = el;
                  }}
                  onChange={(e) => handleOtpChange(e, i)}
                  onPaste={(e) => handleOtpPaste(e)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className=' w-12 h-12 560:w-16 560:h-16 768:w-[80px] 768:h-[70px] text-center  text-[#757575] text-xl rounded-[10px] border-[1.5px] border-[#DDDDDD] font-semibold  input-gradient '
                />
              ))}
            </div>
            <div className='w-full h-[25px] font-medium text-xs flex items-center justify-between'>
              {allvalue ? (
                <span className='text-primary-black inline-flex items-center text-start'>
                  <GreenCheckMark /> Code Verified
                </span>
              ) : (
                <span />
              )}

              <span className='cursor-pointer text-primary-main text-end'>
                Resend code
              </span>
            </div>
          </div>
          {/* 
          <Button
            onClick={() => navigate('/reset-password')}
            disabled={!allvalue}
            buttonClass={clsx(
              'default_button ',
              allvalue && 'hover:bg-primary-blue70',
            )}
          >
            <span>Verify</span>
          </Button> */}
        </div>
      </div>
    </AuthLayout>
  );
};
