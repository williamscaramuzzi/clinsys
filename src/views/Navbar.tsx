import { getAuth } from "firebase/auth"
import {useNavigate, Link} from "react-router-dom"
import "./Navbar.css"
import { CSSProperties } from "react";

export default function Navbar() {
    const linkstyle: CSSProperties = {textDecoration: "none", color: "white"}
    const navigate = useNavigate();

    return <nav>
        <ul>
            <li><Link to={"/agendamentos"} style={linkstyle}>Agendamentos</Link></li>
            <li><Link to={"/atendimento"} style={linkstyle}>Atender Pacientes</Link></li>
            <li style={{float: "right"}}><span onClick={async ()=>{
                await getAuth().signOut();
                navigate("/")
            }} style={{...linkstyle, cursor: "pointer"}}>Logout</span></li>
            
        </ul>
    </nav>
}