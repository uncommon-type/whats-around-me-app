import RadioItem from './RadioItem.js';

const viewOptions = [
  { name: 'Map', id: '01' },
  { name: 'List', id: '02' },
];

const Instructions = ({ onViewChange, view }) => (
  <article className="instructions-group">
    <div className="instructions-group__inner">
      <div className="instruction">
        <header className="instruction__header">
          <div>
            <span>1</span>
            <h3>
              Making your phone battery last longer when location sharing is on
            </h3>
          </div>
        </header>
        <p>
          Sharing your location with the app can quickly drain your phone's
          battery.
        </p>
        <p>Save it by adjusting how often the app refreshes with new data.</p>
        <p>Make adjustments based on how you commute.</p>
      </div>
      <div className="instruction">
        <header className="instruction__header">
          <div>
            <span>2</span>
            <h3>Managing your app's views</h3>
          </div>
        </header>

        <p>Select the view you want to set as your default.</p>
        <form>
          <ul className="default-view-options">
            {viewOptions.map((item) => {
              const { id, name } = item;
              return (
                <RadioItem
                  key={id}
                  name={name}
                  view={view}
                  onViewChange={onViewChange}
                />
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  </article>
);

export default Instructions;
