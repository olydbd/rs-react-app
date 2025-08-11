import type { ButtonHTMLAttributes } from 'react';

export default function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="cursor-pointer rounded-full bg-[#BFDE42] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#acc05a] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
      {...rest}
    >
      {children}
    </button>
  );
}
