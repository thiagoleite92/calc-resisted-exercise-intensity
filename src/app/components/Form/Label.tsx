/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { LabelHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <label
      className={`${
        errors[props?.htmlFor!] ? 'text-red-400' : 'text-yellow-400'
      } flex items-center justify-between text-sm`}
      {...props}
    />
  );
}
