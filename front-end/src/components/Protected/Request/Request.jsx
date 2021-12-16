import "./Request.css"
import { useSelector, useDispatch } from "react-redux";
import { handle } from "../../../features/request";

const Request = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const id = props.id;
    const types = {
        accept:1,
        decline:2
    }


    return(
        <div className="request bg-white rounded-15 shadow">
            <div className="profile-pic">
                <img src="" alt="" />
            </div>
            <p><span className="bold">{props.name}</span> vám odeslal žádost o přátelství.</p>
            <button className="confirm rounded-15 bg-blue color-white" onClick={() => {dispatch(handle(token, id, types.accept))}}>
                Potvrdit
            </button>
            <button className="decline rounded-15 bg-white color-blue border-blue" onClick={() => {dispatch(handle(token, id, types.decline))}}>
                Odmítnout
            </button>
        </div>
    )
}

export default Request