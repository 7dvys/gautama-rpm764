import { Full,Etiquetas } from "./tabTools";

interface TabToolProps{
    tab:string;
    setZpl:Function;
}

const TabTool:React.FC<TabToolProps> = ({tab,setZpl})=>{
    switch (tab) {
        case "Full":
            return <Full setZpl={setZpl} />
    
        default:
            return <Etiquetas setZpl={setZpl} />
    }
}

export {TabTool}