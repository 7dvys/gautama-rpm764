const formatedRow = (zplRow:string) => {
    const desplazamiento = 76;

    const reemplazos = [
        ['FO346', `FO${346 + desplazamiento}`],
        ['FO345', `FO${345 + desplazamiento}`],
        ['FO360', `FO${360 + desplazamiento}`],
        ['FT439', `FT${439 + desplazamiento}`],
        ['FT438', `FT${438 + desplazamiento}`]
    ];

    let formatedRow = zplRow;

    reemplazos.forEach(([busqueda, reemplazo]) => {
        const regex = new RegExp(busqueda, 'g');
        formatedRow = formatedRow.replace(regex, reemplazo);
    });

    return formatedRow;
}

const formatFull = (zpl:string)=>{
    const formatFull = zpl.split('^XA').map((row,index)=>{
        return index>0?"^XA\n^MD10\n^PR4\n^MTD\n^LH0,0\n^PW799\n^LL240\n"+formatedRow(row):""            
    })
    
    return formatFull.join("");
}

export {formatFull};