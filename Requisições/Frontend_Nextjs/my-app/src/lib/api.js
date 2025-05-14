const BASE_URL = "http://localhost:3000/posts";

export async function getPosts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar posts");
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Erro ao criar post");
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar post");
}

export async function updatePost(id, post) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Erro ao atualizar post");
  return res.json();
}
