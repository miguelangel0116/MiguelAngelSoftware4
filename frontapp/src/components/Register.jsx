import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react"
import { app } from "../../firebaseConfig";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
            const auth = getAuth(app)
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("Usuario registrado")
            setErrorMessage("Usuario registrado")
        } catch (error) {
            console.log("Error al registrar usuario ", error.message)
            setErrorMessage(error.message)
        }
    }



    return (
        <div>
            <h1>Register</h1>
            <input type="email"
                placeholder="Escriba un correo"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password"
                placeholder="Escriba la contraseña"
                value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleRegister}>Registrar</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}
export default Register