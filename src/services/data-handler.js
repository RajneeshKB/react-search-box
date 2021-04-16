import { formatData } from "../components/utils";

export const getSearchData = (searchValue, url) => {
  const apiUrl =
    url || `https://rickandmortyapi.com/api/character/?name=${searchValue}`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => formatData(data));
};
