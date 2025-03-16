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
            <div className="flex flex-col gap-4 max-w-60 mx-auto [&_input]:border">
                <h1>Login</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                <Button onClick={loginWithEmail} label="Login" />
                <Button onClick={signInWithGoogle} label="Sign in with Google" />
            </div>
        </div>
    );
}

export default Login;