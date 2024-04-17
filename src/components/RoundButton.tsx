import React from 'react';
import classNames from 'classnames';

interface MyButtonProps {
  label: string;
  onClick: () => void;
  color: 'blue' | 'red'; // 'blue' 또는 'red'만 허용하는 타입 지정
}

const RoundButton: React.FC<MyButtonProps> = ({ label, onClick, color }) => {
  const buttonClasses = classNames(
    'cursor-pointer',
    'rounded-full',
    'font-semibold',
    'whitespace-nowrap',
    'px-4',
    'py-2',
    {
      'text-white': color === 'blue',
      'text-black': color === 'red',
    },
    {
      'bg-blue-500 hover:bg-blue-600': color === 'blue',
      'bg-red-500 hover:bg-red-600': color === 'red',
    }
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClasses}
    >
      {label}
    </button>
  );
};

export default RoundButton;
