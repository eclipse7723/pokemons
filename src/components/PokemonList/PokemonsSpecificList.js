import React, {useState} from "react"
import LoadingSpinner from "../LoadingSpinner";
import PokemonListItem from "./PokemonListItem"
import { Row } from "react-bootstrap";


export default function PokemonSpecificList({pokemonsIds}) {
    // list of jsons with pokemon urls to its details:
    const [pokemons, setPokemons] = useState(null)

    if (pokemons === null) {
        let pokemonUrls = []
        pokemonsIds.forEach(id => {
            pokemonUrls.push({id: id, url: `https://pokeapi.co/api/v2/pokemon/${id}`})
        });
        setPokemons(pokemonUrls)
    
        return <LoadingSpinner/>;
    }

    return (<>
      <Row className="g-4 justify-content-around pokemon-list" style={{marginRight: 0}}>
          { pokemons.map(p => 
            <PokemonListItem key={p.id} url={p.url}/>) }
      </Row>
    </>)
}