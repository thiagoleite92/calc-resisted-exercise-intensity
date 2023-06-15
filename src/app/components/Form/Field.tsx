import { HTMLAttributes } from 'react';

type FieldProps = HTMLAttributes<HTMLDivElement>;

export function Field(props: FieldProps) {
  return <div className='' {...props} />;
}
