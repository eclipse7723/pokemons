export function formatUrl(params, pageNum) {
    if (isNaN(pageNum)) pageNum = 1;
    let offset = (pageNum-1) * params.itemsPerPage
    let url = `${params.baseUrl}?offset=${offset}&limit=${params.itemsPerPage}`
    return url
}