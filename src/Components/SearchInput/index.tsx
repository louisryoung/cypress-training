import IconSearch from "assets/svgs/icon-search.svg";

type SearchInputProps = {
  onChange: Function;
};

const SearchInput = ({ onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <img
        src={IconSearch}
        alt="icon-search"
        className="absolute px-[15px] py-[10px]"
      />
      <input
        className="border rounded w-[336px] h-[42px] pl-14"
        placeholder="Search names..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
