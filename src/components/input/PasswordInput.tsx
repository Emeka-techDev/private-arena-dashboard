import { JSX, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Eye, SlashedEye } from '../svg/AuthIcons';

interface InputProps
  extends Omit<JSX.IntrinsicElements['input'], 'placeholder' | 'label'> {
  label?: string;
  trailingIcon?: ReactNode;
  helper?: ReactNode;
  className?: string;
  inputClassName?: string;
  placeHolder?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function PasswordInput({
  className,
  label,
  trailingIcon,
  inputClassName,
  helper,
  placeHolder,
  disabled,
  onClick,
  ...rest
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={clsx('relative', className)}>
      {label && <label className='input_label'>{label}</label>}
      <div className='relative'>
        <input
          type={isVisible ? 'text' : 'password'}
          placeholder={placeHolder}
          disabled={disabled}
          className={clsx(
            'input full_rounded_input !pr-[52px]',
            disabled && 'cursor-not-allowed',
            inputClassName,
          )}
          {...rest}
        />
        <span
          onClick={() => {
            if (!disabled) setIsVisible(!isVisible);
          }}
          className={clsx(
            'absolute right-[29px] transform top-1/2 -translate-y-2',
            disabled
              ? 'cursor-not-allowed pointer-events-none'
              : 'cursor-pointer',
          )}
        >
          {isVisible ? <Eye /> : <SlashedEye />}
        </span>
      </div>
      {helper && (
        <div className={clsx('my-5 text-xs text-secondary-transparentBlack30')}>
          {helper}
        </div>
      )}
    </div>
  );
}
