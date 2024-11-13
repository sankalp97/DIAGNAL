import React, { useRef } from 'react';

const SearchComponent = ({
    onSearchClicked = () => {},
    isSearchBarVisible = false,
    setSearchBarVisible = () => {},
    paginatedData = [],
    filteredData = [],
    setFilteredData = () => {},
    setSearchTerm = () => {},
    searchTerm = ''
}) => {
    const MIN_CHAR = 3;
    const MAX_CHAR = 20;
    const timeoutRef = useRef(null);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length < MAX_CHAR) {
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
        }
      };
    

    return (
        <div className="search-container">
             {isSearchBarVisible ? <input
                type="text"
                className="search-input"
                placeholder="Search..."
                autoFocus={isSearchBarVisible}
                value={searchTerm}
                onChange={onSearchChange}
                onBlur={() => setSearchBarVisible(false)}
            /> : ''}
            <button className="search-button"
                onClick={onSearchClicked}
            >
                <img
                    src="https://test.create.diagnal.com/images/search.png"
                    alt="search"
                />
            </button>
        </div>
    )
}

export default SearchComponent;