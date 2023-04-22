import { getAuth } from "firebase/auth"
import { useState, useRef, FormEvent } from "react";
import { Link } from "react-router-dom"
import Navbar from "./Navbar";
import "./Agendamentos.css"
import { Agendamento } from "../models/Agendamento";
import { Paciente } from "../models/Paciente";

export default function Agendamentos() {
    const authmodule = getAuth();
    const [existe, setExiste] = useState(false)
    const dataInput = useRef<HTMLInputElement>(null)
    const horaInicioInput = useRef<HTMLInputElement>(null)
    const procedimentoInput = useRef<HTMLInputElement>(null)
    const duracaoInput = useRef<HTMLInputElement>(null)
    const nomePacienteInput = useRef<HTMLInputElement>(null)
    const telefoneInput = useRef<HTMLInputElement>(null)

    authmodule.onAuthStateChanged((user) => {
        if (user) setExiste(true);
        else setExiste(false)
    })

    function contemNumeros(str: string) {
        return /\d/.test(str);
    }
    function transformaNumerosEmStringCPF(cpf: string): string {
        let cpf_formatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        return cpf_formatado;
    }

    async function pesquisarPaciente() {
        let nomeoucpf = nomePacienteInput.current!.value;
        let paciente: Paciente | string;
        if (contemNumeros(nomeoucpf)) {
            try {
                paciente = await Paciente.getUmPacientePorCpf(nomeoucpf);
                telefoneInput.current!.value = paciente.telefone;
                nomePacienteInput.current!.value = paciente.nome;
            } catch (error) {
                console.log(error)
            }
        } else {
            paciente = await Paciente.getUmPacientePorNome(nomeoucpf);
            telefoneInput.current!.value = paciente.telefone;
            nomePacienteInput.current!.value = paciente.nome;
        }
    }

    async function handleHorario() {
        let horainicial_em_millis= new Date(dataInput.current!.value + " " + horaInicioInput.current!.value).getTime();
        let datainicial = new Date(horainicial_em_millis);
        console.log(datainicial)
        let horafinal_em_millis = horainicial_em_millis + (parseInt(duracaoInput.current!.value)*60000)
        let datafinal = new Date(horafinal_em_millis);
        console.log(datafinal)
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        let datahora = dataInput.current!.value + " " + horaInicioInput.current!.value;
        let duracao = parseInt(duracaoInput.current!.value);
        let nome_do_procedimento = procedimentoInput.current!.value;
        let nome_paciente = nomePacienteInput.current!.value!;
        let telefone_paciente = telefoneInput.current!.value;

        let agendamento = new Agendamento(datahora, nome_do_procedimento, duracao, nome_paciente, telefone_paciente);
        await agendamento.cadastrarAgendamento();
    }
    return (
        existe ? <>
            <h1>Agendamentos</h1>
            <span style={{ display: "flex", justifyContent: 'end', fontSize: "0.7rem" }}>Logado como: {authmodule.currentUser!.email}</span>
            <Navbar />
            <h2>Agende aqui uma consulta com o paciente</h2>
            <form onSubmit={handleSubmit}>
                <div id="divagendamento">
                    <label htmlFor="dataInput"> Data: </label>
                    <input ref={dataInput} type="date" name="dataInput" id="dataInput" required />
                    <label htmlFor="horaInicioInput"> Hora de início: </label>
                    <input ref={horaInicioInput} type="time" name="horaInicioInput" id="horaInicioInput" required />
                    <label htmlFor="procedimentoInput"> Nome do procedimento: </label>
                    <input ref={procedimentoInput} type="text" name="procedimentoInput" id="procedimentoInpu" required />
                    <label htmlFor="duracaoInput"> Duração do procedimento (em minutos): </label>
                    <input ref={duracaoInput} type="number" name="duracaoInput" id="duracaoInput" required />                    
                    <label htmlFor="nomePacienteInput">Nome do paciente OU CPF: </label>
                    <input ref={nomePacienteInput} type="text" name="nomePacienteInput" id="nomePacienteInput" required />
                    <button onClick={pesquisarPaciente}>Pesquisar Paciente</button>
                    <br />
                    <label htmlFor="telefonePacienteInput">Telefone: </label>
                    <input ref={telefoneInput} type="text" name="telefonePacienteInput" id="telefonePacienteInput" disabled />
                </div>
            </form>
            <button onClick={handleHorario}>Verificar horário</button>

        </> : <>
            <h3> Carregando...</h3>
            <h5>Se demorar, faça <Link to={"/"}>Login</Link> novamente</h5>
        </>
    )

}