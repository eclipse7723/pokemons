import React, {useState, useEffect} from "react"
import LoadingSpinner from "../LoadingSpinner";
import PokemonListItem from "./PokemonListItem"
import Pagination from "../Pagination";
import { Row } from "react-bootstrap";


export function formatPokemonsUrl(params, pageNum) {
  if (isNaN(pageNum)) pageNum = 1;
  let offset = (pageNum-1) * params.itemsPerPage
  let url = `${params.baseUrl}?offset=${offset}&limit=${params.itemsPerPage}`
  return url
}

export default function PokemonList() {
    // list of jsons with pokemon name and url to its details:
    const [pokemons, setPokemons] = useState([])

    // pagination
    const [paginationParams, setPaginationParams] = useState({
      itemsPerPage: 20, curPageNumber: 1, baseUrl: 'https://pokeapi.co/api/v2/pokemon'
    })
    const [curPageUrl, setCurPageUrl] = useState(formatPokemonsUrl(paginationParams))
    
    function setMaxPageNumber(totalSize) {
      if (paginationParams.maxPageNumber === undefined)
        paginationParams.maxPageNumber = Math.ceil(totalSize / paginationParams.itemsPerPage)
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
    
    if (loading) return (<LoadingSpinner/>);

    return (<>
      <Pagination setCurPageUrl={setCurPageUrl} params={paginationParams} formatUrl={formatPokemonsUrl} />
      <Row className="g-4 justify-content-between" style={{marginRight: 0}}>
          { pokemons.map(p => 
            <PokemonListItem key={p.name} name={p.name} url={p.url}/>) }
      </Row>
    </>)
}