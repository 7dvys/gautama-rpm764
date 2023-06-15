import { useEffect, useState } from "react";
import * as xlsx from 'xlsx';
import { type Product } from "@/app/(tools)/contabilium/types";
import { createPreview } from "../utils";
import { PreviewButton,Option } from "./components";
import { type OptionsProps } from "./types";

interface PreciosOptionsProps{
    tableData:{
        tableBody:(string|number)[][];
        tableHeader?:string[];
    }
    setTableData:Function;
    contabiliumProducts:Product[];
}

const PreciosOptions:React.FC<PreciosOptionsProps> = ({tableData,setTableData,contabiliumProducts})=>{

    const [workbook,setWorkbook] = useState<xlsx.WorkBook>({} as xlsx.WorkBook)
    const [sheets,setSheets] = useState<string[]>(['hoja'])
    const [currentSheet,setCurrentSheet] = useState('');

    const [workBookTableData,setWorkBookTableData] = useState<(string|number)[][]>([])

    const [options,setOptions] = useState<OptionsProps>({
        precioColumn:0,
        codigoColumn:0,
        iva:0,
        ivaIncluido:false,
        ganancia:0,
        modificacion:0,
        modificacionIncluidoEnPrecio:false
    })

    const [previewTableData,setPreviewTableData] = useState<Record<string,any>>({
        tableDataBody:[],
        tableDataHeader:[],
        productMatches:[]
    })

    const [previewEnable,setPreviewEnable] = useState(false);
    const [previewVisible,setPreviewVisible] = useState(false);
    const [onPreview,setOnPreview] = useState(false);

    const setWorkbookHandler = async (files:FileList|null)=>{
        if(files && files.length>0){
            const fileData = await files[0].arrayBuffer();
            setWorkbook(xlsx.read(fileData));
        }
    }
    
    const setOptionsHandler = ({option,value}:{option:keyof OptionsProps,value:(string|boolean|number)})=>{
        const updatedOptions:OptionsProps = {...options,[option]:value}
        setOptions(updatedOptions);
    }

    const setTableToWorkbookTableData = ()=>{
        if(workbook.Sheets){
            const workBookSheet = workbook.Sheets[currentSheet];
            const workBookSheetArray:(string|number)[][] = xlsx.utils.sheet_to_json(workBookSheet,{header:1,defval:'#'})
            setWorkBookTableData(workBookSheetArray)
        }
    }

    const previewFunction = ()=>{
        const previewTableData = createPreview({workBookTableData:workBookTableData,options:options,contabiliumProducts:contabiliumProducts});
        setPreviewTableData(previewTableData)
    }

    // On Worbook set:
    useEffect(()=>{
        if(workbook.SheetNames){
            setSheets(workbook.SheetNames);
        }
    },[workbook])

    // On sheet set:
    useEffect(()=>{
        setTableToWorkbookTableData();
    },[currentSheet])

    useEffect(()=>{
        if(workBookTableData.length)
        {setTableData({tableBody:workBookTableData});
        setOnPreview(false);}
    },[workBookTableData])

    useEffect(()=>{
        if(typeof previewTableData != 'undefined' && previewTableData.tableDataBody.length){
            setTableData({tableBody:previewTableData.tableDataBody,tableHeader:previewTableData.tableDataHeader});
            setOnPreview(true);
        }
    },[previewTableData])

    // Preview Button
    useEffect(()=>{
        setPreviewEnable(true);
        
        Object.entries(options).forEach(([key,value])=>{
            if(key != 'modificacion' && ((typeof value == 'number' && value < 0) || (typeof value == 'string' && value == '')))
            setPreviewEnable(false);
        })

        if(!tableData.tableBody.length)
        setPreviewEnable(false)
    },[options,tableData])

    useEffect(()=>{
        if(onPreview)
        previewFunction();
    },[options])

    useEffect(()=>{
        if(Object.keys(contabiliumProducts).length && Object.keys(workbook).length >0)
        setPreviewVisible(true);
    })

    return(
        <div>
            <input onChange={(e)=>{setWorkbookHandler(e.target.files)}} type="file" />
            <select>
                {
                    sheets.map((sheetName,index)=>(
                        <Option key={index.toString()} value={sheetName} setCurrentSheet={setCurrentSheet} />
                    )
                )}
            </select>
            <div>
                <input 
                    onKeyUp={(e)=>{setOptionsHandler({option:'codigoColumn',value:(e.target as HTMLInputElement).value})}}
                    type="text"
                    placeholder="codigo"
                />
                <input 
                    onKeyUp={(e)=>{setOptionsHandler({option:'precioColumn',value:(e.target as HTMLInputElement).value})}}
                    type="text" 
                    placeholder="precio"
                />
                <input 
                    onKeyUp={(e)=>{setOptionsHandler({option:'iva',value:parseFloat((e.target as HTMLInputElement).value)})}}
                    type="number" 
                    min={0}
                    placeholder="iva" />
                <input 
                    onChange={(e)=>{setOptionsHandler({option:'ivaIncluido',value:e.target.checked?true:false})}}
                    defaultValue={'false'} 
                    type="checkbox" 
                />
                <label htmlFor="">incluido</label>
                <input         
                    onKeyUp={(e)=>{setOptionsHandler({option:'ganancia',value:parseFloat((e.target as HTMLInputElement).value)})}}
                    type="number" 
                    min={0}
                    placeholder="ganancia"
                />
                <input 
                    onKeyUp={(e)=>{setOptionsHandler({option:'modificacion',value:parseFloat((e.target as HTMLInputElement).value)})}}
                    type="number" 
                    placeholder="modificacion"
                />
                <input 
                    onChange={(e)=>{setOptionsHandler({option:'modificacionIncluidoEnPrecio',value:e.target.checked?true:false})}}
                    type="checkbox" />
                <label htmlFor="">incluido al precio final</label>
                <button onClick={()=>{setTableToWorkbookTableData()}}>ver hoja</button>
                <PreviewButton previewFunction={()=>{previewFunction()}} previewEnable={previewEnable} previewVisible={previewVisible}/>
                {onPreview
                ?<button onClick={()=>{}}>confirmar</button>
                :''
                }
            </div>
        </div>
        
    )
}

export {PreciosOptions}