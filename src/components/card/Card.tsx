import clsx from 'clsx';
import { ReactNode } from 'react';

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'rounded-[20px] bg-primary-white px-5 w-full h-full',
        className,
      )}
    >
      {children}
    </div>
  );
};
