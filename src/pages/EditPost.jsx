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
  const [thumbnail, setThumbnail] = useState("");
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
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
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
        // setTitle(response.data.title)
      } catch (error) {}
    };
    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
  
    // Check if any required fields are empty
    if (!title || !category || !desc) {
      setError("Please fill in all fields.");
      return;
    }
  
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", desc);
  
    // Check if an image is selected
    if (thumbnail) {
      // Compress the selected image
      const compressedThumbnail = await compressImage(thumbnail, 100); // 100kb limit
      if (compressedThumbnail) {
        postData.set("thumbnail", compressedThumbnail);
      } else {
        console.error("Failed to compress image.");
        return;
      }
    }
  
    // Send the data to the server
    sendData(postData);
  };
  
  const compressImage = async (imageFile, maxSizeInKB) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 500; // Max width for compressed image
          const maxHeight = 500; // Max height for compressed image
  
          let width = img.width;
          let height = img.height;
  
          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert canvas to base64 JPEG with specified quality
          const compressedImageData = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality
  
          // Convert base64 to Blob
          const byteString = atob(compressedImageData.split(",")[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
  
          // Check if compressed image size is under the limit
          if (blob.size <= maxSizeInKB * 1024) {
            resolve(blob);
          } else {
            resolve(null); // Image size exceeds the limit
          }
        };
      };
    });
  };
  
  
  const sendData = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        data,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  


  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post_form" onSubmit={editPost}>
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
              <option key={cat}>{cat}</option>
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
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg"
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
