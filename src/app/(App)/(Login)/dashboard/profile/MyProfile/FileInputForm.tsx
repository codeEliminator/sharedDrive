'use client'
import React, {useState} from 'react'
import { useUser } from '@/context/UserContext'
import getFileExtensionName from './getFileExtensionName'
import { randomBytes } from 'crypto';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileInputForm :  React.FC<Props> = ({setActive}) => {
  const {user} = useUser()
  const [file, setFile] = useState<File>()
  const [fileName, setFileName] = useState('')
  const fileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFile(evt.target.files![0]);
    setFileName(`${user?.name}____${user?.email}___${user?.randomBytes}`);
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert('Please select file to upload')
      return;
    }
    const formData = new FormData(); 
    console.log(user?.name, user?.email)
    formData.append('file', file, fileName); 
    formData.append('username', user?.name!)
    formData.append('email', user?.email!)
  
    try {
      const response = await fetch('http://localhost:2525/upload', { 
        method: 'POST',
        body: formData, 
      });
  
      if (response.ok) {
        alert('Upload successful');
      } else {
        alert('Error');
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Error');
    }
  };
  
  return (
    <>
    <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col'>
      <input id='file' type="file" name='file' className="file-input w-full max-w-xs" accept='image/*' onChange={fileChange}/>
      <button className="btn btn-active btn-primary">Submit</button>
    </form>
    </>
  )
}
  

export default FileInputForm