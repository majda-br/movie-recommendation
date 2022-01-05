import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import MoviePage from "./components/MoviePage";
import MovieList from "./components/MovieList";
import UserPage from "./components/UserPage";
import PokemonDisplayer from "./components/PokemonDisplayer";
import "./App.css";
import { useState}from "react";

function App() {
  const [selecteduser, setselectedUser] = useState('')

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className="Color">
              <Link to="/" className="Color">Home</Link>
            </li>
            <li className="Color">
              <Link to="/liste_films" className="Color">Liste des films</Link>
            </li>
            <li className="Color">
              <Link to="/demo" className="Color">Demo</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/liste_films">
            <MovieList />
          </Route>
          <Route path="/user">
            <UserPage  user={selecteduser}/>
          </Route>
          <Route path="/film">
            <MoviePage/>
          </Route>
          <Route path="/demo">
            <PokemonDisplayer/>
          </Route>
          <Route path="/">
            <HomePage setselectedUser={setselectedUser}/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
