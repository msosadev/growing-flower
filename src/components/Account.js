import { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import Button from "./Button";
import Login from "./Login";
import Register from "./Register";

function Account(props) {
    const [showLogin, setShowLogin] = useState(true);

    async function logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        props.userId ?
            <div>
                <h6>Hello {auth.currentUser.displayName}!</h6>
                <Button onClick={logout} label="Logout" />
            </div>
        :
        <>
            {showLogin ? <Login /> : <Register />}
            {showLogin ? <Button label="Create new account" onClick={() => { setShowLogin(false) }} /> : <Button label="Login instead" onClick={() => { setShowLogin(true) }} />}
        </>
    )
}

export default Account;