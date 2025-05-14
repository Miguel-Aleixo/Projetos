"use client";

import { useState } from "react";
import { deletePost, updatePost } from "../lib/api";

export default function Post({ post, onUpdate, onDelete }) {
  const [editando, setEditando] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const salvar = async () => {
    try {
      const atualizado = await updatePost(post.id, { title, body });
      onUpdate(atualizado);
      setEditando(false);
    } catch (err) {
      alert("Erro ao salvar post");
      console.error(err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <p><strong>ID:</strong> {post.id}</p>
      {editando ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <button onClick={salvar}>Salvar</button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </>
      )}
      <button onClick={async () => {
        await deletePost(post.id);
        onDelete(post.id);
      }}>Deletar</button>
    </div>
  );
}
