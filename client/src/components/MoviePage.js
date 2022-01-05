import React from "react";
import "./MoviePage.css";
import { useState, useEffect} from "react";










const MoviePage = (props) => {


  const [error, setError] = useState(null);
  const [score, setScore] = useState('');
  const title = window.location.pathname.split("/").pop()


  useEffect(() => {
  const fetchScore = async () => {
    try {
      const response = await fetch("https://t7hapfpdr9.execute-api.eu-west-1.amazonaws.com/dev/movie_avg/"+title);
      const responseJson = await response.json();
      console.log()
      setError(false);
      setScore(responseJson);
    } catch (error) {
      setError(error);
    }
  };
  fetchScore()
  }, [title]);


  const displayScore = () => {

    if (error) {
      return "Erreur";
    } else {
      return score + "/5"
    }
  };



    return (
      <div className="MoviePage">
        <header className="MoviePage-header">
          <p className="MovieTitle">
            {decodeURI(title)}
          </p>
          <img className="MoveImage" src="https://fr.web.img4.acsta.net/medias/nmedia/18/36/02/52/18846059.jpg" alt="affiche"/>
          <p className="MovieScore">
            Score du film : {displayScore()}
          </p>
          <p className="MovieCategory">
            Catégorie : blablabla
          </p>
        </header>
      </div>
    );
  };
  
  export default MoviePage;
  