const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const User = require('../models/User');
const { where } = require('sequelize');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const image = req.file ? req.file.filename : null;
        const newPost = await Post.create({ title, content, image, userId });
        res.send({ post_n: newPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all posts with username
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const postsWithUsernames = posts.map(post => {
            return {
                ...post.dataValues,
                username: post.User.username,
            };
        });

        res.status(200).json(postsWithUsernames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id',async (req,res)=>{
    const id=req.params.id;
    try {
        const post=await Post.findOne({where:{id}});
        console.log("postfetched");
        res.send({post});
    } catch (error) {
        
    }
});

module.exports = router;
Post.sync()
  .then(() => console.log('Posts table synced'))
  .catch(error => console.error('Unable to sync Posts table:', error));

module.exports = router;
