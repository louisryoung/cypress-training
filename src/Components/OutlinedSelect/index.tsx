import { Option } from "constants/types";

type SelectProps = {
  label: string;
  options: Option[];
  onChange: Function;
};

const OutlinedSelect = ({ label, options, onChange }: SelectProps) => {
  return (
    <div className="relative">
      <div className="absolute px-3 top-[-10px] text-[#828282] text-[14px] bg-white left-[25px]">
        <label className="min-w-[70px]">{label}</label>
      </div>
      <select
        className="w-[250px] h-10 border border-[#E0E0E0] rounded px-4 capitalize"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.length &&
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default OutlinedSelect;
