import pickleIcon from '../../../assets/images/pickle.png';

export default function Spinner() {
  return (
    <img
      src={pickleIcon}
      alt="Loading..."
      role="status"
      aria-label="Loading..."
      className="h-15 w-15 animate-spin"
    />
  );
}
