import { getDatabase, get, ref, set, child, remove, DataSnapshot } from "firebase/database"
import { getApp } from "firebase/app";

export class Paciente {
    nome: string;
    telefone: string;
    datanasc: string;
    cpf: string;
    endereco: string;
    rg: string | null;
    email: string | null;
    planodesaude: string | null;
    numcarteiraplano: string | null;

    constructor(nome: string, telefone: string, datanasc: string, cpf: string, endereco: string,
        rg: string | null, email: string | null, planodesaude: string | null, numcarteiraplano: string | null) {
        this.nome = nome;
        this.telefone = telefone;
        this.datanasc = datanasc;
        this.cpf = cpf;
        this.endereco = endereco;
        this.rg = rg;
        this.email = email;
        this.planodesaude = planodesaude;
        this.numcarteiraplano = numcarteiraplano
    }
    async updatePaciente() {
        const backend = getApp();
        const database = getDatabase(backend);
        await set(ref(database, "pacientes/" + this.cpf), this);
    }
    async deletarPaciente() {
        const backend = getApp();
        const database = getDatabase(backend);
        const dbref = ref(database)
        await remove(child(dbref, "pacientes/" + this.cpf));
    }
    async cadastrarPaciente() {
        const backend = getApp();
        const database = getDatabase(backend);
        const dbref = ref(database)
        let paciente_gravado = await get(child(dbref, "pacientes/" + this.cpf));
        if (paciente_gravado.val()) {
            console.log("Já existe um paciente com esse cpf: ");
            console.log(paciente_gravado.val())
        } else {
            await set(ref(database, "pacientes/" + this.cpf), this);
        }
    }
    static async getUmPacientePorNome(nome_param: string): Promise<Paciente> {
        const backend = getApp();
        const database = getDatabase(backend);
        const dbref = ref(database)
        let snapshot: DataSnapshot = await get(child(dbref, "pacientes/"));
        let tabela: Object = snapshot.val();
        if (tabela) {
            let paciente: Paciente | null = null;
            Object.values(tabela).forEach((elemento: Paciente) => {
                if (elemento.nome.includes(nome_param)) {
                    paciente = elemento;
                }
            })
            if (paciente != null) return Promise.resolve(paciente);
            else return Promise.reject("Não foi encontrado o paciente")

        } else {
            return Promise.reject("Não existem pacientes na tabela")
        }

    }

    static async getUmPacientePorCpf(cpf_a_consultar: string): Promise<Paciente> {
        const backend = getApp();
        const database = getDatabase(backend);
        const dbref = ref(database)
        try {
            let snapshot: DataSnapshot = await get(child(dbref, "pacientes/" + cpf_a_consultar));
            if(snapshot.val()==null) throw Error("Não foi encontrado paciente com esse CPF");
            let { nome, telefone, datanasc, cpf, endereco, rg, email, planodesaude, numcarteiraplano }: any = snapshot.val();
            let umpaciente = new Paciente(nome, telefone, datanasc, cpf, endereco, rg, email, planodesaude, numcarteiraplano)
            return Promise.resolve(umpaciente);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    static async getTabelaPacientes(): Promise<Paciente[]> {
        const backend = getApp();
        const database = getDatabase(backend);
        const dbref = ref(database)
        let snapshot: DataSnapshot = await get(child(dbref, "pacientes/"));
        let tabela: Object = snapshot.val();
        if (tabela) {
            let vetor: Paciente[] = [];
            Object.values(tabela).forEach((elemento: Paciente | any) => {
                vetor.push(elemento)
            })
            return Promise.resolve(vetor);

        } else {
            return Promise.reject("Não existem pacientes na tabela")
        }
    }

}