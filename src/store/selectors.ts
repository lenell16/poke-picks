import { RootState } from "./";
import { createSelector } from "@reduxjs/toolkit";
import { PokeAPI } from "pokeapi-types";

export const selectPokemonList = (state: RootState) => state.pokemon.list;
export const selectSearchTerm = (state: RootState) => state.pokemon.searchTerm;
export const selectOffset = (state: RootState) => state.pokemon.offset;
export const selectLimit = (state: RootState) => state.pokemon.limit;
export const selectSearchHistory = (state: RootState) => state.searchHistory;

export const selectFilteredPokemon = createSelector(
  [selectPokemonList, selectSearchTerm],
  (list, searchTerm) =>
    list.filter((pokemon) => pokemon.name.includes(searchTerm.toLowerCase()))
);

export const selectPaginatedPokemon = createSelector(
  [selectFilteredPokemon, selectOffset, selectLimit],
  (filteredPokemon, offset, limit) => filteredPokemon.slice(0, offset + limit)
);

export const selectSearchHistoryWithPokemon = createSelector(
  [selectSearchHistory, selectPokemonList],
  (searchHistory, allPokemon) =>
    searchHistory.reduce(
      (acc: Record<string, PokeAPI.NamedAPIResource[]>, searchTerm) => {
        acc[searchTerm] = allPokemon.filter((pokemon) =>
          pokemon.name.includes(searchTerm)
        );
        return acc;
      },
      {}
    )
);
