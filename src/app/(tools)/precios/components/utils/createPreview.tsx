import { Product } from "@/app/(tools)/contabilium/types";


interface createPreviewProps{
    workBookTableData:(string|number)[][];
    contabiliumProducts:Product[];
    options:{
        precioColumn:number;
        codigoColumn:number;
        iva:number;
        ivaIncluido:boolean;
        ganancia:number;
        modificacion:number;
        modificacionIncluidoEnPrecio:boolean;
    }
}

const createPreview = ({workBookTableData,options,contabiliumProducts}:createPreviewProps)=>{
    const {codigoColumn,precioColumn,iva,ganancia,ivaIncluido,modificacion,modificacionIncluidoEnPrecio} = options;
    
    const ivaFactor = iva?(iva/100)+1:1;
    const ivaCoef = ivaIncluido?ivaFactor:1;
    const modificacionFactor = modificacion?(modificacion/100)+1:1;
    const gananciaCoef = modificacionIncluidoEnPrecio?1:1/modificacionFactor;
    const gananciaFactor = ganancia?((ganancia/100)+1)*gananciaCoef:1;
    const newGanancia = (gananciaFactor-1)*100;

    // console.log('ivaFactor',ivaFactor,'ivaCoef',ivaCoef,'modificacionFacotr',modificacionFactor,'gananciaCoef',gananciaCoef,'gananciFactor',gananciaFactor,'newGanancia',newGanancia)

    const contabiliumProductsIndexedForDescripcion:Record<string,Product> = contabiliumProducts.reduce((acc:Record<string,Product>,el)=>{
        acc[el.Descripcion] = el;
        return acc;
    },{})

    const productMatches = workBookTableData.map((product)=>{
        const codigoProveedor = product[codigoColumn]

        if(contabiliumProductsIndexedForDescripcion[codigoProveedor]){
            const costoProveedor:number = product[precioColumn] as number;
            const costoProveedorSinIva = costoProveedor/ivaCoef;

            const costoInterno = costoProveedorSinIva*modificacionFactor;
            const precio = costoInterno*gananciaFactor*ivaCoef;
            const precioFinal = precio*ivaFactor;

            const newContabiliumProduct = contabiliumProductsIndexedForDescripcion[codigoProveedor];
            newContabiliumProduct.CostoInterno = costoInterno.toFixed(2).toString();
            newContabiliumProduct.Precio = precio.toFixed(2).toString();
            newContabiliumProduct.PrecioFinal = precioFinal.toFixed(2).toString();
            newContabiliumProduct.Iva = iva.toFixed(2).toString();
            newContabiliumProduct.Rentabilidad = newGanancia.toFixed(2).toString();

            return newContabiliumProduct;
        }

    }).filter((product)=>product)

    const tableDataHeader:string[] = [];
    const tableDataBody = productMatches.map((product,index) => {
        const allowedKeys = ['Nombre','Codigo','Descripcion','PrecioFinal','Precio','CostoInterno','PrecioFinalAnterior','Rentabilidad']
        return  (
            Object.entries(product as Product)
            .map(([key,value])=>{
                if(allowedKeys.includes(key)){
                    if(!index){
                        if(key == 'Descripcion')
                        key = 'CodigoProveedor'
                        tableDataHeader.push(key)
                    }

                    return value;
                }
            })
            .filter((row)=>row)
        )
    })

    console.log(productMatches)
    return {tableDataBody,tableDataHeader,productMatches}
}



export {createPreview}