import "./Friends.css";
import Friend from "../Friend/Friend";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFriends } from "../../../features/friend";



const Friends = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const friends = useSelector(state => state.friend)

    useEffect(() => {
        dispatch(getAllFriends(token))
    }, []);
    
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return(
        <div className="friends-wrap width-100 rounded-15 bg-white shadow">
            <div className="friends-control-panel">
                <h1>Přátelé</h1>
                <input type="text" name="search" id="" value={search} placeholder="Hledat" onInput={ e => setSearch(e.target.value)} />
            </div>
            {
                (friends.friends) ? friends.friends.map((item, i) => {
                    return <Friend 
                            key={i} 
                            name={item.firstName + " " + item.lastName} 
                            mutualNum={randomIntFromInterval(5,50) + " společných přátel"} 
                            id={item.id}
                            img="circle2.jpg" />
                }) : ""
            }
        </div>
    )
}

export default Friends