// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
            console.log(response.data);
                setPost(response.data.post);
            } catch (error) {
                setError('Error fetching post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <div className="post-detail">
            <h1 className='postdtitle'>{post.title}</h1>
            {post.image && <img className='post-detail_img' src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />}

            <p>{post.content}</p>
        </div>
    );
};

export default PostDetail;
