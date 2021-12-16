import "./StorySmall.css";

const StorySmall = (props) => {
    return(
        <div className="story-small rounded-15 position-relative">
            <img src={props.background} alt="" className="position-absolute story-bg"/>
            <img src={props.profilePic} alt="" />
            <p className="bold">{props.name}</p>
        </div>
    )
}

export default StorySmall;