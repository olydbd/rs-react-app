import type { RefObject } from 'react';
import type { Character } from '../../utils/types';
import { downloadDataCsv } from '../../utils/downloadDataCsv';

export default function downloadCharactersCsv(
  data: Character[],
  link: RefObject<HTMLAnchorElement | null>,
) {
  downloadDataCsv(
    data,
    link,
    [{ name: 'Name' }, { status: 'Status' }, { species: 'Species' }],
    (d) => `${d.length}_items.csv`,
  );
}
