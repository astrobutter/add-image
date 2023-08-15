import { useEffect, useState } from 'react';
import axios  from 'axios' ;
import './App.css';

function App() {
  const [file, setFile] = useState()
  const [image, setImage] = useState([])

  const handleUpload = (e) => {
    const  formdata = new FormData()
    formdata.append('file', file)
    axios.post('http://localhost:3000/upload', formdata)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  useEffect(() => {
      axios.get('http://localhost:3000/getImage')
      .then(res => setImage(res.data))
      .catch(err => console.log(err))
  })

  return (
    <>
    <div className='upload-section'>
      <h1>Add image to the gallery</h1>
      <div>
        <input type='file' onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <br/>
    </div>
    <div className='image-container'>
    {image?.map( img => {
      return <img src={`http://localhost:3000/uploads/`+img.image} alt='' /> 
    })}
    </div>
    </>
  )
}

export default App
