type Etiqueta = {id:number;codigo:string;titulo:string;cantidad:number}

const formatEtiquetas = (EtiquetasArray:Etiqueta[])=>{
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
            zplCode+="^XA^MU203^MD10^MTD^LH0,0^PW799^LL240"
            +`^FO10,40^A0N,20,20^FD${titulo}^FS`
            +`^FO10,70^BY2^BCN,120,Y,N,N^FD${codigo}^FS`
            n++;
        }else{
            zplCode+=`^FO440,40^A0N,20,20^FD${titulo}^FS`
            +`^FO440,70^BY2^BCN,120,Y,N,N^FD${codigo}^FS`
            +"^XZ"
            n--;
        }
    }
    if(n){
        zplCode +="^XZ"
    }

    return zplCode;
}

export {formatEtiquetas};

