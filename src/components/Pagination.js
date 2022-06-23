import { Pagination as BPagination } from 'react-bootstrap'
import {useState} from 'react'


export default function Pagination({setCurPageUrl, params, formatUrl}) {
    /* {params} should be an Object with these properties: maxPageNumber, curPageNumber */

    const [maxPageNumber, setMaxPageNumber] = useState(params.maxPageNumber)

    function changePage(pageNum) {
        let url = formatUrl(params, pageNum)
        console.log(url)    // debug
        setCurPageUrl(url)
        params.curPageNumber = pageNum
    }

    function gotoNextPage() {
        if (params.curPageNumber == maxPageNumber) return;
        changePage(params.curPageNumber+1)
    }

    function gotoPrevPage() {
        if (params.curPageNumber == 1) return;
        changePage(params.curPageNumber-1)
    }

    if (maxPageNumber <= 5) {
        // [1] [2] [3] [4] [5]
        return (<>
            <BPagination>
                {[...Array(maxPageNumber).keys()].map(i => {
                    i += 1
                    if (params.curPageNumber === i)
                        return <BPagination.Item active>{i}</BPagination.Item>;
                    else
                        return <BPagination.Item onClick={() => changePage(i)}>{i}</BPagination.Item>;
                })}
            </BPagination>
        </>)
    } else {
        // [1] [<] [CUR] [>] [10]
        return (<>
            <BPagination>
                <BPagination.Item disabled={params.curPageNumber == 1} onClick={() => changePage(1)}>{1}</BPagination.Item>

                {/* <BPagination.Item disabled>/</BPagination.Item> */}
                <BPagination.Prev disabled={params.curPageNumber == 1} onClick={gotoPrevPage}/>
                
                <BPagination.Item active>{params.curPageNumber}</BPagination.Item>
        
                <BPagination.Next disabled={params.curPageNumber == maxPageNumber} onClick={gotoNextPage}/>
                {/* <BPagination.Item disabled>/</BPagination.Item> */}

                <BPagination.Item disabled={params.curPageNumber == maxPageNumber} onClick={() => changePage(maxPageNumber)}>{maxPageNumber}</BPagination.Item>
            </BPagination>
        </>)
    }
}