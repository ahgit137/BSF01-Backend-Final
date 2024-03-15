// instructor's code
/*
/Import the Express
const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost
} = require('../controllers/post');

//Create Routers
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.patch('/:id', updatePost);

module.exports = router;
*/

// this file will deal with the server

const express = require('express');   // import the Express
const router = express.Router();

// now import createPost from post.js in controller
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/post');

/*  code before auth middleware is created:
// Create Router
router.post('/', createPost);
router.get('/', getAllPosts);

//router.get('/id', getPost);   // this is wrong syntex
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
*/

//  code after auth middleware is added:
const { authMiddleware } = require("../middleware/authMiddleware");

// Create Router
router.post('/', authMiddleware, createPost);   // only posting needs authorizqtion
router.get('/', getAllPosts);

//router.get('/id', getPost);   // this is wrong syntex
router.get('/:id', getPost);
router.patch('/:id', authMiddleware, updatePost);  // only patching needs authorizqtion
router.delete('/:id', authMiddleware, deletePost);  // only deleting needs authorizqtion



module.exports = router;
