interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className="flex h-[25vh] w-full items-center justify-center text-center">
      <h2 className="text-4xl font-bold text-[#42B4CA] uppercase md:text-6xl dark:text-fuchsia-600">
        {text}
      </h2>
    </div>
  );
}
