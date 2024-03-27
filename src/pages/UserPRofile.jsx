import React, { useState  ,useContext} from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../img/Author(dumy).jpeg";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../contex/userContex";
import upperCase1st from "../uppercase1st";
function UserPRofile() {
  const {currentUser}=useContext(UserContext);
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState(`${currentUser.name}`);
  const [email, setEmail] = useState(``);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const {id}=useParams();
  return (
    <section className="profile">
      <div className="container profile_container">
      <Link to={`/myposts/${id}`} className="btn">
          My posts
        </Link>
        <div className="profile_details">
          <div className="avater_wrapper">
            <div className="profile_avatar">
              <img src={avatar} alt="" />
            </div>
            {/* Form to update avatar */}
            <form className="avatar_form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
              />
              <label htmlFor="avatar">
                <FaEdit />
              </label>
            </form>
            <button className="profile_avatar-btn">
              <FaCheck />
            </button>
          </div>
          <h1>{upperCase1st(currentUser.name)}</h1>
          <form className="form profile_form">
            <p className="form__error-message">This is an Error Message</p>
            <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="currentPassword" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder="newPassword" value={newPassword} onChange={e=>setNewPassword(e.target.value)}/>
            <input type="password" placeholder="confirmNewPassword" value={confirmNewPassword} onChange={e=>setconfirmNewPassword(e.target.value)}/>
            <button type="submit" className="btn primary">Update My details</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserPRofile;
