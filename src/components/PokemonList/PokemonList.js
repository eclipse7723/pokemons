import React, {useState, useEffect} from "react"
import LoadingSpinner from "../LoadingSpinner";
import PokemonListItem from "./PokemonListItem"
import Pagination from "../Pagination";
import { Row } from "react-bootstrap";


export default function PokemonList() {
    const [pokemons, setPokemons] = useState([])

    // pagination handler
    const paginationParams = {offset: 20, limit: 20}
    const DEFAULT_START_PAGE_URL = `https://pokeapi.co/api/v2/pokemon`
    const [curPageUrl, setCurPageUrl] = useState(DEFAULT_START_PAGE_URL)
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [nextPageUrl, setNextPageUrl] = useState()
    
    // loading
    const [loading, setLoading] = useState(true)
    const controller = new AbortController()
    const signal = controller.signal
    useEffect(() => {
      setLoading(true)
      
      fetch(curPageUrl, {signal: signal})
        .then(response => response.json())
        .then(res => {
          setLoading(false)
          setNextPageUrl(res.next)
          setPrevPageUrl(res.previous)
          setPokemons(res.results)
        })
  
        return () => controller.abort()
    }, [curPageUrl])
  
    if (loading) return (<><LoadingSpinner/></>);
    
    return (<>
    <Pagination setCurPageUrl={setCurPageUrl, paginationParams}/>
    <Row className="g-4">
        { pokemons.map(p => 
        <PokemonListItem key={p.name} name={p.name} url={p.url}/>) }
    </Row>
    </>)
}