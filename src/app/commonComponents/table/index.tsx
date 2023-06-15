

const TableRow:React.FC<{row:(string|number)[]}> = ({row})=>{
    return (
        <tr>
            {row.map((cell,index)=>(<td key={index}>{cell}</td>))}
        </tr>
    )
}

const TableHeaderRow:React.FC<{row?:(string)[];tableBody:(string|number)[][]}> = ({row,tableBody})=>{
    const maxLenght = tableBody.reduce((acc,el)=>{
        if(acc.length < el.length)
        acc = el;
        return acc
    },[])



    if(typeof row != 'undefined' && row.length)
    return (
        <tr>
            {
                row.map((value,index)=>(
                    <td key={index}>{value}</td>
                ))
            }
        </tr>
    )

    return (
        <tr>
            {
                maxLenght.map((_,index)=>(
                    <td key={index}>{index}</td>
                ))
            }
        </tr>
    )
    
} 

const Table:React.FC<{tableBody:(string|number)[][];tableHeader?:(string)[]}> = ({tableBody,tableHeader})=>{
       
    return(
    <table>
        <thead>
            <TableHeaderRow tableBody={tableBody} row={tableHeader}/>
        </thead>
        <tbody>
        {tableBody.map((row,index)=>
            (
                <TableRow key={index} row={row}/>
            )
        )}
        </tbody>
    </table>
)}

export {Table}