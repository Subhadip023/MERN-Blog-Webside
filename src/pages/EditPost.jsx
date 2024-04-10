import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contex/userContex.js";
import axios from "axios";
import Loader from "../components/Loader.jsx";

function EditPost() {
  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();

  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Science News",
    "Technology Trends",
    "Innovation and Startups",
    "Gadgets and Gear Reviews",
    "How-To Guides and Tutorials",
    "Science Education and Outreach",
    "Future Tech and Futurism",
    "Tech and Society",
    "Data Science and Analytics",
    "Entrepreneurship and Business",
    "Internet and Digital Culture",
    "Green Tech and Sustainability"
  ];

  const navigate = useNavigate();

  const handleChange = (value) => {
    setDesc(value);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setTitle(response.data.title);
        setDesc(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    if (!title || !category || !desc) {
      setError("Please fill in all fields.");
      return;
    }

    const postData = new FormData();
    postData.append("title", title);
    postData.append("category", category);
    postData.append("description", desc);
    if (thumbnail) {
      postData.append("thumbnail", thumbnail);
    }

    sendData(postData);
  };

  const sendData = async (data) => {
    try {
      setIsloading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        data,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsloading(false);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setIsloading(false);
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertImageToBase64(file);
    setThumbnail(base64Image);
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  if (isloading) {
    return <Loader />;
  }

  return (
    <section className="edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form edit-post_form" onSubmit={editPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill
            value={desc}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
          <input
            type="file"
            onChange={handleThumbnailChange}
            accept="image/png, image/jpeg"
          />
          <button type="submit" className="btn primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
