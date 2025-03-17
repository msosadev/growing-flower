import { auth, googleProvider } from "../config/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Button from "./Button";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginWithEmail() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    async function signInWithGoogle() {
        signInWithPopup(auth, googleProvider)
    }

    return (
        <div>
            <div className="flex flex-col gap-4 [&_input]:border">
                <h1>Login</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                <Button classes="w-full" onClick={loginWithEmail}>Login</Button>
                <Button classes="w-full" onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Login;