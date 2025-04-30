const colors = [
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-teal-600',
  'bg-violet-600',
  'bg-emerald-600',
  'bg-azure-500',
];

export const getBgColorFromHash = (input: string) => {
  const hash = Array.from(input).reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0,
  );

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
