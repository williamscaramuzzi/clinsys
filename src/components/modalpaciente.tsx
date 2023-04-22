import { useEffect, useState, useRef } from "react"
import { Paciente } from "../models/Paciente"
import InputMask from "react-input-mask"
import "./modalpaciente.css"

type PropsDoModalPaciente = {
    currentSelectedPaciente: Paciente,
    atualizarTabelaPacientes: ()=>void,
    setModalHidden: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ModalPaciente(props: PropsDoModalPaciente) {
    let { currentSelectedPaciente, atualizarTabelaPacientes  } = props;

    async function salvarPaciente(){
        let nome = (document.getElementById("nomemodal") as HTMLInputElement).value;
        let telefone = (document.getElementById("telefonemodal") as HTMLInputElement).value;
        let cpf = (document.getElementById("cpfmodal") as HTMLInputElement).value;
        cpf = cpf.replaceAll(".", "");
        cpf = cpf.replaceAll("-", "");
        let datanasc = (document.getElementById("datanascmodal") as HTMLInputElement).value;
        let endereco = (document.getElementById("enderecomodal") as HTMLInputElement).value;
        let rg = (document.getElementById("rgmodal") as HTMLInputElement).value;
        let email = (document.getElementById("emailmodal") as HTMLInputElement).value;
        let planodesaude = (document.getElementById("planodesaudemodal") as HTMLInputElement).value;
        let numcarteiraplano = (document.getElementById("numcarteiraplanomodal") as HTMLInputElement).value;
        let paciente = new Paciente(nome, telefone, datanasc, cpf, endereco, rg, email, planodesaude, numcarteiraplano);
        await currentSelectedPaciente.deletarPaciente();
        await paciente.cadastrarPaciente();
        props.setModalHidden(true);
        atualizarTabelaPacientes();
    }

    async function deletarPaciente(){
        await currentSelectedPaciente.deletarPaciente();
        props.setModalHidden(true);
        atualizarTabelaPacientes()
    }


    return <div id="modaltabelapacientes" >
        <div id="dadosdopaciente">
            <h2>Dados do paciente</h2>
            <button id="fecharmodalbutton" onClick={() => {
                props.setModalHidden(true);
            }}><strong>X Fechar</strong></button>
        </div>
        <div id="gridmodalpaciente">
            <div>
                <label htmlFor="cpfmodal" className="for">CPF: </label>
                <InputMask name="cpfmodal" id="cpfmodal" mask={"999.999.999-99"} placeholder={"CPF"} title={"CPF"}
                    required defaultValue={currentSelectedPaciente.cpf} onChange={() => { }} />
            </div>
            <div>
                <label htmlFor="nomemodal" className="for">Nome:</label>
                <input type="text" name="nomemodal" id="nomemodal" placeholder="Nome do paciente" title="Nome do paciente"
                    required defaultValue={currentSelectedPaciente.nome} onChange={() => { }} />
            </div>
            <div>
                <label htmlFor="telefonemodal" className="for">Telefone: </label>
                <InputMask name="telefonemodal" id="telefonemodal" mask={"(99) 99999-9999"} placeholder={"Telefone"} title={"Telefone"} required defaultValue={currentSelectedPaciente.telefone} onChange={(event) => { }} />
            </div>
            <div>
                <label htmlFor="datanascmodal" className="for">Data de Nascimento: </label>
                <InputMask name="datanascmodal" id="datanascmodal" mask={"99/99/9999"} placeholder={"Data de nascimento"} title={"Data: DD / MM / AAAA"} required defaultValue={currentSelectedPaciente.datanasc} onChange={(event) => { }} />
            </div>
            <div>
                <label htmlFor="enderecomodal" className="for">Endereço: </label>
                <input type="text" name="enderecomodal" id="enderecomodal" placeholder={"Endereço"} title={"Endereço"} required defaultValue={currentSelectedPaciente.endereco} onChange={() => { }} />
            </div>
            <div>
                <label htmlFor="rgmodal" className="for">RG: </label>
                <input type="number" name="rgmodal" id="rgmodal" placeholder="RG" title="RG" defaultValue={currentSelectedPaciente.rg || ""} />
            </div>
            <div>
                <label htmlFor="emailmodal" className="for">Email: </label>
                <input type={"email"} name="emailmodal" id="emailmodal" placeholder="Email" title="Email" defaultValue={currentSelectedPaciente.email || ""} onChange={() => { }} />
            </div>
            <div>
                <label htmlFor="planodesaudemodal" className="for">Plano de Saúde: </label>
                <input type="text" name="planodesaudemodal" id="planodesaudemodal" placeholder="Nome do plano de Saúde" title="Nome do plano de saúde" defaultValue={currentSelectedPaciente.planodesaude || ""} onChange={() => { }} />
            </div>
            <div>
                <label htmlFor="numcarteiraplanomodal" className="for">Nº da carteirinha: </label>
                <input type="number" name="numcarteiraplanomodal" id="numcarteiraplanomodal" placeholder="Nº da carteirinha do plano" title="Nº da carteirinha do plano" defaultValue={currentSelectedPaciente.numcarteiraplano || ""} onChange={() => { }} />
            </div>     
        </div>
        <div id="botoessalvardeletar">
                <button onClick={salvarPaciente} id="buttonsalvaralteracoes">Salvar alterações</button>
                <button onClick={deletarPaciente} id="buttondeletarpaciente">Deletar paciente</button>
            </div>
    </div>
}