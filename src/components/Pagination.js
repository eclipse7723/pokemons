import { Pagination as BPagination } from 'react-bootstrap'
import {useState} from 'react'


export function formatPokemonsUrl(params, pageNum) {
    if (isNaN(pageNum)) pageNum = 1;
    let offset = (pageNum-1) * params.cardsPerPage
    let url = `${params.baseUrl}?offset=${offset}&limit=${params.cardsPerPage}`
    return url
}


export default function Pagination({setCurPageUrl, params}) {
    // const paginationParams = getPaginationParams()
    const [maxPageNumber, setMaxPageNumber] = useState(params.maxPageNumber)

    function changePage(pageNum) {
        let url = formatPokemonsUrl(params, pageNum)
        console.log(url)
        setCurPageUrl(url)
        params.curPageNumber = pageNum
    }

    function gotoNextPage() {
        let nexPageNum = Math.min(params.curPageNumber+1, maxPageNumber)
        changePage(nexPageNum)
    }

    function gotoPrevPage() {
        let nexPageNum = Math.max(params.curPageNumber-1, 1)
        changePage(nexPageNum)
    }

    return (<>
    <BPagination>
        {params.curPageNumber !== 1 && <BPagination.Item onClick={() => changePage(1)}>{1}</BPagination.Item>}
        {params.curPageNumber == (maxPageNumber) && <BPagination.Ellipsis/>}
        
        {params.curPageNumber > 2 && <BPagination.Prev onClick={gotoPrevPage}/>}
        
        <BPagination.Item active>{params.curPageNumber}</BPagination.Item>

        {params.curPageNumber < (maxPageNumber-1) && <BPagination.Next onClick={gotoNextPage}/>}
        
        {params.curPageNumber <= 2 && <BPagination.Ellipsis/>}
        {params.curPageNumber !== maxPageNumber &&
            <BPagination.Item onClick={() => changePage(maxPageNumber)}>{maxPageNumber}</BPagination.Item>}
    </BPagination>
    </>)
}