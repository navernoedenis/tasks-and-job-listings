export function normalizeDate(date: Date | string): string {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
}

export function normalizeSlug(
  slug: string,
  type: 'lowercase' | 'uppercase' | 'up-first-letter' = 'up-first-letter'
) {
  const value = slug.replace(/(_|-)/g, ' ').toLocaleLowerCase();

  if (type === 'up-first-letter') {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

  if (type === 'uppercase') {
    return value.toUpperCase();
  }

  return value;
}
