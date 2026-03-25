import { JSX, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps
  extends Omit<JSX.IntrinsicElements['button'], 'disabled'> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  buttonClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  leadingIcon,
  trailingIcon,
  className,
  buttonClass,
  disabled,
  onClick,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <div className={clsx('relative', className)}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          'button',
          disabled && 'cursor-not-allowed bg-opacity-50',
          buttonClass,
        )}
        {...rest}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </button>
    </div>
  );
}
