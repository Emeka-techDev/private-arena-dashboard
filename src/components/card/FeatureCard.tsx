import { Card } from './Card';
import { ReactNode } from 'react';
import clsx from 'clsx';

export const FeatureCard = ({
  topImage,
  title,
  description,
  button,
  rightImage,
  className,
}: {
  topImage?: ReactNode;
  title: string;
  description?: string;
  button?: ReactNode;
  rightImage?: ReactNode;
  className?: string;
}) => {
  return (
    <Card className='!p-0'>
      {topImage}
      <div className={clsx('p-5', className)}>
        <div className='flex flex-col gap-4 justify-between h-full'>
          <div>
            <h3 className='text-base text-primary-black font-semibold mb-[10px]'>
              {title}
            </h3>
            <p className='text-sm text-primary-black font-normal'>
              {description}
            </p>
          </div>
          {button}
        </div>
        {rightImage}
      </div>
    </Card>
  );
};
