import {Link} from "react-router-dom";
import "./Header.css"

const Header = (props) => {
    return(
        <nav>
            <div>
                <h3>tripper</h3>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/about">O nás</Link>
                    </li>
                    <li>
                        <Link to="/discover">Objevujte</Link>
                    </li>
                    <li>
                        <a href="" onClick={e => {e.preventDefault(); props.setModalState("login")}}>Přihlásit se</a>
                    </li>
                    <li>
                        
                        <button 
                        onClick={e => {props.setModalState("register")}}
                        className="rounded-25 bg-dark-blue color-white">Registrace</button>

                    </li>  
                </ul>
            </div>
        </nav>
    )
}

export default Header