import express from 'express';
import { tarefaRouter } from '../routes/tarefaRoutes';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(tarefaRouter)

app.get('/', function (req, res) {
    res.render('index', { message: 'Hello' });
});

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});