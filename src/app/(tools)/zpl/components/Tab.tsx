interface TabProps{
    tab:string;
    tabName:string;
    setTab:Function;
    styles:{
        readonly [key: string]: string;
    };
}

const Tab:React.FC<TabProps> = ({tab,setTab,tabName,styles})=>(
    <div 
        className={`${tab==tabName?styles.active:''} ${styles.tab}`}
        onClick={()=>{setTab(tabName)}}
    >
        {tabName}
    </div>
)

export {Tab};