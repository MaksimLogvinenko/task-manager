import React, { ChangeEvent } from "react";

interface SearchT {
  placeholder: string;
  value: string;
  onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchT> = ({
  placeholder,
  value,
  onChangeSearchInput,
}) => {
  return (
    <label className="input input-bordered input-sm flex items-center gap-2">
      <input
        type="search"
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={onChangeSearchInput}
      />
    </label>
  );
};

export default React.memo(SearchInput);
