const Post = require('../models/post');
//var title = "My Blog App";

// Displays a list of all blog posts
exports.index = function (req, res, next) {
    Post.find().exec((err, posts) => {
        console.log(posts)
        res.locals.posts = posts
        res.locals.title = "Blog Posts"
        res.render('posts/index')
    });
};

// /blog/:slug
// req.params.slug
exports.show = function (req, res, next) {
    Post.find().exec((err, posts) => {
        let post = posts.filter(x => x['slug'] === req.params['slug'])[0];
        res.render('posts/show', { title: posts['title'], post })
    });
};

exports.new = function(req, res, next) {
    // let post = posts[0];
    // let message = ""
    // let post = {
    //     title: "",
    //     content: ""
    // }
    res.locals.title = "New Blog Post"
    res.locals.post = {title: "", content: "", summary: ""}
    res.locals.message  = ""
	res.render('posts/new');
};

// exports.new = function (req, res, next) {
// 	console.log('here')
// 	res.render('posts/create', { title: "New Post", test: 'hello'});
// };

exports.create = function (req, res, next) {

    // BELOW WAS USED TO GENERATE A SLUG 
    // REMOVED AS USING THE NPM MODULE mongoose-slug-generator
    // const formPost = req.body;
    // const postSlug = formPost.title.replace(/\s/g,"-").toLowerCase();
    // formPost['slug'] = postSlug.toLowerCase()

    // this mongoose-slug-generator is a better solution as it ensures uniqueness
    // https://www.npmjs.com/package/mongoose-slug-generator to generate a unique
    // slug - see models/posts.js

    function truncate(str, no_words) {
      return str.split(" ").splice(0, no_words).join(" ");
    }
    let formPost = req.body
    if (formPost.summary === undefined) {
        const postSummary = truncate(req.body.content, 20) + "...";
        formPost = Object.assign(formPost, {summary: postSummary});
    }
    const newPost = new Post(formPost);

    newPost.save().then(() => {
        res.redirect('/blog')
    }).catch(next)
};


//deletes a record that has a title which matches the slug
exports.delete = function (req, res, next) {


    //find a post with the title equal to the slug and delete it
    //using req.params.slug instead of given req.params['slug'])[0] as it is cleaner
    Post.deleteOne({title: req.params.slug}, function(err,result){  //A.deleteOne(conditions, callback)
        if (err)
            //if the callback function returns an error, let the next middleware error handler handle it
            next();
        //set the status of the operation to 202 to indicate the data was marked for deletion and end the response
        res.status(202).end();
    });

};
//updates a record based on the title matching - updates the fields specified by the body of the request
exports.update = function (req, res, next) {

    //find a post with the title equal to the slug
    //update any field values given in the request's body to corresponding value in request's body
    Post.findOneAndUpdate( {title: req.params.slug} ,  req.body, function(err,result){ //A.findOneAndUpdate(conditions, update, callback)
        if (err)
            //if the callback function returns an error, let the next middleware error handler handle it
            next();
        //set the status of the operation to 202 to indicate the data updated was accepted
        res.status(202).end();
        //we could change this to respond with the document's new data with the newly updated records
    });
    
};

