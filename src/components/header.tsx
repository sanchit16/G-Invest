type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
      <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
    </header>
  );
}
