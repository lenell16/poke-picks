import PokemonListItem from "@/components/PokemonListItem";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { selectSearchHistoryWithPokemon } from "@/store/selectors";

export default function PokemonList() {
  const searchedPokemon = useAppSelector(selectSearchHistoryWithPokemon);

  return (
    <main className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="grid grid-cols-[max-content_1fr] gap-4 md:gap-8">
          <div className="grid gap-1 w-auto">
            <h1 className="text-2xl font-bold tracking-tight">Pokedex</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your ultimate Pokemon reference!
            </p>
          </div>

          <div className="justify-self-end flex w-auto items-center space-x-2">
            <Button variant="link" asChild>
              <Link
                className="text-sm underline text-blue-500 inline-block"
                to="/"
              >
                Back to list
              </Link>
            </Button>
          </div>
        </div>
        {searchedPokemon && (
          <div>
            {Object.entries(searchedPokemon).length > 0 ? (
              Object.entries(searchedPokemon).map(
                ([searchTerm, pokemonList]) => (
                  <div key={searchTerm}>
                    <h2 className="text-xl font-bold mt-4">{searchTerm}</h2>
                    {pokemonList.length === 0 ? (
                      <p>No search results found.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {pokemonList.map((pokemon) => (
                          <Link to={`/${pokemon.name}`} key={pokemon.name}>
                            <PokemonListItem name={pokemon.name} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )
            ) : (
              <p>No previous searches found.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
