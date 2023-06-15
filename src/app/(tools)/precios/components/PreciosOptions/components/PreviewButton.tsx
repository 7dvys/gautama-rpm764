interface PreviewButtonProps{
    previewVisible:boolean;
    previewEnable:boolean;
    previewFunction:Function;
}

const PreviewButton:React.FC<PreviewButtonProps> = ({previewVisible,previewEnable,previewFunction})=>{
    if(previewVisible)
    return (
        previewEnable
        ?<button onClick={()=>{previewFunction()}}>previsualizar</button>
        :<button disabled>previsualizar</button>
    )
    
    return (<></>)
}

export {PreviewButton}