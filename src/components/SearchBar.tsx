import { ChangeEvent, FormEvent } from "react";
import "@/styles/search.css";

interface SearchBarProps {
  setSearch: Function;
  query: string;
  setQuery: Function;
}

export default function SearchBar({ setSearch, query, setQuery }: SearchBarProps) {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearch(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      className="searchbar flex w-full rounded-full h-[64px]"
      onSubmit={handleSearch}
    >
      <input
        className="searchbar__input h-full w-3/4 rounded-full px-[24px] font-normal"
        type="search"
        placeholder="Introduce un tema"
        value={query}
        onChange={handleChange}
      />
      <button
        className="searchbar__button rounded-full h-full w-1/4 font-medium"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}
