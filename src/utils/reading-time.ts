export const getReadingTime = (content: string): string => {
  const wordsPerMinute = 200;

  const textOnly = content.replace(/<[^>]*>/g, ' ');
  const wordCount = textOnly
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const exactMinutes = wordCount / wordsPerMinute;
  const minutes = Math.floor(exactMinutes);
  const seconds = Math.floor((exactMinutes % 1) * 60);

  if (minutes < 1) {
    return seconds < 30 ? 'Menos de 1 min' : '1 min';
  }

  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? 's' : ''}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} h ${remainingMinutes} min`;
};
