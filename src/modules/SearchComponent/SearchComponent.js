import React, { useState, useRef } from 'react';

const SearchComponent = ({
    onSearchClicked = () => {},
    isSearchBarVisible = false,
    setSearchBarVisible = () => {},
    paginatedData = [],
    filteredData = [],
    setFilteredData = () => {},
}) => {
    const [, setSearchTerm] = useState("");
    const timeoutRef = useRef(null);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(value === "") {
                setFilteredData([]);
            }
            else {
                const filtered = paginatedData.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
              );
              setFilteredData(filtered);
            }
        }, 300); 
      };
    

    return (
        <div className="search-container">
            <button className="search-button"
                onClick={onSearchClicked}
            >
                <img
                    src="https://test.create.diagnal.com/images/search.png"
                    alt="search"
                />
            </button>
            {isSearchBarVisible ? <input
                type="text"
                className="search-input"
                placeholder="Search..."
                autoFocus={isSearchBarVisible}
                onChange={onSearchChange}
                onBlur={() => setSearchBarVisible(false)}
            /> : ''}
        </div>
    )
}

export default SearchComponent;