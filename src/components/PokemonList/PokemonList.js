import React, {useState, useEffect, useRef} from "react"
import LoadingSpinner from "../LoadingSpinner";
import PokemonListItem from "./PokemonListItem"
import Pagination, {formatPokemonsUrl} from "../Pagination";
import { Row } from "react-bootstrap";


export default function PokemonList() {
    const [pokemons, setPokemons] = useState([])

    // pagination
    const [paginationParams, setPaginationParams] = useState({
      cardsPerPage: 20, curPageNumber: 1, baseUrl: 'https://pokeapi.co/api/v2/pokemon'
    })
    const [curPageUrl, setCurPageUrl] = useState(formatPokemonsUrl(paginationParams))
    
    function setMaxPageNumber(totalSize) {
      if (paginationParams.maxPageNumber === undefined) {
        paginationParams.maxPageNumber = Math.ceil(totalSize / paginationParams.cardsPerPage)
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
          setMaxPageNumber(res.count)
          setLoading(false)
        })
  
        return () => controller.abort()
    }, [curPageUrl])
  
    if (loading) return (<><LoadingSpinner/></>);
    
    return (<>
    <div className="container-md ">
    <Pagination setCurPageUrl={setCurPageUrl} params={paginationParams} />
    
    <Row className="g-4 justify-content-between" style={{marginRight: 0}}>
        { pokemons.map(p => 
        <PokemonListItem key={p.name} name={p.name} url={p.url}/>) }
    </Row>
    </div>
    </>)
}