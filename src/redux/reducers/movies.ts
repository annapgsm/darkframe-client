import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../types/movie";

type MoviesState = {
  movies: {
    list: Movie[];
    filter: string;
  };
};

const initialState: MoviesState = {
  movies: {
    list: [],
    filter: "",
  },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies.list = action.payload;
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.movies.filter = action.payload;
    },
  },
});

export const { setMovies, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;

