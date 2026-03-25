import { JSX, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { EmptyCircle, FilledCircle } from '../svg/AuthIcons';

interface InputProps
  extends Omit<JSX.IntrinsicElements['input'], 'placeholder' | 'label'> {
  label?: string;
  leadingIcon?: ReactNode;
  className?: string;
  placeHolder?: string;
  onClick?: () => void;
}

const options = [
  { key: 'As a brand?', value: 'as a brand' },
  {
    key: 'As an audience owner',
    value: 'as an audience owner',
  },
];

export function RadioInput({
  className,
  label,
  leadingIcon,
  placeHolder,
  onClick,
  ...rest
}: InputProps) {
  const [selected, setSelected] = useState(options[0].value);
  return (
    <div className='grid gap-5'>
      {options.map(({ key, value }) => {
        return (
          <div
            className='relative '
            key={value}
            onClick={() => setSelected(value)}
          >
            <span className='absolute left-[16px] transform top-1/2 -translate-y-2.5 cursor-pointer'>
              {selected === value ? <FilledCircle /> : <EmptyCircle />}
            </span>

            <input
              readOnly
              placeholder={key}
              className={clsx(
                'input full_rounded_input !pl-11 placeholder:!text-primary-black !text-base !font-semibold cursor-pointer',
              )}
              {...rest}
            />
          </div>
        );
      })}
    </div>
  );
}
