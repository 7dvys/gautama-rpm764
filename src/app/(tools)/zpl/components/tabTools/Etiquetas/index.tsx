import styles from './Etiquetas.module.css'
import { useEffect, useState } from 'react';
import { formatEtiquetas } from '../../../utils';

interface EtiquetaProps{
    id:number;
    etiquetas:Etiqueta[];
    setEtiquetas:Function;
    remove:Function;
}

const Etiqueta:React.FC<EtiquetaProps> = ({id,etiquetas,setEtiquetas,remove})=>{

    const setEtiquetasValues = (EtiquetaInputs:HTMLCollectionOf<HTMLInputElement>)=>{
        
        const codigo = EtiquetaInputs[0].value;
        const titulo = EtiquetaInputs[1].value;
        const cantidad = parseInt(EtiquetaInputs[2].value);
        
        const nuevaEtiqueta:Etiqueta = {
            id:id,
            codigo:codigo,
            titulo:titulo,
            cantidad:cantidad
        }
        
        const nuevoEtiquetas = etiquetas.map((etiqueta)=>{
            if(etiqueta.id == id){
                etiqueta = nuevaEtiqueta;
            }
            return etiqueta;
        })
        
        setEtiquetas(nuevoEtiquetas);
    }
    
    return(
        <div onChange={(e)=>{setEtiquetasValues(e.currentTarget.children as HTMLCollectionOf<HTMLInputElement>)}} className={styles.label}>
            <input placeholder='Codigo' className={styles.input} type="text" />
            <input placeholder='Titulo' type="text" className={styles.input}/>
            <input defaultValue={1} type="number" min={1} className={`${styles.input} ${styles['input-cantkeyad']}`}/>
            <div 
                className={styles.remover}
                onClick={()=>{remove(id)}}
            >
                -
            </div>
        </div>
    )
}

type Etiqueta = {
    id:number;
    codigo:string;
    titulo:string;
    cantidad:number;
}

const Etiquetas:React.FC<{setZpl:Function}> = ({setZpl})=>{

    const [etiquetas,setEtiquetas] = useState<Etiqueta[]>([])
    const [id,setId] = useState(0)

    const addEtiqueta = (id:number)=>{
        setEtiquetas([...etiquetas,{
            id:id,
            codigo:'',
            titulo:'',
            cantidad:1
        }]);

        setId(id+1);
    }

    const remove = (removeId:number)=>{
        setEtiquetas(
            etiquetas.filter(({id})=>(id != removeId))
        )
    }

    useEffect(()=>{
        setZpl(formatEtiquetas({EtiquetasArray:etiquetas}))
    },[etiquetas])
    
    
    return(
        <>
            {
                etiquetas.map(({id})=>(
                    <Etiqueta key={id} id={id} etiquetas={etiquetas} setEtiquetas={setEtiquetas} remove={remove} />
                ))
            }  

            <div 
            className={styles.adder}
            onClick={()=>{addEtiqueta(id)}}
            >+</div>
        </>
    )
}

export {Etiquetas}
