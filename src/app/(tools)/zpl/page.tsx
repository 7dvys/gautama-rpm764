'use client'
import { useState,useEffect } from 'react'
import styles from './zpl.module.css'

const formatedZpl = (zpl:string)=>{
    const formatedZpl = zpl.split('^XA').map((row,index)=>{
        return index>0?"^XA\n^MD10\n^PR4\n^MTD\n^LH0,0\n^PW720\n^LL240\n"+row:""            
    })
    
    return formatedZpl.join("");
}

const zpl:React.FC = ()=>{

    const [tab,setTab] = useState('ZPL');
    const [zpl,setZpl] = useState('');
    const [result,setResult] = useState('');

    useEffect(()=>{
        setResult(formatedZpl(zpl))
    },[zpl])
    
    return (
        <div className={styles.zpl}>

            <div className={styles.inputContainer}>
                <nav className={styles.nav}>
                    <div 
                        className={tab=='ZPL'?styles.active:''}
                        onClick={()=>{setTab('ZPL')}}
                    >
                        ZPL
                    </div>
                    <div
                        className={tab=='Gen'?styles.active:''}
                        onClick={()=>{setTab('Gen')}}
                     >Generar
                     </div>
                </nav>
                {
                    tab=="ZPL"?(
                    <textarea 
                        className={styles.textarea} 
                        onChange={(e)=>{
                                setZpl(e.target.value)
                            }
                        } 
                        placeholder='Coloque aqui su ZPL...'
                        />):"<Gen/>"
                }
            </div>

            <div className={styles.outputContainer}>
                <nav className={styles.nav}>
                    <div className={styles.active}>Resultado</div>
                    <div
                    className={styles.clipboard}
                    onClick={() => {navigator.clipboard.writeText(result)}}
                    >
                        <img 
                            className={styles.clipboardImage}
                            src="./copy.svg" 
                 
                        />
                    </div>
                </nav>
                <textarea 
                    className={styles.textarea} 
                    defaultValue={result}
                    disabled
                >
                </textarea>
            </div>
        </div>
    )
}

export default zpl;