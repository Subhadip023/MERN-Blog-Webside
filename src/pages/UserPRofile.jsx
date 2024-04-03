import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { UserContext } from "../contex/userContex";
import upperCase1st from "../uppercase1st";
import userAvater from '../img/Author-img/user-33638_640.png'
import axios from "axios";

function UserProfile() {
  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState(`${currentUser.name}`);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const { id } = useParams();

const changeAvatarHandler = async () => {
  setIsAvatarTouched(false);
  try {
    const formData = new FormData();
    formData.append("avatar", avatar); // Append the file directly, no need for base64 conversion

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
      formData, // Send the FormData containing the file
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    // Assuming response.data.avatar contains the URL of the updated avatar
    setAvatar(response.data.avatar);
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
};

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // Example:
    console.log("Form submitted!");
  };

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${id}`} className="btn">
          My posts
        </Link>
        <div className="profile_details">
          <div className="avater_wrapper">
          <div className="profile_avatar">
  <img src={userAvater} alt="User Avatar" />
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
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile_avatar-btn"
                onClick={changeAvatarHandler}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{upperCase1st(currentUser.name)}</h1>
          <form className="form profile_form" onSubmit={handleSubmit}>
            <p className="form__error-message">This is an Error Message</p>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update My details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
