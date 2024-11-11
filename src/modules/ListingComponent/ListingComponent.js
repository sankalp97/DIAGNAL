import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './listingComponent.scss';
import SearchComponent from '../SearchComponent/SearchComponent';
import Image from '../ImageComponent/ImageComponent';

const ListingComponent = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [count, setCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false)
  const [filteredData, setFilteredData] = useState(paginatedData);
  const pageNo = useRef(1);
  const fetchMore = useRef(true);
  const canLoad = useRef(true);;
  const getData = async () => {
    if (fetchMore.current) {
      setLoading(true);
      canLoad.current = false;
      try {
        const res = await axios.get(`https://test.create.diagnal.com/data/page${pageNo.current}.json`);
        const { data: {
            page: {
                'content-items': { content = [] } = {},
                'total-content-items': totalContentItems,
            } = {},
            } = {} } = res || {};
        setCount(totalContentItems);
        pageNo.current += 1;
        setPaginatedData((prev) => [...prev, ...content]);
    } catch (e) {
        console.error(e, 'error');
      }
      setLoading(false);
      canLoad.current = true;
    }
  };

  const scrollHandler = (e) => {
    const scrollableHeight = e.target.scrollHeight;

    const currentScrollPosition = e.target.scrollTop + e.target.clientHeight;
    if (currentScrollPosition >= scrollableHeight - 50 && !loading && canLoad.current) {
      canLoad.current = false;
      getData();
    }
  };

  useEffect(() => {
    if(paginatedData.length === parseInt(count)) {
        fetchMore.current = false;
    }
  },[paginatedData])

  useEffect(() => {
    getData();
    const scrollContainer = document.querySelector('.listing-container');
    scrollContainer.addEventListener('scroll', scrollHandler);
    return () => {
      scrollContainer.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const onSearchClicked = () => {
    setSearchBarVisible(true);
  }
  
  const handleImageError = () => {
  }

  const dataToDisplay = filteredData.length ? filteredData : paginatedData;

  return (
    <section className="listing-container" style={{ overflowY: 'auto', height: '100vh' }}>
      <div className="listing-title">
        <div>
            <img src="https://test.create.diagnal.com/images/Back.png" alt="back-btn" />
            Romantic Comedy
        </div>
        <SearchComponent
            onSearchClicked={onSearchClicked}
            setSearchBarVisible={setSearchBarVisible}
            isSearchBarVisible={isSearchBarVisible}
            paginatedData={paginatedData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setPaginatedData={setPaginatedData}
        />    
      </div>
      <div className="paginated-data-container">
        {paginatedData.length === 0 && !loading && <p>No data available</p>}
        {paginatedData.length > 0 && dataToDisplay.map((item, index) => (
          <div className="cards" key={index}>
            <Image 
                src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
                alt={item.name}
                fallback={`https://test.create.diagnal.com/images/placeholder_for_missing_posters.png`}
            />
            {/* <img
                src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
                alt={item.name}

                // onError={handleImageError}
            /> */}
            <span className="card-name">{item.name}</span>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </section>
  );
};

export default ListingComponent;
