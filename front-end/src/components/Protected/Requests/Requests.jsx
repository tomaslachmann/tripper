import "./Requests.css";
import { useState, useEffect } from "react";
import Request from "../Request/Request";
import { useSelector, useDispatch } from "react-redux";
import { get } from "../../../features/request";

const Requests = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const currentRequests = useSelector(state => state.request)

    useEffect(() => {
        dispatch(get(token))
    }, []);
    
   
    return(
        <div className="requests">
            <h5>ŽÁDOSTI</h5>
            {  (currentRequests.requests) &&
               currentRequests.requests.length > 0 ? currentRequests.requests.slice(0,2).map((item, i) => {
                    return <Request key={i} name={item.firstName + " " + item.lastName} id={item.id} />
                }) : ""
            }
        </div>
    )
}

export default Requests