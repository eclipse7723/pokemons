import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList/PokemonList"

function App() {
  return (<>
    <Header/>
    <PokemonList/>
    </>);
}

export default App;
