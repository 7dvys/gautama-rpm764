import { Table } from "@/app/commonComponents";


const PreciosTabla:React.FC<{tableBody:(string|number)[][],tableHeader?:string[]}> = ({tableBody,tableHeader})=>{
    return (
        <Table tableBody={tableBody} tableHeader={tableHeader}/>
    )
}

export {PreciosTabla}