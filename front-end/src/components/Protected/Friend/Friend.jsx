import "./Friend.css";
import { HiDotsHorizontal, HiOutlineUserRemove } from "react-icons/hi" 
import { ImBlocked } from "react-icons/im"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend } from "../../../features/friend";

const Friend = (props) => {
    const id = props.id;
    const [control, setControl] = useState(false);
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

    return(
        <div className="friend-wrap rounded-15 position-relative">
            <div className="friend-image rounded-15"  onClick={() => {setControl(false)}}>
                <img src={props.img} alt="" />
            </div>
            <div className="friend-info" onClick={() => {setControl(false)}}>
                <h5>{props.name}</h5>
                <p>{props.mutualNum}</p>
            </div>
            <div className="friend-control rounded-50" onClick={() => {setControl(!control)}}>
                <HiDotsHorizontal />
            </div>
            { control ? 
                <div className="friend-controller rounded-15 bg-white shadow">
                    <ul>
                        <li onClick={() => {dispatch(deleteFriend(token, id))}}><HiOutlineUserRemove /> Odebrat z přátel</li>
                        <li><ImBlocked/> Zablokovat</li>
                    </ul> 
                </div>
              : "" }
        </div>
    )
}

export default Friend