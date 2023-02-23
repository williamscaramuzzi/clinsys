import {createContext, useContext, useState, useEffect} from 'react';


export type AuthContextType = {
    backend: FirebaseApp | null,
    authmodule: Auth | null
}

export const AuthContext = createContext<AuthContextType>({backend: null, authmodule: null});

export const AuthProviderComponent = ({children}: any)=>{
    const [backend, setBackend] = useState<FirebaseApp>(app)
    const [authmodule, setAuthmodule] = useState(getAuth()) 

    console.log("Contexto iniciado com o app firebase: " + backend.options.appId)

    authmodule.onAuthStateChanged((user)=>{
        if(user){
            console.log("tem usuário, é esse aqui:")
            console.log(user)
        }else{
            console.log("não tem usuário logado")
        }
    })

    return(
        <AuthContext.Provider value={{backend, authmodule}}>
            {children}
        </AuthContext.Provider>
    )
}