import { getDatabase, get, ref, set, child, remove, DataSnapshot } from "firebase/database"
import { getApp } from "firebase/app";

export class Agendamento{
    datahora: string;
    duracao_em_minutos: number;
    nome_do_procedimento: string;
    nome_paciente: string;
    telefone_paciente: string;

    constructor(datahora: string, nome_do_procedimento: string, duracao_em_minutos: number, nome_paciente: string, telefone_paciente: string){
        this.datahora = datahora;
        this.duracao_em_minutos = duracao_em_minutos;
        this.nome_do_procedimento = nome_do_procedimento;
        this.nome_paciente = nome_paciente;
        this.telefone_paciente = telefone_paciente;
    }

    async cadastrarAgendamento(){
        const backend = getApp();
        const database = getDatabase(backend);
        const dbref = ref(database)
        let agendamento_gravado = await get(child(dbref, "agendamentos/" + this.datahora));
        if (agendamento_gravado.val()) {
            console.log("Já existe um agendamento bem nesse horário");
            console.log(agendamento_gravado.val())
        } else {
            await set(ref(database, "agendamentos/" + this.datahora), this);
        }
    }

}