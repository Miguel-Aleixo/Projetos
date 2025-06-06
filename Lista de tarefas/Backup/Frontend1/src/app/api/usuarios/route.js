let usuarios = []

export async function POST(request) {
    const dados = await request.json()

    const novoUsuario = {
        id: usuarios.length + 1,
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        telefone: dados.telefone,
        endereco: dados.endereco,
        tarefas: []
    }

    usuarios.push(novoUsuario)

    return new Response(JSON.stringify(novoUsuario), {
        status: 201,
    });
}

export async function GET() {
    return Response.json(usuarios)
}