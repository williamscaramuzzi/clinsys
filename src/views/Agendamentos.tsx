import { getAuth } from "firebase/auth"
import { useState } from "react";
import { Link } from "react-router-dom"
import Navbar from "./Navbar";

export default function Agendamentos() {
    const authmodule = getAuth();
    const [existe, setExiste] = useState(false)
    
    authmodule.onAuthStateChanged((user)=>{
        if(user) setExiste(true);
        else setExiste(false)
    })

    return (
        existe? <>
            <h1 style={{display: "inline-block"}}>Agendamentos</h1>
            <h5 style={{float: "right"}}>Bem vindo {authmodule.currentUser!.email}</h5>
            <Navbar/>
            <h2>Agende aqui uma consulta com o paciente</h2>
        </>:<>
            <h3> Carregando...</h3>
            <h5>Se demorar, faça <Link to={"/"}>Login</Link> novamente</h5>
        </>
    )
    
}