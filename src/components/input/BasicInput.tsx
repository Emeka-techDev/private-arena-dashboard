import { JSX, ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps
  extends Omit<JSX.IntrinsicElements['input'], 'placeholder' | 'label'> {
  label?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  helper?: ReactNode;
  className?: string;
  inputClassName?: string;
  placeHolder?: string;
  onClick?: () => void;
}

export function BasicInput({
  className,
  label,
  inputClassName,
  leadingIcon,
  trailingIcon,
  helper,
  placeHolder,
  onClick,
  ...rest
}: InputProps) {
  return (
    <div className={clsx('relative', className)}>
      {label && <label className='input_label'>{label}</label>}
      <div className='relative'>
        {leadingIcon}
        <input
          type='text'
          placeholder={placeHolder}
          className={clsx('input', inputClassName)}
          {...rest}
        />
        {trailingIcon}
      </div>
      {helper && (
        <p className={clsx('my-5 text-xs text-secondary-transparentBlack30 ')}>
          {helper}
        </p>
      )}
    </div>
  );
}
