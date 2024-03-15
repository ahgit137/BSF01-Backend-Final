// this file will deal with data

// Import Post Schema
const Post = require('../models/post');

// create a Post Controller  // this is "C" for CRUD
const createPost = async (req,res) => {   // request and response
    // Descructuring the body of the request
    const {title, author, description, likes, comments} = req.body;

    try {
        const post = await Post.create({
            title,
            author,
            description,
            likes,
            comments,
        });
        res.status(200).json(post);   // 200 is the status code
    } catch (error){   // catch if an error occurs
        res.status(400).json({error: error.message});   // 400 is the error code
    }
};

// Get all the post // this is the "R" for CRUD
// instructor's code
/*
const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            count: posts.length,
            posts,
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/
const getAllPosts = async(req, res) => {  // req is not used here since We don’t need anything from the req body
    try {
        const posts = await Post.find();
        res.status(200).json({
            count: posts.length,
            posts,
        })
    } catch (error) {
        res.status(400).json({ error: error.message});
    }


}

// Getting only a single post from database
// instructor's code
/*
//Get a single post 
// Get Post
const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await Post.findById({_id: id});
		if (!post) return res.status(404).json({ error: "No post found" });

		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
*/
const getPost = async(req, res) => {
    const {id} = req.params;
    try {               // extracting the id from the request parameters
        const post = await Post.findById({ _id: id });
//        const post = await Post.findById(id);    // this format also works
        if (!post) {
            return res.status(404).json({ errpr: "No post found." });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}

// Update a post // the U part of CRUD
// instructor's code
/*
//Update a post / U of CRUD
const updatePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndUpdate(
            {_id: id},
            { ...req.body },
            { new: true, runValidators: true}
        );
        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        };
        res.status(200).json({
            message: "The post has been successfullt updated.",
            post
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
*/
const updatePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true, runValidators: true}   // ensure data in mongoose is correct as per schema
        );
        if(!post) {
            return res.status(404).json({
                error: "Mo matching post found!"
            });
        };
        res.status(200).json({
            message: "The post has been successfully updated.",
            post
        });
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}


//Delete a single post
const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndDelete({_id : id});
        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        }
        res.status(200).json({
            message: "The post has been successfully deleted!"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Delete a single post
/*
const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndDelete({_id : id});
        if(!post) {
            return res.status(404).json({   // sending the status in JSON format
                error: "No matching post found!"
            });
        }
        res.status(200).json({
            message: "The post has been successfully deleted"   // sending the status in JSON format
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
*/

// now export the modules
module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};