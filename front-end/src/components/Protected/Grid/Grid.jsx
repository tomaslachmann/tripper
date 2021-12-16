import Menu from "../Menu/Menu"
import Profile from "../Profile/Profile"
import Requests from "../Requests/Requests";
import Chat from "../Chat/Chat";
import "./Grid.css";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

import { useEffect } from "react";
import { selectUser } from "../../../features/auth";
import { selectRequests } from "../../../features/request";


const Grid = ({children}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const requests = useSelector(selectRequests);
    const classNames = /trips*/.test(location.pathname) ? "page-grid-center-right" : "page-grid-center";

    return(
        <div className="page-grid">
            <div className="page-grid-left">
                <Menu />
            </div>
            <div className={classNames}>
                {children}
            </div>
            {
                !/trips*/.test(location.pathname) ?
                <div className="page-grid-right">
                    <Requests />
                    <div className="chat">
                        <h5>PŘÁTELÉ</h5>
                        <Chat />
                    </div>
                </div>
                : ""
            }
        </div>
    )
}

//export default Grid

function mapStateToProps(state) {
    const { request } = state.request;
    const { message } = state.message;
    return {
      request,
      message
    };
  }
  
  export default connect(mapStateToProps)(Grid);