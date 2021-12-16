import "./Profile.css"

const Profile = (props) => {
    return(
        <div className="shadow rounded-15 bg-white profile-card">
            <div className="profile-pic">
                <img src="" alt="" />
            </div>
            <div>
                <h4>{props.name}</h4>
                <p>Zobrazit profil</p>
            </div>
        </div>
    )
}

export default Profile