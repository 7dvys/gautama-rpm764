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
    let url = baseUrl+endpoint;

    if(typeof urlData == 'object')
    Object.entries(urlData).forEach(([key,valueList],index)=>{
        const formatValue = valueList.map((value)=>(value))
        url += `${index?'&':'?'}${key}=${formatValue}`;
    })
    const headers:Record<string,string> = {"Content-type":"application/json"}

    if(apiToken)
    headers["Authorization"] = `Bearer ${apiToken}`;

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

    const Request:Record<string,string>= await new Promise((resolve,reject)=>{
        fetch(url,config as RequestInit).then(data=>data.json()).then(res=>{
            resolve(res)
        }).catch(e=>{
            reject({error:e})
        })
    })

    return Request;
    }

export {fetchCb}