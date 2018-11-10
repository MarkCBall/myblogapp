var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller');

//add this with appropriate model
//const Post = require('../models/post');


//todo add user model
//create html or views to run the code
//modify app.js to route /users to this file



router.get('/', function ((req, res, next) {
    User.find(function (err,users) {
        //render views with all users
        //handle errors somehow
    }
});

router.post('/',  function ((req, res, next) {

 let formUser = req.body
    if (formPost.summary === undefined) {
        const postSummary = truncate(req.body.content, 20) + "...";
        formPost = Object.assign(formPost, {summary: postSummary});
    }
    const newUser = new Post(formUser);

    newUser.save().then(() => {
        res.redirect('/'+req.body.userName)
    }).catch(next)
    
});




// Export routes
module.exports = router;
