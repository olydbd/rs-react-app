import type { Character } from '../../utils/types';

interface CardDetailsProps {
  data: Character;
}

export default function CardDetails({ data }: CardDetailsProps) {
  const { name, status, species, gender, origin, location, image } = data;

  return (
    <>
      <img src={image} alt={name} className="mb-4 w-full rounded" />
      <ul className="space-y-2 dark:text-white">
        <li className="text-xl">
          <strong>Galactic Registry — Citadel of Ricks</strong>
        </li>
        <li>
          <strong>Subject: </strong> {name}
        </li>
        <li>
          <strong>Species: </strong> {species}
        </li>
        <li>
          <strong>Gender: </strong> {gender}
        </li>
        <li>
          <strong>Status: </strong> {status}
        </li>
        <li>
          <strong>Last Known Location: </strong>{' '}
          {location.name !== 'unknown'
            ? location.name
            : 'Location data is currently unavailable.'}
        </li>
        <li>
          <strong>Origin: </strong>{' '}
          {origin.name !== 'unknown'
            ? origin.name
            : 'Origin details remain unverified or classified.'}
        </li>
        <li>
          <strong>Notes:</strong>{' '}
          {`Subject exhibits typical behavior for species ${species}, with no exceptional traits reported. Current status ${status !== 'unknown' ? 'confirmed' : 'currently unverified or unknown'}, though subject's survival beyond this report is subject to cosmic probability and/or Rick-level chaos.`}
        </li>
        <li>
          {origin.name !== 'unknown' ? (
            <>
              Origin details have been recorded as{' '}
              <strong>{origin.name}</strong>.
            </>
          ) : (
            <>Origin details remain unverified or classified.</>
          )}
        </li>
        <li>
          {location.name !== 'unknown' ? (
            <>
              Last known location is documented as{' '}
              <strong>{location.name}</strong>.
            </>
          ) : (
            <>Location data is currently unavailable.</>
          )}
        </li>
        <li>Monitoring continues.</li>
      </ul>
    </>
  );
}
