export function formatUrl(params, pageNum) {
    if (isNaN(pageNum)) pageNum = 1;
    let offset = (pageNum-1) * params.itemsPerPage
    let url = `${params.baseUrl}?offset=${offset}&limit=${params.itemsPerPage}`
    return url
}

export function findStat(statsList, name) {
    return statsList.find(params => params.stat.name == name)
}

export function SVG(name, width, height, fill) {
    return (<img src={`/svg/${name}.svg`} width={width} height={height} fill={fill}/>);
}