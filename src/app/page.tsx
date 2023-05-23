'use client'
import React from "react";
import Link from "next/link";
import styles from './home.module.css'

interface EntranceProps{
    title:string;
    description:string;
    href:string;
}
const Entrance: React.FC<EntranceProps>=({title,description,href})=>{
    return (
    <Link href={href} className={styles.entrance}>
        <h2>{title}</h2>
        <p>{description}</p>
    </Link>
    )
}

const Home: React.FC = () => (
    <>
        <img src="/alien.png" alt="Alien Logo" width={350} height={350} />
        <nav className={styles.nav}>
            <Entrance href={"./zpl"} title="Etiquetas" description="Genera Etiquetas ZPL"/>
            {/* <Entrance href={"#"} title="Precios" description="Modifica facilmente los precios"/> */}
        </nav>
    </>
);

export default Home;
