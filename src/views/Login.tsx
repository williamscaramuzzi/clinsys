import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const emailInput = useRef<HTMLInputElement>(null)
    const senhaInput = useRef<HTMLInputElement>(null)
    const [mensagem, setMensagem] = useState("")


    async function handleForm(e: FormEvent) {
        e.preventDefault();
        setMensagem("")
        let email = emailInput.current!.value;
        let senha = senhaInput.current!.value;
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence).then(()=>{
            return signInWithEmailAndPassword(auth, email, senha)
        }).then(userCredential=>{   
            navigate("home");
        }).catch(error=>{
            if(error.code==="auth/wrong-password") setMensagem("Senha incorreta!");
            if(error.code==="auth/user-not-found") setMensagem("Usuário incorreto!");
        })
    }

    return <>
            <h1>CLIN SYS</h1>
            <div id="divdoform">
                <form onSubmit={handleForm}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="emailInput">E-mail</label></td>
                                <td><input ref={emailInput} type="email" name="emailInput" id="emailInput" required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="senhaInput">Senha:</label></td>
                                <td><input ref={senhaInput} type="password" name="senhaInput" id="senhaInput" required /></td>
                            </tr>
                            <tr><td></td><td><input type="submit" value="Entrar" /></td></tr>
                            <tr><td></td><td><span id="mensagemspan">{mensagem}</span></td></tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    }