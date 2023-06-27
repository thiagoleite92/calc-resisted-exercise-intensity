import React from 'react';

type ButtonProps = {
  isDisabled: boolean;
  customClass: string;
  onClick: () => void;
  text: string;
};

export default function Button({
  isDisabled,
  customClass,
  onClick,
  text
}: ButtonProps) {
  return (
    <button className={customClass} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
}
