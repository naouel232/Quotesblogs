const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require ('./routes/blogRoutes');
const { findById } = require('./models/blog');
const { result } = require('lodash');
const { render } = require('ejs');


//express app
const app = express();

//connect to mongodB
const dbURI = 'mongodb+srv://loulou:loulou1@mycluster.d2kkx.mongodb.net/base1?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true })
.then((result) =>app.listen(3000))
.catch((err) => console.log(err));

//register view engine

app.set('view engine', 'ejs');


//listen for requests 
//app.listen(3000);

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title:'new Blog 3', 
//     snippet:'about my new blog',
//     body:'more about my new blog'
//   });
//   blog.save()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })
// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//   .then((result) =>{
//     res.send (result) ;   
// })
// .catch((err) => {
//   console.log(err);
// });
// })
// app.get('/single-blog', (req, res) => {
//   Blog.findById('62d7d0c31c06b9864af43b5b')
//   .then((result) =>{
//     res.send (result) ;   
// })
// .catch((err) => {
//   console.log(err);
// });
// })




//routes
app.get('/', (req, res) =>{
// const blogs= [
//   {title:'naouel', snippet:'travaille à la radio'},
//   {title:'israa', snippet:'compte jusqu a cinquante'},
//   {title:'ella', snippet:'dessine un papillon'},
// ] ;
//res.render('index', {title: 'home', blogs});

res.redirect('/blogs');
});



app.get('/about', (req, res) =>{
 //res.sendFile('./views/about.html', {root:__dirname});

 res.render('about', {title: 'About'});
});
 
//blog routes

app.use('/blogs', blogRoutes);

//redirect we don t need it anymore
//app.get('/about-us', (req, res) =>{
  //  res.redirect('/about');
//})

//404 page
app.use((req, res) =>{
res.status(404).render('404', {title: '404'});
});