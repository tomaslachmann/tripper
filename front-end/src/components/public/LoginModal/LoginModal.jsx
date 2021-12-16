import { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { login } from "../../../features/auth";
import { useNavigate } from "react-router-dom";

import "./LoginModal.css"

const LoginModal = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailTyped, setEmailTyped] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const checkIfEmpty = (input) => {
        if(input === "" || (!emailTyped && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))){
            document.getElementById("password").classList.add("wrong");
            return;
        }
        
        if(emailTyped) {
            dispatch(login(email, password))
            .then(() => {
                props.setLogin(true)
                navigate("/home")
            })
        }
        else{setEmailTyped(true);}
    }
    
    window.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            checkIfEmpty(!emailTyped ? email : password)
        }
        else if(e.key === "Escape"){
            document.getElementById("close").click();
        }
    })

    return(
        <div className="modal flex">
            <div className="modal-header">
                <h3>Přihlásit se</h3>
                <button
                id="close"
                onClick={() => {props.setModalState("")}}
                >&times;</button>
            </div>
            <div className="modal-body">
                <h2>Vítej na tripperu</h2>
                { !emailTyped ? 
                    <input 
                    id="email"
                    type="email" 
                    className="email"
                    placeholder="E-mail" 
                    value={email}
                    onInput={e => setEmail(e.target.value)}/> : 
                    <input 
                    id="password"
                    type="password" 
                    placeholder="Heslo"
                    value={password}
                    onInput={e => setPassword(e.target.value)} />}
                <button
                    id="login"
                    onClick={() => checkIfEmpty(!emailTyped ? email : password)}
                >{emailTyped ? 'Přihlásit se' : 'Pokračovat'}</button>
            </div>
        </div>
    )
}

//export default LoginModal


function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
      isLoggedIn,
      message
    };
  }
  
  export default connect(mapStateToProps)(LoginModal);