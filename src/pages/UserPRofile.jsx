import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { UserContext } from "../contex/userContex";
import upperCase1st from "../uppercase1st";
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
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target.result;
  
        // Send base64 image to server
        try {
        setAvatar(base64Image)
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
            { avatar: base64Image}, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // setAvatar(response.data.avatar);
        } catch (error) {
          console.error("Error sending base64 image to server:", error);
        }
      };
      reader.readAsDataURL(avatar);
    } catch (error) {
      console.error("Error converting image to base64:", error);
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
