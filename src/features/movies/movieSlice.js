import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/MovieApiKey";
import movieApi from "../../common/apis/MovieApi";

export const fetchAsyncMovie = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term ?? "prince"}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term ?? "world"}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovie.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchAsyncMovie.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, movies: action.payload };
    });
    builder.addCase(fetchAsyncMovie.rejected, () => {
      console.log("rejected");
    });
    builder.addCase(fetchAsyncShows.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      console.log("fullfilled");
      return { ...state, shows: action.payload };
    });
    builder.addCase(fetchAsyncShows.rejected, () => {
      console.log("rejected");
    });
    builder.addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
      console.log("fulfilled");
      return { ...state, selectMovieOrShow: action.payload };
    });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;
