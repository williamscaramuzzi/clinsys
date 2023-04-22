import { createContext, useEffect, useState, useContext, ReactNode } from 'react'
import { getApp } from "firebase/app";
import { getDatabase, get, ref, set, child, update, remove, DataSnapshot } from "firebase/database"

type EstadoGlobal = {
    pacientesTable: Object[],
    atualizarTabelaPacientes: ()=>void
}

export const MeuContexto = createContext<EstadoGlobal | null>(null);

type PropsDoEstadoComponent = {
    children: ReactNode
}

export function EstadoComponent({children}: PropsDoEstadoComponent) {
    const backend = getApp();
    const database = getDatabase(backend);
    const dbref = ref(database)


    return <MeuContexto.Provider value={null}>
        {children}
    </MeuContexto.Provider>
}

export const getEstadoGlobalHook = ()=>{
    return useContext(MeuContexto)
}