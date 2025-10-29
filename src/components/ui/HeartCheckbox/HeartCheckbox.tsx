export interface HeartCheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HeartCheckbox(props: HeartCheckboxProps) {
  return (
    <div className="flex w-full gap-2">
      <input
        className="peer relative mt-1 h-7 w-7 shrink-0 cursor-pointer appearance-none"
        type="checkbox"
        {...props}
      />
      <svg
        className="pointer-events-none absolute mt-1 h-6 w-6 fill-none stroke-white drop-shadow-md peer-checked:!fill-red-500 dark:stroke-gray-900 dark:peer-checked:!fill-red-700"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </div>
  );
}
