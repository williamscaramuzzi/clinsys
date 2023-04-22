import { getAuth } from "firebase/auth"
import { useState } from "react";
import { Link } from "react-router-dom"
import "./Dashboard.css"
import Navbar from "./Navbar";

export default function Atendimento() {
    const authmodule = getAuth();
    const [existe, setExiste] = useState(false)
    
    authmodule.onAuthStateChanged((user)=>{
        if(user) setExiste(true);
        else setExiste(false)
    })

    return (
        existe? <>
            <h1>Atendimento</h1>
            <span style={{display: "flex", justifyContent: 'end', fontSize: "0.7rem"}}>Logado como: {authmodule.currentUser!.email}</span>
            <Navbar/>
            <h2>Inicie a entrevista da consulta com o paciente</h2>
        </>:<>
            <h3> Carregando...</h3>
            <h5>Se demorar, faça <Link to={"/"}>Login</Link> novamente</h5>
        </>
    )
    
}