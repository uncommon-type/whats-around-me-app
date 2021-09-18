import InstructionHeader from './InstructionHeader';
import AppViewOptions from './AppViewOptions';

const Instructions = ({ onViewChange, view }) => (
  <article className="instructions-group">
    <div className="instructions-group__inner">
      <div className="instruction">
        <InstructionHeader
          title={'Making your phone battery last longer'}
          number={1}
        />
        <p>Location sharing can quickly drain your battery.</p>
        <p>To save it, ajust how often the app refreshes with new data.</p>
        <p>Make adustments based on how you commute.</p>
      </div>
      <div className="instruction">
        <InstructionHeader title={"Managing your app's views"} number={2} />
        <p>Select the view you want to set as your default.</p>
        <AppViewOptions onViewChange={onViewChange} view={view} />
      </div>
    </div>
  </article>
);

export default Instructions;
