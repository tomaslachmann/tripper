import "./Chat.css";
import { useSelector } from "react-redux";


const Friend = (props) => {
    return(
        <li>
            <div className="profile-pic">
                <img src={props.image} alt="" />
            </div>
            <span className="bold">{props.name}</span>
        </li>
    )
}

const Chat = () => {
    const friends = useSelector(state => state.friend.friends)

    return(
        <div className="chat-wrap bg-white rounded-15 shadow">
            <ul>
                {friends.map((item, i) => {
                    return <Friend key={i} name={item.firstName + " " + item.lastName} image={item.image}/>
                })}
            </ul>
        </div>
    )
}

export default Chat