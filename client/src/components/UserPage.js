import React from "react";
import "./UserPage.css";
import { useState, useEffect } from "react";



const UserPage = (props) => {

  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const user = props.user;



  useEffect(() => {
    const fetchMovieGrade = async () => {
      try {
        const response = await fetch("https://t7hapfpdr9.execute-api.eu-west-1.amazonaws.com/dev/list_movie_grade/"+user);
        const responseJson = await response.json();
        setError(false);
        setItems(responseJson);
        console.log(responseJson)
      } catch (error) {
        setError(error);
      }
    };
    fetchMovieGrade();
  }, [user]);
  
  const displayMoviesGrade = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <ul>
            {items.map((item) => (<li>{item}</li>))}
          </ul>
        </div>
      );
    }
  };


    
  return (
    <div className="UserPage">
      <header className="UserPage-header">
        <p className="UserWelcome">
          Bienvenue, {user}.
        </p>
        <div className="UserColonneGauche">
          Liste des films déja vus : 
          {displayMoviesGrade()}
        </div>
        <div className="UserColonneDroite">
            Films à voir :
        </div>
      </header>
    </div>
  );
};
  
  export default UserPage