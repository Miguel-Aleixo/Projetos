const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbPath = './db.json';

// Util: ler e salvar dados
const lerPosts = () => JSON.parse(fs.readFileSync(dbPath));
const salvarPosts = (posts) => fs.writeFileSync(dbPath, JSON.stringify(posts, null, 2));

// Rotas

// GET todos os posts
app.get('/posts', (req, res) => {
    const posts = lerPosts();
    res.json(posts);
});

// GET um post
app.get('/posts/:id', (req, res) => {
    const posts = lerPosts();
    const post = posts.find(p => p.id == req.params.id);
    post ? res.json(post) : res.status(404).send('Post não encontrado');
});

// POST novo post
app.post('/posts', (req, res) => {
    const posts = lerPosts();
    const ultimoId = posts.length ? posts[posts.length - 1].id : 0;
    const novo = { ...req.body, id: Number(ultimoId) + 1 };
    posts.push(novo);
    salvarPosts(posts);
    res.status(201).json(novo);
});

// PUT atualizar
app.put('/posts/:id', (req, res) => {
    const posts = lerPosts();
    const index = posts.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).send('Post não encontrado');

    posts[index] = { ...posts[index], ...req.body };
    salvarPosts(posts);
    res.json(posts[index]);
});

// DELETE
app.delete('/posts/:id', (req, res) => {
    let posts = lerPosts();
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post não encontrado');

    posts = posts.filter(p => p.id != req.params.id);
    salvarPosts(posts);
    res.sendStatus(204);
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`🔥 API rodando em http://localhost:${PORT}`);
});
