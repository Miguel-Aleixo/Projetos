"use client";

import { useEffect, useState } from "react";
import { getPosts, createPost } from "../lib/api";
import Post from "../components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const dados = await getPosts();
      setPosts(dados);
    } catch (err) {
      alert("Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (e) => {
    e.preventDefault();
    if (!titulo || !texto) return alert("Preencha tudo!");

    try {
      const novo = await createPost({ title: titulo, body: texto });
      setPosts([...posts, novo]);
      setTitulo("");
      setTexto("");
    } catch (err) {
      alert("Erro ao criar post");
    }
  };

  const atualizarPost = (postAtualizado) => {
    setPosts(posts.map(p => (p.id === postAtualizado.id ? postAtualizado : p)));
  };

  const deletarPost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Posts</h1>

      <form onSubmit={adicionar} style={{ marginBottom: 20 }}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          placeholder="Texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {loading ? <p>Carregando...</p> : posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onUpdate={atualizarPost}
          onDelete={deletarPost}
        />
      ))}
    </div>
  );
}
