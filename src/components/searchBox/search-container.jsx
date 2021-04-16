import { useState } from "react";
import { getSearchData } from "../../services/data-handler";
import SearchView from "./search-view";

const SearchContainer = () => {
  const [searchData, setSearchData] = useState({});
  const inputChangeHandler = async (value) => {
    const result = await getSearchData(value);
    setSearchData({ ...result });
  };

  const loadMoreHandler = async (value, url) => {
    const result = await getSearchData(value, url);
    let updateResult = {
      info: result?.info,
      list: [...searchData.list, ...result.list],
    };
    setSearchData({ ...updateResult });
  };

  return (
    <SearchView
      onInputChange={inputChangeHandler}
      searchData={searchData}
      loadMoreData={loadMoreHandler}
    />
  );
};

export default SearchContainer;
