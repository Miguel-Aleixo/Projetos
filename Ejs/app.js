const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');

app.get('/', (req, res) => {
    res.render('inicio');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

const pessoas = [];

app.post('/cadastro', (req, res) => {
  const { email_cadastro, senha_cadastro, nome_cadastro } = req.body;

  var pessoa = {
    nome: nome_cadastro,
    email: email_cadastro,
    senha: senha_cadastro,
  }

  pessoas.push(pessoa);

  res.render('login');
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const pessoaEncontrada = pessoas.find(pessoa => pessoa.email === email && pessoa.senha === senha)

    if(pessoaEncontrada) {
      res.render('index2', { email: pessoaEncontrada.email, senha: pessoaEncontrada.senha, nome: pessoaEncontrada.nome});
    } else {
      console.log('Usuário incorreto!');
    }
  });
  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
