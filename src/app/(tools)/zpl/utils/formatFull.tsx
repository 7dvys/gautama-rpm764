import { formatZpl } from "./formatZpl";

const formatFull = (zpl:string)=>{
    const thermalMethod = process.env.ThermalMethod;
    const formatFull = "^XA\n^MD10\n^PR4\n"+thermalMethod+"\n^LH0,0\n^PW799\n^LL240\n";

    const desplazamiento = 76;

    const reemplazos = [
        ['FO346', `FO${346 + desplazamiento}`],
        ['FO345', `FO${345 + desplazamiento}`],
        ['FO360', `FO${360 + desplazamiento}`],
        ['FT439', `FT${439 + desplazamiento}`],
        ['FT438', `FT${438 + desplazamiento}`]
    ];

    
    
    return formatZpl({zpl:zpl,reemplazos:reemplazos,format:formatFull});
}

export {formatFull};