import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovie,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import "./Header.scss";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncMovie(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search a movies or shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
