import { Zpl,Etiquetas } from "./tabTools";

interface TabToolProps{
    tab:string;
    setZpl:Function;
}

const TabTool:React.FC<TabToolProps> = ({tab,setZpl})=>{
    switch (tab) {
        case "Full":
            return <Zpl setZpl={setZpl} />
        case "Flex":
            return <Zpl setZpl={setZpl} />
        default:
            return <Etiquetas setZpl={setZpl} />
    }
}

export {TabTool}