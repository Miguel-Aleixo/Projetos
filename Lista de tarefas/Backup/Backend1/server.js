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
const lerUsuarios = () => JSON.parse(fs.readFileSync(dbPath));
const salvarUsuarios = (usuarios) => fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));

// Rotas

// Pegar um usuario

app.get('/usuarios/:id', (req, res) => {
    const usuarios = lerUsuarios()
    const id = req.params.id

    const index = usuarios.findIndex(u => u.id == id)

    if (index === -1) {
        return res.status(401).json({ mensagem: 'Id incorreto' });
    }

    const usuario = usuarios[index]

    const { nome, tarefas } = usuario

    const usuarioFormatado = { nome, tarefas }

    res.status(200).json(usuarioFormatado)
})

// Cadastro usuario

app.post('/cadastro', (req, res) => {
    const usuarios = lerUsuarios();
    const ultimoId = usuarios.length ? usuarios[usuarios.length - 1].id : 0;
    const novo = { ...req.body, id: Number(ultimoId) + 1 };
    usuarios.push(novo);
    salvarUsuarios(usuarios);
    res.status(201).json(novo);
});

// Login usuario

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }

    const { id } = usuario

    const usuarioSimplificado = { id };

    return res.status(200).json({ mensagem: 'Login bem-sucedido', usuario: usuarioSimplificado });
});

// Criar tarefa

app.post('/novatarefa/:id', (req, res) => {
    const usuarios = lerUsuarios()
    const novaTarefa = req.body
    const idUsuario = req.params.id

    const index = usuarios.findIndex(u => u.id == idUsuario)

    console.log('Corpo recebido:', req.body);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const usuario = usuarios[index]

    const ultimoId = usuario.tarefas.length
        ? Math.max(...usuario.tarefas.map(t => t.id)) + 1
        : 0;

    const tarefaComId = { id: ultimoId, ...novaTarefa };

    usuario.tarefas.push(tarefaComId)

    usuarios[index] = usuario
    salvarUsuarios(usuarios);

    return res.status(201).json({ mensagem: 'Tarefa criada com sucesso' });
})

// Deletar tarefa

app.delete('/usuarios/:idUsuario/tarefas/:idTarefa', (req, res) => {
    const usuarios = lerUsuarios()
    const { idUsuario, idTarefa } = req.params
    const indexUsuario = usuarios.findIndex(u => u.id == idUsuario)

    if (indexUsuario === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const usuario = usuarios[indexUsuario]

    const indexTarefa = usuario.tarefas.findIndex(u => u.id == idTarefa)

    if (indexTarefa === -1) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrado' });
    }

    usuario.tarefas.splice(indexTarefa, 1)

    usuarios[indexUsuario] = usuario;
    salvarUsuarios(usuarios)

    res.status(200).json({ mensagem: 'Tarefa excluída com sucesso' });
})

// Alterar tarefa

app.put('/usuarios/:idUsuario/alterar/:idTarefa', (req, res) => {
    const usuarios = lerUsuarios();
    const { idUsuario, idTarefa } = req.params;
    const tarefaAlterada = req.body;
    
    const indexUsuario = usuarios.findIndex(u => u.id == idUsuario);
    if (indexUsuario === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const usuario = usuarios[indexUsuario];

    const indexTarefa = usuario.tarefas.findIndex(t => t.id == idTarefa);
    if (indexTarefa === -1) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }

    usuario.tarefas[indexTarefa] = tarefaAlterada

    usuarios[indexUsuario] = usuario;
    salvarUsuarios(usuarios);

    res.status(200).json({ mensagem: 'Tarefa alterada com sucesso' });
});


// Inicia servidor
app.listen(PORT, () => {
    console.log(`🔥 API rodando em http://localhost:${PORT}`);
});
