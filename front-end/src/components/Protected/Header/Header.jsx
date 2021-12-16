import { useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth";
import { useNavigate } from "react-router";
import "./Header.css"

const Header = () => {
    const [searchText, setSearchText] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = () => {
        dispatch(logout())
        navigate("/")
    }

    return(
        <header>
            <div>
                <h3>tripper</h3>
            </div>
            <div className="header-wrap">
                <input 
                type="text"
                placeholder="Hledat"
                value={searchText}
                onInput={e => setSearchText(e.target.value)}
                 />
                <Link to="/trips/create">
                    <button>
                        Vytvořit
                    </button>
                </Link>
                <div className="header-options" onClick={() => Logout()}>
                    <img src="" alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header