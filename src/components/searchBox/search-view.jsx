import { useEffect, useRef, useState } from "react";
import searchLogo from "../../search.svg";
import { debounce } from "../utils";
import "./search.css";

const SearchView = (props) => {
  const {
    searchData: { list, info },
    onInputChange,
    loadMoreData,
  } = props;

  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchBox = useRef(null);

  const renderSearchList = () => {
    return list.map(({ id, name }) => {
      return (
        <li key={id} className="list-item">
          {name}
        </li>
      );
    });
  };
  const scrollhandler = ({ scrollTop, scrollHeight, clientHeight }) => {
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (info && info.next) {
        loadMoreData(value, info.next);
      }
    }
  };
  const changeHandler = (value) => {
    setValue(value);
    onInputChange(value);
  };
  const debounceScrollHandler = debounce(scrollhandler, 250);

  const handleSearchClick = () => {
    if (!isSearching) {
      onInputChange("");
    }
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      searchBox.current.focus();
    }
  }, [isSearching]);

  return !isSearching ? (
    <div
      className="notsearch-box-container"
      onClick={() => handleSearchClick()}
    >
      <img src={searchLogo} alt="" className="search-icon" />
    </div>
  ) : (
    <div className="search-box-container">
      <div className="input-box-container">
        <img src={searchLogo} alt="" className="search-icon" />
        <input
          className="input-box"
          type="text"
          onChange={(e) => changeHandler(e.currentTarget.value)}
          value={value}
          ref={searchBox}
        />
      </div>
      {list && list.length ? <hr style={{ margin: "0px" }} /> : null}
      {list && list.length ? (
        <ul
          className="search-list-container"
          onScroll={(e) => debounceScrollHandler(e.currentTarget)}
        >
          {renderSearchList()}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchView;
