import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logout from './Logout';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (error) {
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };
        
        fetchPosts();
    }, []);
    
    console.log(posts);
    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const topPosts = posts.slice(0, 3);
    const remainingPosts = posts.slice(3);

    return (
        <div className='recentposts'>
            {topPosts.length > 0 && (
                <div className="carousel-container">
                    <h2>Recent Posts</h2>
                    <Slider {...settings}>
                        {topPosts.map(post => (
                            <div key={post.id} className="post1">
                                {post.image && (
                                    <div className="image-container">
                                        <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
                                        <div className="hover-info">
                                            <h3 className="post-title">{post.title}</h3>
                                            <p className="post-content">{post.content.slice(0, 100)}...</p>
                                            <span className="hover-date">{new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</span>
                                            <span className="hover-user">username:{post.username}</span>
                                            <Link to={`/posts/${post.id}`} className="read-more">Read more</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            <div className="remaining-posts">
                <h2>OldER PoStS</h2>
                {remainingPosts.length === 0 ? (
                    <p>No more posts available.</p>
                ) : (
                 
                    remainingPosts.map(post => (
                        <div key={post.id} className="post2">
                           
                            {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />}
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-content">{post.content}</p>
                            <h4><Link to={`/posts/${post.id}`}>read more</Link></h4>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default Home;
