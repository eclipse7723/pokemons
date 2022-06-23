import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList/PokemonList"
import LoadingPage from "./components/LoadingSpinner";

function App() {
  return (<>
    <Header/>
    <PokemonList/>
    </>);
}

export default App;
