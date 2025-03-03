import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function Register() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    async function signInWithGoogle() {
        signInWithPopup(auth, googleProvider)
    }

    async function logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-4 max-w-60 mx-auto [&_input]:border">
                <h1>Register</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                <button className="bg-purple-500 text-white" onClick={Register}>Register</button>
                <button className="bg-purple-500 text-white" onClick={signInWithGoogle}>Sign in with Google</button>
                <button className="bg-red-500 text-white" onClick={logout}>Log Out</button>
            </div>
        </div>
    );
}

export default Register;