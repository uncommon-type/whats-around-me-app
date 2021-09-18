const InstructionHeader = ({ title, number }) => (
  <header className="instruction__header">
    <div>
      <span>{number}</span>
      <h3>{title}</h3>
    </div>
  </header>
);

export default InstructionHeader;
