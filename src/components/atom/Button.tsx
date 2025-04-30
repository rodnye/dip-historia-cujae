import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

export function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-primary px-3 py-2 font-bold text-primary-content"
    >
      {children}
    </button>
  );
}
