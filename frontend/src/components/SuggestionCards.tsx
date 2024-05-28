const SuggestionCards = ({text} : {text:string}) => {
  return (
    <div
      className="block max-w-[30rem] h-[5rem] min-w-[10rem] p-6 bg-white border border-gray-200 
        rounded-lg shadow hover:bg-gray-100"
    >
      <p className="font-normal text-gray-700">
      {text}
      </p>
    </div>
  );
};

export default SuggestionCards;
