import { log } from 'console';
import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './public');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('index', { message: 'Hello' });
});

app.post('/login', function (req, res) {
  const email = req.body.email
  const senha = req.body.senha


  res.render('index2', {email, senha});
});

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});
