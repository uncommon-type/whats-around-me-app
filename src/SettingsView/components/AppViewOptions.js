const VIEWS = [
  { name: 'Map', id: '01' },
  { name: 'List', id: '02' },
];

const AppViewOptions = ({ onViewChange, view }) => (
  <form>
    <ul className="default-view-options">
      {VIEWS.map((item) => {
        const { id, name } = item;
        return (
          <li key={id}>
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
      })}
    </ul>
  </form>
);

export default AppViewOptions;
