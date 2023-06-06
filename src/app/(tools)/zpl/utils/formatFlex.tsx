import { formatZpl } from "./formatZpl";
const formatFlex = (zpl:string)=>{
    const thermalMethod = process.env.ThermalMethod;
    const formatFlex = "^XA\n^MD10\n^PR4\n"+thermalMethod+"\n^LH0,0\n^PW799\n^LL1518\n";
    return formatZpl({zpl:zpl,reemplazos:[],format:formatFlex});
}

export {formatFlex};