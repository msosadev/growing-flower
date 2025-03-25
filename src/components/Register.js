import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Button from "./Button";
import TextField from "./TextField";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function getErrorMessage(errorCode) {
        switch (errorCode) {
            case "auth/email-already-in-use":
                return "This email is already in use.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/weak-password":
                return "Password should be at least 6 characters long.";
            case "auth/network-request-failed":
                return "Network error. Please try again.";
            case "auth/missing-password":
                return "Please type in your password."
            case "auth/missing-email":
                return "Please type in your email."
            default:
                return "An unexpected error occurred.";
        }
    };

    async function registerWithEmail() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error.message);
            setErrorMessage(getErrorMessage(error.code));
        }
    }

    async function signInWithGoogle() {
        signInWithPopup(auth, googleProvider)
    }

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1>Register</h1>
                <TextField className="p-2 rounded-md border-2 border-gray-300" onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                <TextField className="p-2 rounded-md border-2 border-gray-300" onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                {errorMessage ? <span className="p-2 bg-red-100 text-red-600 rounded-sm">{errorMessage}</span> : ""}
                <Button classes="w-full" onClick={registerWithEmail}>Register</Button>
                <Button classes="w-full" onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Register;