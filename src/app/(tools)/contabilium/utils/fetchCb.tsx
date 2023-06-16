interface fetchCbProps{
    endpoint:string;
    urlData?:Record<string,string[]>;
    body?:Record<string,any>|string;
    method:"POST" | "GET" | "PUT" | "DEL";
    apiToken?:string;
    cache?:Boolean
}

const fetchCb = async ({endpoint,urlData,body,method,apiToken,cache}:fetchCbProps):Promise<Record<string,string>>=>{
    const baseUrl = "https://rest.contabilium.com/";
    // const baseUrl = "https://172.67.74.251/"
    let url = baseUrl+endpoint;

    if(typeof urlData == 'object')
    Object.entries(urlData).forEach(([key,valueList],index)=>{
        const formatValue = valueList.map((value)=>(value))
        url += `${index?'&':'?'}${key}=${formatValue}`;
    })
    const headers:Record<string,string> = {"Content-type":"application/json"}

    if(apiToken)
    headers['Authorization'] = `Bearer ${apiToken}`;

    interface configProps{
        method:"POST" | "GET" | "PUT" | "DEL";
        headers:Record<string,string>;
        body?:string;
        cache?:string;
    }
    
    const config:configProps = {
        method:method,
        headers:headers
    }

    if(typeof cache != "undefined" && !cache)
    config["cache"]="no-store";

    if(method!='GET')
    config.body =(typeof body == 'object')?JSON.stringify(body):body;
    
    const request = await fetch(url,config as RequestInit);
    
    if(!request.ok)
    throw new Error('Error de Fetch')
    
    return await request.json();
}

export {fetchCb}