const fetchBackendContabilium = ({endpoint,setState,access_token}:{endpoint:string;setState:Function;access_token?:string;})=>{
    const backendEndpoint = `http://${process.env.Host}:3000/contabilium/${endpoint}`;
    const config:{headers:Record<string,string>;body?:string,method?:string} = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    if(typeof access_token != 'undefined'){
        config.method = "POST"
        config.body = JSON.stringify({apiToken:access_token})
    }
    
    fetch(backendEndpoint,config)
    .then(response=>response.json())
    .then((response)=>{setState(response)})
}

export {fetchBackendContabilium};