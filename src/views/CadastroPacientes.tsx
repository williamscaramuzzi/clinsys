import { getAuth } from "firebase/auth"
import { useState, FormEvent, useEffect, useRef, ReactComponentElement} from "react";
import { Link } from "react-router-dom"
import Navbar from "./Navbar";
import InputMask from "react-input-mask"
import "./CadastroPacientes.css"
import { Paciente } from "../models/Paciente";
import PacienteTable from "../components/pacientetable";

export default function CadastroPacientes() {
    const [tabelapacientes, setTabelaPacientes] = useState<Object[]>([{cpf: "xxx", nome: "sem pacientes"}])
    const [existe, setExiste] = useState(false)
    const cpfInputMask = useRef<any>(null);
    const telefoneInputMask = useRef<any>(null);
    const datanascInputMask = useRef<any>(null);
    const authmodule = getAuth();

    async function atualizarTabelaPacientes(){
        let tabela = await Paciente.getTabelaPacientes();
        console.log(tabela)
        setTabelaPacientes(tabela)
    }
    
    
    authmodule.onAuthStateChanged((user)=>{
        if(user) setExiste(true);
        else setExiste(false)
    })

    function limparFormulario(){
        let form = document.getElementById("form_cadastro") as HTMLFormElement;
        form.reset();
        cpfInputMask.current!.value = "";
        telefoneInputMask.current!.value = "";
        datanascInputMask.current!.value = "";
    }

    async function handleForm(e: FormEvent){
        e.preventDefault();
        let nome = (document.getElementById("nome") as HTMLInputElement).value;
        let telefone = (document.getElementById("telefone") as HTMLInputElement).value;
        let cpf = (document.getElementById("cpf") as HTMLInputElement).value;
        cpf = cpf.replaceAll(".", "");
        cpf = cpf.replaceAll("-", "");
        let datanasc = (document.getElementById("datanasc") as HTMLInputElement).value;
        let endereco = (document.getElementById("endereco") as HTMLInputElement).value;
        let rg = (document.getElementById("rg") as HTMLInputElement).value;
        let email = (document.getElementById("email") as HTMLInputElement).value;
        let planodesaude = (document.getElementById("planodesaude") as HTMLInputElement).value;
        let numcarteiraplano = (document.getElementById("numcarteiraplano") as HTMLInputElement).value;
        let paciente = new Paciente(nome, telefone, datanasc, cpf, endereco, rg, email, planodesaude, numcarteiraplano);
        await paciente.cadastrarPaciente();
        await atualizarTabelaPacientes();
        limparFormulario();
    }

    useEffect(()=>{
        atualizarTabelaPacientes();
    },[])

    return (
        existe? <>
            <h1>Cadastro de pacientes</h1>
            <span style={{display: "flex", justifyContent: 'end', fontSize: "0.7rem"}}>Logado como: {authmodule.currentUser!.email}</span>
            <Navbar/>
            <h2>Cadastre um novo paciente abaixo:</h2>
            <form id="form_cadastro" onSubmit={handleForm}>
                <table>
                    <tbody>
                        <tr>
                        <td>
                            <InputMask type="text" ref={cpfInputMask} name="cpf" id="cpf" 
                            mask={"999.999.999-99"}
                            placeholder="CPF" title="CPF" required />
                            </td>
                            <td>
                                <input type="text" name="nome" id="nome" placeholder="Nome do paciente" 
                                title="Nome do paciente" required/>
                            </td>
                            <td>
                                <InputMask ref={telefoneInputMask} name="telefone" id="telefone" mask={"(99) 99999-9999"} 
                                placeholder={"Telefone"} title={"Telefone"} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <InputMask ref={datanascInputMask} name="datanasc" id="datanasc" mask={"99/99/9999"} placeholder={"Data de nascimento"} title={"Data: DD / MM / AAAA"} required />
                            </td>                            
                            <td>
                                <input type="text" name="endereco" id="endereco" placeholder={"Endereço"} title={"Endereço"} required />
                            </td>
                            <td>
                                <input type="number" name="rg" id="rg" placeholder="RG" title="RG" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type={"email"} name="email" id="email" placeholder="Email" title="Email"/>
                            </td>
                            <td>
                                <input type="text" name="planodesaude" id="planodesaude" placeholder="Nome do plano de Saúde" title="Nome do plano de saúde" />
                            </td>
                            <td>
                                <input type="number" name="numcarteiraplano" id="numcarteiraplano" placeholder="Nº da carteirinha do plano" title="Nº da carteirinha do plano" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Cadastrar" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <h1>Pacientes cadastrados</h1>
            <div className="tabelacadastrados">
                <PacienteTable dados={tabelapacientes} atualizarTabelaPacientes={atualizarTabelaPacientes}/>

            </div>
            
        </>:<>
            <h3> Carregando...</h3>
            <h5>Se demorar, faça <Link to={"/"}>Login</Link> novamente</h5>
        </>
    )
    
}