const Option:React.FC<{value:string;setCurrentSheet:Function;}> = ({value,setCurrentSheet})=>(
    <option onClick={()=>{setCurrentSheet(value)}} value={value}>{value}</option>
)

export {Option};