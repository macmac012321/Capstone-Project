const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.static('public')); // serve CSS
app.set('view engine', 'ejs');

let posts = []; // temporary storage

// Home page - show all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Create post page
app.get('/create', (req, res) => {
  res.render('create');
});

// Handle post creation
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now(); // simple unique id
  posts.push({ id, title, content });
  res.redirect('/');
});

// Edit post page
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send('Post not found');
  res.render('edit', { post });
});

// Handle post update
app.post('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send('Post not found');
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
