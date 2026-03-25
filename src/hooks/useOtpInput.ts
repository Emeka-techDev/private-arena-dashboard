import { useRef, useState } from 'react';

const useOtpInput = (length: number = 4) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const otpRef = useRef<Array<HTMLInputElement | null>>([]);
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return false;
    const updatedOtp = otp.map((data, indx) => (indx === i ? value : data));
    setOtp(updatedOtp);

    if (value) otpRef.current[i + 1]?.focus();
    if (value === '') otpRef.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData('text');

    if (isNaN(Number(value)) || !value || value.trim() === '') return false;

    const pastedValues = value.toString().split('').slice(0, otp.length);
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      let currentIndex = 0;

      for (let i = 0; i < updatedOtp.length; i++) {
        if (!updatedOtp[i] && currentIndex < pastedValues.length) {
          updatedOtp[i] = pastedValues[currentIndex];
          currentIndex++;
        }
      }
      setTimeout(() => {
        const firstEmptyInputIndex = updatedOtp.findIndex((val) => !val);
        if (firstEmptyInputIndex !== -1) {
          otpRef.current[firstEmptyInputIndex]?.focus();
        } else (document.activeElement as HTMLElement)?.blur();
      }, 0);
      return updatedOtp;
    });
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    const { key } = e;
    const value = e.currentTarget.value;

    if (key === 'Backspace' && value === '') {
      if (i > 0) {
        otpRef.current[i - 1]?.focus();
        setOtp((prevOtp) =>
          prevOtp.map((data, indx) => (indx === i - 1 ? '' : data)),
        );
      }
    }
  };

  return { otp, otpRef, handleOtpChange, handleOtpPaste, handleOtpKeyDown };
};

export default useOtpInput;
