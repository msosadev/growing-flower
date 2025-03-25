import { auth, googleProvider } from "../config/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Button from "./Button";
import TextField from "./TextField";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function getErrorMessage(errorCode) {
        switch (errorCode) {
            case "auth/invalid-email":
                return "Invalid email format.";
            case "auth/user-disabled":
                return "This account has been disabled.";
            case "auth/user-not-found":
                return "No user found with this email.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/too-many-requests":
                return "Too many failed attempts. Try again later.";
            case "auth/network-request-failed":
                return "Network error. Please check your connection.";
            case "auth/missing-password":
                return "Please type in your password."
            case "auth/missing-email":
                return "Please type in your email."
            case "auth/invalid-credential":
                return "Account credentials not found."
            default:
                return "An unexpected error occurred.";
        }
    };

    async function loginWithEmail() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
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
                <h1>Login</h1>
                <TextField onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Email" />
                <TextField onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" />
                {errorMessage ? <span className="p-2 bg-red-100 text-red-600 rounded-sm">{errorMessage}</span> : ""}
                <Button classes="w-full" onClick={loginWithEmail}>Login</Button>
                <Button classes="w-full" onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Login;