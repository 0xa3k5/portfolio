interface CraftTitleProps {
  title: string;
  date: string;
}

export const CraftTitle = ({ title, date }: CraftTitleProps) => {
  return (
    <div className="flex w-full flex-col gap-2 text-foam">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-xl font-light opacity-60">{date}</p>
    </div>
  );
};
