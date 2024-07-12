import React, { useId, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Compose = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCompose = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const userId = localStorage.getItem('id');
        formData.append('title', title);
        formData.append('content', content);
        formData.append('userId', userId);
        if (image) {
            formData.append('image', image);
        }
       
        try {
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response) {
                setTitle('');
                setContent('');
                setImage(null);
                setErrorMessage('');
                navigate('/'); // Navigate after successful submission
            } else {
                setErrorMessage('Error: ' + (response.data.message || 'Failed to create post.'));
            }
        } catch (error) {
            console.error('Error posting data:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                setErrorMessage(`Error posting data: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                console.error('Request data:', error.request);
                setErrorMessage('No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                setErrorMessage('Error posting data: ' + error.message);
            }
        }
    };

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className='compose-form'>
            <h2 class='comhead'>Compose</h2>
            <form onSubmit={handleCompose}>
                <label className='kan'>
                    Title:
                    <textarea  style="color:red;"value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label className='kan'>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <br />
                <div {...getRootProps()} className='dropzone'>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop an image here, or click to select an image</p>
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    );
};

export default Compose;
