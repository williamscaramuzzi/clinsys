import React, { useMemo, useState } from "react"
import { useTable } from "react-table"
import "./pacientetable.css"
import InputMask from "react-input-mask"
import ModalPaciente from "./modalpaciente"
import { Paciente } from "../models/Paciente"


export default function PacienteTable(props: any) {
    const [modalhidden, setModalHidden] = useState(true)
    const [currentSelectedPaciente, setCurrentSelectedPaciente] = useState<Paciente>()

    const COLUNAS = [
        {
            Header: "CPF",
            accessor: "cpf"
        },
        {
            Header: "Nome",
            accessor: "nome"
        },
        {
            Header: "Ver",
            accessor: "ver",
            Cell: (cell: any) => <button onClick={async () => {
                let paciente = await Paciente.getUmPacientePorCpf(cell.row.values.cpf)
                setCurrentSelectedPaciente(paciente)
                setModalHidden(false)
            }}>Ver</button>
        }
    ]
    const colunas = useMemo(() => COLUNAS, []);
    const dados = props.dados; //tirei o usememo porque essa tabela é componente separado de CadastroPacientes
    const table_instance = useTable({ columns: colunas, data: dados });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table_instance
    return <>
        <table id="tabela_pacientes" {...getTableProps()}>
            <thead>
                {headerGroups.map(headergroup => {
                    return <tr {...headergroup.getHeaderGroupProps()}>
                        {headergroup.headers.map(column => {
                            return <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        })}
                    </tr>
                })}

            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <>
                                <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            </>
                        })}
                    </tr>
                })}

            </tbody>
        </table>
        {!modalhidden && <ModalPaciente 
                            currentSelectedPaciente={currentSelectedPaciente!}
                            atualizarTabelaPacientes={props.atualizarTabelaPacientes}
                            setModalHidden={setModalHidden}/>}
    </>

}