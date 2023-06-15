import { fetchCb } from "../utils/fetchCb"
import { type Product } from "../types";

const POST = async (request:Request)=>{
    const {apiToken}:{apiToken:string;} = await request.json();

    const endpoint = "api/conceptos/search";

    interface getAllProductsProps {
        page?:number;
        pageSize?:number;
        productPromises:(Promise<any> | Record<string,string>)[];
        totalProductCounter?:number;
    }
    
    const getAllProducts = async({page,pageSize,productPromises,totalProductCounter}:getAllProductsProps)=>{
        
        if(typeof pageSize == 'undefined')
        pageSize = 50;

        if(typeof page == 'undefined')
        page = 0;
        page++;

        if(typeof totalProductCounter != 'undefined'){
            totalProductCounter = totalProductCounter-pageSize;

            if(totalProductCounter<50)
            pageSize = totalProductCounter;
        }
                        
        const config = {
            endpoint:endpoint,
            method:"GET" as "GET",
            apiToken:apiToken,
            urlData:{
                pageSize:[pageSize.toString()],
                page:[page.toString()]
            }
        }

        if(page == 1){
            const fetchCbResponse = await fetchCb(config)
            totalProductCounter = parseInt(fetchCbResponse.TotalItems);
            productPromises.push(fetchCbResponse)
        }

        if(page>1)
        productPromises.push(fetchCb(config))

        if(typeof totalProductCounter != 'undefined' && totalProductCounter < 50){
            return productPromises;
        }

        getAllProducts({page:page,pageSize:pageSize,totalProductCounter:totalProductCounter,productPromises:productPromises})
    }

    const productPromises:Promise<any>[]= []
    await getAllProducts({productPromises:productPromises}) as Promise<any>[];
    
    const allProducts:Product[] = [];

    await Promise.all(productPromises).then((productResponses)=>{
        productResponses.forEach(({Items})=>{
            allProducts.push(...Items)
        })
    })



    return new Response(JSON.stringify(allProducts),{status:200})
}

export {POST}