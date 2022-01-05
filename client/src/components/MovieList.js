import React from "react";
import "./MovieList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://t7hapfpdr9.execute-api.eu-west-1.amazonaws.com/dev/movie/list");
        const responseJson = await response.json();
        setError(false);
        setItems(responseJson);
        console.log(responseJson)
      } catch (error) {
        setError(error);
      }
    };
    fetchMovies();
  }, []);



  const displayMovies = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
        <ul>
          {items.map((item) => (
          <li>
            <Link className="MovieListList" key={item.uuid} to={"/film/"+item.uuid}>{item.uuid}</Link>
          </li>
          ))}
        </ul>
        </div>
        
      );
    }
  };


    return (
      <div className="MovieList">
        <header className="MovieList-header">
          <p className="MovieListTitle">
            Liste des films disponibles
          </p>
          <p className="MovieListList">
            {displayMovies()}
          </p>
        </header>
      </div>
    );
  };
  
  
    export default MovieList;
  