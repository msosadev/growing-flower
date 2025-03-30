import { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import Button from "./Button";
import Login from "./Login";
import Register from "./Register";
import Icon from "./Icon";

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
                {auth.currentUser.photoURL ?
                    <img className='rounded-full size-10' src={auth.currentUser.photoURL} alt="User's profile picture" />
                    :
                    <div className="p-2"><Icon name="smile" /></div>
                }
                <h6>Hello <span className="text-purple-600">{auth.currentUser.displayName ? auth.currentUser.displayName : "flower owner"}</span>!</h6>
                <div className="mb-2">
                    <p className="text-xs">You are currently logged in as:</p>
                    <p>{auth.currentUser.email}</p>
                </div>
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