//Shows query suggestions
const SuggestionCards = ({ text }: { text: string }) => {
  return (
    <div className="card-box">
      <p className="card-text">{text}</p>
    </div>
  );
};

export default SuggestionCards;
