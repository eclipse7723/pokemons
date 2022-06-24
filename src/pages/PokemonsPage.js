import React, { useState } from "react";
import PokemonList from "../components/PokemonList/PokemonList";
import Pagination from "../components/Pagination";
import { formatUrl } from "../utils";


export default function PokemonsPage() {

    // pagination
    const [paginationParams, setPaginationParams] = useState({
        itemsPerPage: 20, curPageNumber: 1, baseUrl: 'https://pokeapi.co/api/v2/pokemon'
    })
    const [curPageUrl, setCurPageUrl] = useState(formatUrl(paginationParams))
    const [maxPageNumber, setMaxPageNumber] = useState()


    return (<>
    <div className="container-md" style={{paddingRight: 0}}>
        <Pagination
            setCurPageUrl={setCurPageUrl}
            params={paginationParams}
            formatUrl={formatUrl}
            maxPageNumber={maxPageNumber} />
        
        <PokemonList
            curPageUrl={curPageUrl}
            paginationParams={paginationParams}
            setMaxPageNumber={setMaxPageNumber} />

        <div style={{float: "right", marginTop: "16px"}}>
        <Pagination
            setCurPageUrl={setCurPageUrl}
            params={paginationParams}
            formatUrl={formatUrl}
            maxPageNumber={maxPageNumber} />
        </div>
    </div>
    </>)
}