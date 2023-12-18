import { Input } from "@/components/ui/input";
import { useGetPokemonsQuery } from "@/store/services/pokeapi";
import { useCallback, useEffect, useRef, useState } from "react";
import PokemonListItem from "@/components/PokemonListItem";
import { addSearch } from "@/store/slices/searchHistory";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  increaseOffset,
  setPokemonList,
  setSearchTerm,
} from "@/store/slices/pokemon";
import {
  selectPaginatedPokemon,
  selectPokemonList,
  selectSearchTerm,
} from "@/store/selectors";

export default function PokemonList() {
  const { data, error, isLoading } = useGetPokemonsQuery({
    limit: 1292,
    offset: 0,
  });
  const dispatch = useAppDispatch();

  const paginatedPokemon = useAppSelector(selectPaginatedPokemon);
  const allPokemon = useAppSelector(selectPokemonList);
  const searchTerm = useAppSelector(selectSearchTerm);

  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    if (data && allPokemon.length === 0) {
      dispatch(setPokemonList(data.results));
    }
  }, [data, dispatch, allPokemon]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      dispatch(setSearchTerm(""));
    }
  };
  const handleSearchClick = () => {
    if (inputValue) {
      dispatch(setSearchTerm(inputValue));
      dispatch(addSearch(inputValue));
    }
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(increaseOffset());
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, isLoading]
  );

  return (
    <main className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1 grow">
            <h1 className="text-2xl font-bold tracking-tight">Pokedex</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your ultimate Pokemon reference!
            </p>
          </div>

          <div className="flex w-full items-center space-x-2">
            <Input
              aria-label="Search Pokedex"
              placeholder="Search Pokedex..."
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
            <Button type="submit" onClick={handleSearchClick}>
              Search
            </Button>
            <Button variant="link" asChild>
              <Link
                className="text-sm underline text-blue-500 inline-block"
                to="/search-history"
              >
                View Search History
              </Link>
            </Button>
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error occurred: {error.toString()}</div>}
        {paginatedPokemon.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {paginatedPokemon.map((pokemon, index) => (
              <Link to={`/${pokemon.name}`}>
                {paginatedPokemon.length === index + 30 ? (
                  <PokemonListItem
                    key={pokemon.name}
                    name={pokemon.name}
                    ref={lastPokemonElementRef}
                  />
                ) : (
                  <PokemonListItem key={pokemon.name} name={pokemon.name} />
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div>No Pokemon found.</div>
        )}
      </div>
    </main>
  );
}
