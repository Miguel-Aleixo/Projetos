'use client'

import { useState, useEffect, useId } from "react"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [postIdAlterado, setPostIdAlterado] = useState(null)
  const [tituloAlterado, setTituloAlterado] = useState('')
  const [textoAlterado, setTextoAlterado] = useState('')

  // Get

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(e => {
        alert('Erro no carregamento')
        console.log(e)
      })
  }, [postIdAlterado])

  // Post

  const handleSubmit = async e => {
    e.preventDefault()

    if (!titulo || !texto) return alert('Preencha os campos')

    const novoPost = {
      title: titulo,
      body: texto,
      userId: 1
    }

    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoPost),
    })

    const postCriado = await res.json();
    setPosts(prev => [...prev, postCriado]);
    setTitulo('');
    setTexto('');
  }

  // Delete

  const deletarPost = async id => {

    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
      })
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      alert('Erro ao deletar o post')
      console.log(e);
    }
  }

  // Put 

  const salvarPost = async (id, userId) => {

    const novosDados = {
      id: id,
      title: tituloAlterado,
      body: textoAlterado,
      userId: userId
    }

    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novosDados)
      })
    } catch (e) {
      alert('Erro ao mudar os dados')
      console.log(e);
    }

    setPostIdAlterado(null)
  }

  const alterarPost = (id, title, body) => {

    setTituloAlterado(title)
    setTextoAlterado(body)
    setPostIdAlterado(id);
  }

  return (
    <main>
      <h1 className="font-bold text-xl text-center p-2">Teste de Posts</h1>

      <form className="font-semibold flex flex-col mx-2 rounded-md bg-zinc-100 shadow-sm gap-2 p-4 mb-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="titulo">Título</label>
          <input className="rounded-md p-1 bg-white"
            id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="texto">Texto</label>
          <input className="rounded-md p-1 bg-white"
            id="texto" value={texto} onChange={e => setTexto(e.target.value)} />
        </div>

        <div className="flex flex-col items-center mt-1">
          <button className="border-2 rounded-md w-full cursor-pointer bg-green-500 text-white p-1 border-zinc-200" type="submit">Postar</button>
        </div>
      </form>

      {loading ? (
        <p className="text-center font-semibold mt-2">Carregando...</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            {postIdAlterado !== post.id ? (
              <div className="flex flex-col gap-2 p-4 font-semibold bg-zinc-100 shadow-sm mx-2 my-4 rounded-md">

                <div className="flex flex-col gap-2 mx-1">
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <small>ID: {post.id}</small>
                </div>

                <div className="flex gap-2">
                  <button className="cursor-pointer bg-red-500 rounded-md px-2 text-white p-1" onClick={() => deletarPost(post.id)}>Deletar</button>
                  <button className="cursor-pointer bg-green-500 rounded-md px-2 text-white p-1" onClick={() => alterarPost(post.id, post.title, post.body)}>Alterar</button>
                </div>

              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4 font-semibold bg-zinc-100 shadow-sm mx-2 my-4 rounded-md">

                <div className="flex flex-col gap-2">
                  <input className="rounded-md p-1 bg-white" value={tituloAlterado} onChange={e => setTituloAlterado(e.target.value)} />
                  <input className="rounded-md p-1 bg-white" value={textoAlterado} onChange={e => setTextoAlterado(e.target.value)} />
                </div>

                <div className="flex gap-2" >
                  <button className="cursor-pointer bg-red-500 rounded-md px-2 text-white p-1" onClick={() => deletarPost(post.id)}>Deletar</button>
                  <button className="cursor-pointer bg-green-500 rounded-md px-2 text-white p-1" onClick={() => salvarPost(post.id, post.userId)}>Salvar</button>
                </div>

              </div>
            )}
          </div>
        ))
      )}
    </main>
  )
}