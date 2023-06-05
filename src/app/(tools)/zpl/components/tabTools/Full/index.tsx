import styles from './Full.module.css'

interface FullProps{
    setZpl:Function;
}

const Full:React.FC<FullProps> = ({setZpl})=>(
    <textarea 
        className={styles.textarea} 
        onChange={(e)=>{
                setZpl(e.target.value)
            }
        } 
        placeholder='Coloque aqui su ZPL...'
    />
) 

export {Full};