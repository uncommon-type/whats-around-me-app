const Card = ({ location }) => {
  const { pageid: id, title } = location;

  return (
    <a
      href={`https://en.wikipedia.org/?curid=${id}`}
      aria-label={`Read more about ${title}`}
      key={id}
    >
      <img
        src={
          location.thumbnail?.source ||
          `${process.env.PUBLIC_URL}/placeholder.png`
        }
        alt=""
      />
      <span>{title}</span>
    </a>
  );
};

export default Card;
