import type { RefObject } from 'react';
import type { Character } from '../../utils/types';

export default function downloadDataCsv(
  data: Character[],
  link: RefObject<HTMLAnchorElement | null>,
) {
  const csvString = [
    ['Name', 'Status', 'Species'],
    ...data.map((c) => [c.name, c.status, c.species]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  if (link.current) {
    link.current.href = url;
    link.current.download = `${data.length}_items.csv`;
    link.current.click();
    URL.revokeObjectURL(url);
  }
}
