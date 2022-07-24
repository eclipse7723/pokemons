import React, {useState, useEffect} from "react"
import LoadingSpinner from "../LoadingSpinner";
import PokemonListItem from "./PokemonListItem"
import { Row } from "react-bootstrap";


export default function PokemonList({curPageUrl, paginationParams, setMaxPageNumber}) {
    // list of jsons with pokemon name and url to its details:
    const [pokemons, setPokemons] = useState([])

    function updateMaxPageNumber(totalSize) {
      if (isNaN(paginationParams.maxPageNumber)) {
        const maxPageNumber = Math.ceil(totalSize / paginationParams.itemsPerPage)
        setMaxPageNumber(maxPageNumber)
      }
    }

    // loading
    const [loading, setLoading] = useState(true)
    const controller = new AbortController()
    const signal = controller.signal
    useEffect(() => {
      setLoading(true)
      
      fetch(curPageUrl, {signal: signal})
        .then(response => response.json())
        .then(res => {
          setPokemons(res.results)
          updateMaxPageNumber(res.count)
          setLoading(false)
        })
  
        return () => controller.abort()
    }, [curPageUrl])
    
    if (loading) return (<LoadingSpinner/>);

    return (<>
      <Row className="g-4 justify-content-around pokemon-list" style={{marginRight: 0}}>
          { pokemons.map(p => 
            <PokemonListItem key={p.name} name={p.name} url={p.url}/>) }
      </Row>
    </>)
}