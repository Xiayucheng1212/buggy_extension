import React, { useContext, useEffect } from "react";

import AppContext from "../AppContext";

const SearchBar = (props) => {
  const searchBarInput = useContext(AppContext).searchBarInput;
  const setSearchBarInput = useContext(AppContext).setSearchBarInput;

  const handleInputChange = (event) => {
    props.handleSearch(event.target.value);
  }

  useEffect(() => {
    if (props.disabled) {
      setSearchBarInput("");
    }
  }, [props.disabled]);

  return (
    <div className="h-[40px] grow shrink basis-0 self-stretch flex-col justify-center items-center gap-[7.73px] inline-flex">
      <div className={`self-stretch grow shrink basis-0 pl-[8.70px] pr-[7.25px] ${!props.disabled && "hover:bg-zinc-200"} bg-zinc-100 rounded-[5px] justify-start items-center gap-[7.25px] inline-flex`}>
        <input className="w-full h-[24px] bg-transparent resize-none text-neutral-600 font-medium font-['Jost']"
          value={searchBarInput}
          onChange={handleInputChange}
          placeholder={props.disabled ? "" : "Search"}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default SearchBar;
