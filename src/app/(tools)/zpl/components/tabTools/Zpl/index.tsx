import styles from './Zpl.module.css'

interface ZplProps{
    setZpl:Function;
}

const Zpl:React.FC<ZplProps> = ({setZpl})=>(
    <textarea 
        className={styles.textarea} 
        onChange={(e)=>{
                setZpl(e.target.value)
            }
        } 
        placeholder='Coloque aqui su ZPL...'
    />
) 

export {Zpl};