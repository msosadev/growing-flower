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
            <div className="text-center flex items-center flex-col gap-3">
                <img className='rounded-full size-10' src={auth.currentUser.photoURL} alt="User's profile picture" />
                <h6>Hello {auth.currentUser.displayName}!</h6>
                <Button type="outlined" state="error" onClick={logout}>Logout</Button>
            </div>
        :
        <>
            {showLogin ? <Login /> : <Register />}
            {showLogin ? <Button classes="w-full mt-3" type="text" onClick={() => { setShowLogin(false) }}>Create new account</Button> : <Button classes="w-full mt-3" type="text" onClick={() => { setShowLogin(true) }}>Login instead</Button>}
        </>
    )
}

export default Account;