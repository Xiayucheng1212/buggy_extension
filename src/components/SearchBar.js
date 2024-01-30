import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch = () => {
    // Perform search logic here
    console.log("Searching for:", this.state.searchTerm);
  }

  render() {
    return (
        <div className="h-[40px] grow shrink basis-0 self-stretch flex-col justify-center items-center gap-[7.73px] inline-flex">
          <div className="self-stretch grow shrink basis-0 pl-[8.70px] pr-[7.25px]  hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-start items-center gap-[7.25px] inline-flex">
                <input className="w-full h-[24px] bg-transparent resize-none text-neutral-600 text-xs font-medium font-['Jost']"  value={this.state.searchTerm} onChange={this.handleInputChange} />
          </div>
        </div>
    );
  }
}

export default SearchBar;
