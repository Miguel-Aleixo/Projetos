'use client'

import Link from "next/link";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";

export default function Home() {
  const [nome, setNome] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [novaTarefa, setNovaTarefa] = useState('')
  const [idUsuario, setIdUsuario] = useState(null)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');

    if (usuarioSalvo) {
      const usuarioObj = JSON.parse(usuarioSalvo)
      setIdUsuario(usuarioObj.id)
    }
  }, [])

  useEffect(() => {
    if (idUsuario) {
      pegarDados();
    }
  }, [idUsuario]);

  const criarTarefa = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/novatarefa/${idUsuario}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ nome: novaTarefa })
    })
    .then(() => {
      pegarDados()
      setNovaTarefa('')
    })
  }

  const pegarDados = () => {
    fetch(`http://localhost:3000/usuarios/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setNome(data.nome)
        setTarefas(data.tarefas)

      })
      .catch(e => {
        console.error("Erro ao buscar dados do usuário:", e);
      });
  }

  const deletar = (idTarefa) => {
    fetch(`http://localhost:3000/usuarios/${idUsuario}/tarefas/${idTarefa}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTarefas(tarefasAntigas =>
          tarefasAntigas.filter(tarefa => tarefa.id !== idTarefa))
      })
      .catch(e => {
        console.log(e);
        alert('Não foi possivel deletar a tarefa')
      })
  }

  return (
    <div className="h-screen bg-zinc-100">
      <nav className="bg-black w-full py-2 px-2 flex flex-row justify-between items-center font-semibold text-white">
        <div className="flex flex-row items-center">
          <UserCircleIcon className="h-12 w-14 ml-1 transition-all duration-300 hover:opacity-70 cursor-pointer" />
          <p className="mt-1">{nome ? nome : ''}</p>
        </div>
        <h1 className="text-xl transition-all duration-300 text-center hover:opacity-70 cursor-pointer">Lista de tarefas</h1>
        <Link className="mx-4 py-2 px-4 bg-green-500 rounded-md transition-all duration-300 cursor-pointer hover:opacity-70" href='/login'><button className="cursor-pointer">Logar</button></Link>
      </nav>

      <main className="flex flex-col justify-center mt-10 mx-10">
        <section className="bg-white rounded-lg shadow-md p-10">
          <div>
            <form onSubmit={criarTarefa} className="flex gap-10">
              <input className="rounded-md bg-zinc-200 p-2" type="text" required placeholder="Nome da tarefa" value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)} />
              <button type="submit" className="bg-green-500 p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Criar tarefa</button>
            </form>
          </div>
          <ul>
            {tarefas.map(tarefa => (
              <div className="flex justify-between items-center p-4 bg-zinc-200 rounded-md shadow-sm my-5 " key={tarefa.id}>
                <li>{tarefa.nome}</li>
                <button onClick={() => deletar(tarefa.id)} className="bg-red-500 p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Deletar</button>
              </div>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
