const RadioItem = ({ name, view, onViewChange }) => (
  <li>
    <input
      type="radio"
      id={name}
      name={name}
      value={name}
      checked={view === name}
      onChange={() => onViewChange(name)}
    />
    <label htmlFor={name}>{name}</label>
  </li>
);

export default RadioItem;
