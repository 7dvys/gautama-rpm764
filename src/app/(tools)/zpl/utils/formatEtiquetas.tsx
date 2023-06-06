type Etiqueta = {id:number;codigo:string;titulo:string;cantidad:number}

interface formatEtiquetasProps{
    EtiquetasArray:Etiqueta[];
}
const formatEtiquetas = ({EtiquetasArray}:formatEtiquetasProps)=>{
    const thermalMethod = process.env.ThermalMethod;
    const format = "^XA\n^MD10\n"+thermalMethod+"\n^LH0,0\n^PW799\n^LL240";
    
    const formatLabelList = EtiquetasArray.reduce((acc:Array<{codigo:string;titulo:string}>[],{cantidad,titulo,codigo})=>{
        if(cantidad && titulo && codigo){
            acc.push(...Array(cantidad).fill([codigo,titulo]))
        }
        return acc;
    },[])  
    
    let n = 0;
    let zplCode = "";
    for(const [codigo,titulo] of formatLabelList){
        if(!n){
            zplCode+=format
            +`^FO10,20^BY2^BCN,30,Y,N,N^FD${codigo}^FS\n`
            +`^FO10,80^FB380,2,2,C^A0N,70,60^FD${titulo}^FS\n`
            n++;
        }else{
            zplCode+=`^FO440,20^BY2^BCN,30,Y,N,N^FD${codigo}^FS\n`
            +`^FO440,80^FB380,2,2,C^A0N,70,60^FD${titulo}^FS\n`
            +"^XZ\n"
            n--;
        }
    }
    if(n){
        zplCode +="^XZ"
    }

    return zplCode;
}

export {formatEtiquetas};

