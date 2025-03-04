import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import "./Home.scss";
import {
  fetchAsyncMovie,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  console.log("Home");
  useEffect(() => {
    dispatch(fetchAsyncMovie());
    dispatch(fetchAsyncShows());
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
