'use client'
import React, {useState} from 'react'
import { useUser } from '@/context/UserContext'

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileInputForm :  React.FC<Props> = ({setActive}) => {
  const {user} = useUser()
  const [image, setImage] = useState('')
  const fileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      var reader = new FileReader()
      reader.readAsDataURL(evt.target.files![0])
      reader.onload = () => {
        if (typeof reader.result === 'string')
          setImage(reader.result);
      }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      console.log('No file selected');
      return;
    }
    try {
      const response = await fetch('http://localhost:2525/uploadFile', {
        method: 'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({base64: image, email: user?.email}), 
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      if(data.status == 200){
        setActive(false)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
    <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col'>
      <input id='file' type="file" className="file-input w-full max-w-xs" accept='image/*' onChange={fileChange}/>
      <button className="btn btn-active btn-primary">Submit</button>
    </form>
    </>
  )
}

export default FileInputForm