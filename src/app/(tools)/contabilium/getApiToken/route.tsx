import { fetchCb } from "../utils/fetchCb";

const GET = async ()=>{
    const endpoint = 'token';
    const body = `client_id=${process.env.CbUser}&client_secret=${process.env.CbPass}&grant_type=client_credentials`;
    
    const {expires_in,access_token} = await fetchCb({endpoint:endpoint,body:body,method:"POST",cache:false})

    try{
        const expireTime = Date.now()+parseInt(expires_in)*1000;
        return new Response(JSON.stringify({access_token,expireTime}),{status:200});
    }catch(Error){
        return new Response(JSON.stringify({error:Error}),{status:200});
    }
}

export {GET}
