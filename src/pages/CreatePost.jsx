import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contex/userContex.js';
import axios from 'axios';

function CreatePost() {
  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"];

  const navigate = useNavigate();

  const handleChange = (value) => {
    setDesc(value);
  };

  const createPosts = async (e) => {
    e.preventDefault();
  
    // Check if any required fields are empty
    if (!title || !category || !desc || !thumbnail) {
      setError("Please fill in all fields.");
      return;
    }
  
    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
  
      const postData = new FormData();
      postData.set("title", title);
      postData.set("category", category);
      postData.set("thumbnail", thumbnail);
      postData.set("description", desc);
      postData.set("imageBase64", base64Image); // Include base64 image in form data
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
  
        navigate("/");
      } catch (error) {
        setError(error.response.data.message);
      }
    };
  
    // Read the image file as base64
    reader.readAsDataURL(thumbnail);
  };
  

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className="form create-post_form" onSubmit={createPosts}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill
            value={desc}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type="submit" className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost;
