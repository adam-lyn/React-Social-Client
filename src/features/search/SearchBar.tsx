import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { reverbClient } from "../../remote/reverb-api/reverbClient";
import ResultsList from './ResultsList';
import SearchResult from './SearchResult';

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [initialResults, setInitialResults] = useState<SearchResult[]>([]);
  const type:string = "people";
  const history = useHistory();

  async function getSearch() {
    const resp = await reverbClient.get(`/api/search?query=${input}`);
    if (resp.status.toString()[0] != "2") {
      console.log(resp.data);
    }
    setInitialResults(resp.data.responses);
  }

  // Queries the DB only when the first character is typed into search bar. The results are then stored in initialResults (for further filtering) until the search bar is cleared (by backspacing, for instance)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.length == 0) {
      setInitialResults([]);
      getSearch()
    }
    setInput(e.target.value);
  }

  const handleNavigate = (url:string) => {
    // console.log(url)
    history.replace(url)
    setInput("");
  }

  const renderSearchResults = (type:string) => {
    if (input) {
      let results:SearchResult[] = [];
      if (initialResults.length) {
        results = initialResults.filter(
          result => result.email.includes(input)
        );
        if (results.length) {
          return (<ResultsList handleClick = {handleNavigate} results={results.slice(0, 8)} type={type} />);
        }
      }
      return (<ResultsList handleClick = {handleNavigate} results={results} type={type} />);
    }
  }

  return (
    <div id='search-container'>
      <input
        placeholder="Search for People"
        aria-label="search-input"
        aria-describedby="basic-addon1"
        value={input}
        onChange={handleChange}
      />
      {renderSearchResults(type)}
    </div>
  );
}
