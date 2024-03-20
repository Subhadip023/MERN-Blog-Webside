import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
function EditPost() {
  const [title, setTitle] = useState('');
  const [catrgory, setCategory] = useState('Uncategorized');
  const [desc, setDesc] = useState('');
  const [thumbnial, setThumbnial] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']

    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"]
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className='form__error-message'>this is an error massage</p>
        <form className="form create-post_form">
          <input type="text" placeholder='Title' value={title} onClick={e => setTitle(e.target.value)} autoFocus/>
          <select name='category' value={catrgory} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats}/>

          <input type="file" onChange={e => setThumbnial(e.target.files[0])} accept='png, jpg, jpeg' />
            <button type="submit" className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
