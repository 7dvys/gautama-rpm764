'use client'
import { useEffect, useState } from 'react';
import { PreciosOptions,PreciosTabla } from './components';
import { type Product } from "@/app/(tools)/contabilium/types";
import { fetchBackendContabilium } from './components/utils';
import styles from './precios.module.css'


const precios:React.FC = ()=>{
    interface tableDataProps{
        tableBody:(string|number)[][];
        tableHeader?:string[];
    }
    const [tableData,setTableData] = useState<tableDataProps>({
        tableBody:[],
        tableHeader:[]
    });

    interface apiTokenState{
        access_token:string;
        expireTime:number;
    }
    const [apiToken,setApiToken] = useState<apiTokenState>({} as apiTokenState);    
    const [contabiliumProducts,setContabiliumProducts] = useState<Product[]>([]);

    useEffect(()=>{
        if(!apiToken.access_token)
        fetchBackendContabilium({endpoint:'getApiToken',setState:setApiToken})   

        if(apiToken.access_token && Object.keys(contabiliumProducts).length == 0)
        fetchBackendContabilium({endpoint:'getAllProducts',setState:setContabiliumProducts,access_token:apiToken.access_token})
        
    },[apiToken])

    return(
        <div className={styles.preciosContainer}>
            <PreciosOptions contabiliumProducts={contabiliumProducts} tableData={tableData} setTableData={setTableData} />
            <PreciosTabla tableBody={tableData.tableBody} tableHeader={tableData.tableHeader} />
        </div>
    )
}

export default precios;