import { useState } from "react";
import Header from "../../../components/public/Header/Header";
import LoginModal from "../../../components/public/LoginModal/LoginModal";
import "./Home.css";


const HomePage = () => {
    const [modalState, setModalState] = useState("");
    const [login, setLogin] = useState(false);
   
    return(
        <div className="wrap width-100">
            <Header setModalState={setModalState}/>
            <div className="grid position-relative">
                <div className="width-100 bg-grey flex-vertical landing-left">
                    <h1>Plánujte váš příští <br />trip s lidmi, co vás baví.</h1>
                    <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy </h4>
                    <div 
                    className="width-100 circle-wrap"
                    style={{
                        display:"grid",
                        gridTemplateColumns:"repeat(2,1fr)",
                    }}>
                        <div>
                            <div className="circle"></div>
                            <h5>Zahraniční tripy</h5>
                            <p>lorem ipsum doner sit emet</p>
                        </div>
                        <div>
                            <div className="circle"></div>
                            <h5>Zahraniční tripy</h5>
                            <p>lorem ipsum doner sit emet</p>
                        </div>
                    </div>
                </div>
                <div className="width-100">
                    <img src="bg.jpg" />
                </div>
                <div className="circle-overlay position-absolute circle1"><img src="circle1.jpg" alt="" /></div>
                <div className="circle-overlay position-absolute circle2"><img src="circle2.jpg" alt="" /></div>
                <div className="circle-overlay position-absolute circle3"><img src="circle3.jpg" alt="" /></div>
                <div className="circle-overlay position-absolute circle4"><img src="circle4.jpg" alt="" /></div>
                
            </div>
            {modalState === 'login' ? <LoginModal setModalState={setModalState} setLogin={setLogin} /> : ""}
        </div>
        
    )
}

export default HomePage;