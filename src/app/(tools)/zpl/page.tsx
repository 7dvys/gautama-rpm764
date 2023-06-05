'use client'
import { useState,useEffect } from 'react'
import styles from './zpl.module.css'
import {formatFull} from './utils';
import { Tab, TabTool} from './components';

const Zpl:React.FC = ()=>{
    const [tab,setTab] = useState('Etiquetas');
    const [zpl,setZpl] = useState('');
    const [result,setResult] = useState('');

    useEffect(()=>{
        let tmp = '';
        switch (tab) {
            case 'Full':
                    tmp = formatFull(zpl);
                break;
            
            default:
                tmp= zpl;
                break;
        }
        setResult(tmp)
    },[zpl])
    
    function print(result:string){
        if(result && confirm(`Impresora: ${process.env.PrinterName}\nZPL:\n${result}`)){
            const printer = process.env.PrinterName;
            const destination = 'http://localhost:3000/printer';
            const config = {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({printer:printer,zpl:result})
            }
            fetch(destination,config).then(()=>{alert('Archivo impreso!')});
        }

    }
    
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div className={styles.tabs}>
                    <Tab tab={tab} setTab={setTab} tabName='Etiquetas' styles={styles}/>
                    <Tab tab={tab} setTab={setTab} tabName='Full' styles={styles}/>
                </div>
                
                <img onClick={()=>{print(result)}} src="/printIcon.svg" className={styles.img} />
            </nav>
            <div className={styles.navTool}>
                <TabTool tab={tab} setZpl={setZpl}/>
            </div>

        </div>
    )
}

export default Zpl;