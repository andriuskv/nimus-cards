export default function Icon({ name, title, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {title && <title>{title}</title>}
      <use href={`#${name}`}></use>
    </svg>
  );
}
