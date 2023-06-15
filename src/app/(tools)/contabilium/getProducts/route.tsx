import { fetchCb } from "../utils/fetchCb"

const POST = async (request:Request)=>{
    const {pageSize,filtro,apiToken}:{pageSize:string;filtro:string;apiToken:string;} = await request.json();

    const endpoint = "api/conceptos/search";

    const urlData:{pageSize:Array<string>;filtro?:Array<string>} = {
        pageSize:['0']
    }

    if(typeof pageSize != 'undefined')
    urlData.pageSize = [pageSize];

    if(typeof filtro != 'undefined')
    urlData.filtro = [filtro];

    const config = {
        endpoint:endpoint,
        method:"GET" as "GET",
        apiToken:apiToken,
        urlData:urlData
    }

    const productos = await fetchCb(config)

    return new Response(JSON.stringify(productos),{status:200})
}

export {POST}