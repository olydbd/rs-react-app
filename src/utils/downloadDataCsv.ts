import type { RefObject } from 'react';

export function downloadDataCsv(
  data: Record<string, unknown>[],
  link: RefObject<HTMLAnchorElement | null>,
  columns: Record<string, string>[],
  format: (d: unknown[]) => string,
) {
  const csvString = [
    columns.map((c) => Object.values(c)[0]),
    ...data.map((d) => columns.map((c) => d[Object.keys(c)[0]] ?? '')),
  ]
    .map((row) => row.join(','))
    .join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  if (link.current) {
    link.current.href = url;
    link.current.download = format(data);
    link.current.click();
    URL.revokeObjectURL(url);
  }
}
