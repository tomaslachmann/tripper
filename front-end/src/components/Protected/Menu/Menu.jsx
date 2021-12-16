import "./Menu.css"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
import Profile from "../Profile/Profile"

const Menu = () => {
   const location = useLocation();
 
    return(
        <div>
            {!/trips*/.test(location.pathname) ?
            <div>
            <Profile name="tomas lachmann" />
            <div className="menu-wrap rounded-15 shadow bg-white">
            <ul>
                <li className="menu-item">
                    <Link to="/home" id='home' onClick={() => {}}>Domů</Link>
                </li>
                <li className="menu-item">
                    <Link to="/trips" id='trips' onClick={() => {}}>Tripy</Link>
                </li>
                <li className="menu-item">
                    <Link to="/friends">Přátelé</Link>
                </li>
                <li className="menu-item">
                    <Link to="/home">Profil</Link>
                </li>
                <li className="menu-item">
                    <Link to="/home">Nastavení</Link>
                </li>
            </ul>
            </div>
            </div>
            :
            <div className="menu-wrap rounded-15 shadow bg-white">
            <ul>
                <li className="menu-item">
                    <Link to="/home" onClick={() => {}}>Domů</Link>
                </li>
                <li className="menu-item">
                    <Link to="/trips/create" onClick={() => {}}>Vytvořit</Link>
                </li>
                <li className="menu-item">
                    <Link to="/trips" onClick={() => {}}>Procházet vše</Link>
                </li>
                <li className="menu-item">
                    <Link to="/trips/search" onClick={() => {}}>Hledat</Link>
                </li>
                <li className="menu-item">
                    <Link to="/trips/my" onClick={() => {}}>Vaše tripy</Link>
                </li>
            </ul>
            </div>}
        </div>
    )
}

export default Menu