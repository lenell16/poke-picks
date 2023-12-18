import { createSlice } from "@reduxjs/toolkit";
import { PokeAPI } from "pokeapi-types";

const INITIAL_LIMIT = 50;

interface PokemonState {
  list: PokeAPI.NamedAPIResource[];
  searchTerm: string;
  offset: number;
  limit: number;
}

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    searchTerm: "",
    offset: 0,
    limit: INITIAL_LIMIT,
  } as PokemonState,
  reducers: {
    setPokemonList: (state, action) => {
      state.list = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.offset = 0;
    },
    increaseOffset: (state) => {
      state.offset += state.limit;
    },
  },
});

export const { setPokemonList, setSearchTerm, increaseOffset } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
