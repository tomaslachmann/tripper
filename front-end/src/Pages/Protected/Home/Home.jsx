
import "./Home.css";
import { useState } from "react";
import StorySmall from "../../../components/Protected/Stories/StorySmall";

const HomePage = () => {
    const [status, setStatus] = useState("");

    let arr = [];
    for(let i = 0; i < 10; i++){
        let obj = {
            name:"tomas lachmann",
            background:null,
            profilePic:null
        }
        arr.push(obj)
    }

    return(
        <div className="wrap width-100">
            <div className="story-wrap">
                <div className="story-overlay">
                {
                    arr.map((item, i) => {
                        return <StorySmall key={i} />
                    })
                }
                </div>
            </div>
            <div className="post rounded-15 bg-white">
                <div className="profile-pic">
                    <img src="" alt="" />
                </div>
                <textarea name="" id="" value={status} onInput={e => setStatus(e.target.value)} placeholder="Co je nového?">

                </textarea>
                <button className="bg-blue rounded-15 color-white">
                    Zveřejnit
                </button>
            </div>
        </div>
        
    )
}

export default HomePage;