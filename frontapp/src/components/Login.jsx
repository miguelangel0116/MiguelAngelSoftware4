import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { useState } from "react"
import { app } from "../../firebaseConfig";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const auth = getAuth(app)
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Usuario ingreso exitosamente")
            setErrorMessage("Usuario ingresado")
            window.location.href = 'https://localhost:44398//Mantenedor/Inicio';
        } catch (error) {
            console.log("Error al ingresar usuario ", error.message)
            setErrorMessage(error.message)
        }
    }

    const handleGoogle = async () => {
        try {
            const auth = getAuth(app)
            const responseGoogle = new GoogleAuthProvider()
            await signInWithPopup(auth, responseGoogle  )
            console.log("Registrado con Google exitoso")
            setErrorMessage("Usuario ingresado")
            window.location.href = 'https://localhost:44398//Mantenedor/Inicio';
        } catch (error) {
            console.log("Error al iniciar con Google ", error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="email"
                placeholder="Escriba un correo"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password"
                placeholder="Escriba la contraseña"
                value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p>{errorMessage}</p>}

            <h1>Ingresar con Google</h1>
            <button onClick={handleGoogle}>Google</button>

        </div>
    )
}

export default Login