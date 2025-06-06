'use client'

import Link from "next/link";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";

export default function Home() {

  // Dados
  const [nome, setNome] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [idUsuario, setIdUsuario] = useState(null)

  // Tarefa nova
  const [novaTarefa, setNovaTarefa] = useState('')

  // Ver se está logado
  const [logado, setLogado] = useState(false)

  // Alterar
  const [alterarTarefaId, setAlterarTarefaId] = useState(null);
  const [tarefaAlterada, setTarefaAlterada] = useState('');

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

    if(logado == false) return alert('Faça o login para criar tarefas')

    fetch(`http://localhost:3000/novatarefa/${idUsuario}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novaTarefa, finalizada: false })
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
        setNome(data.nome)
        setTarefas(data.tarefas)
        setLogado(true)
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

  const alterar = (idTarefa, nomeTarefa) => {
    setAlterarTarefaId(idTarefa)
    setTarefaAlterada(nomeTarefa)
  }

  const salvar = async (idTarefa, tarefaFinalizada) => {

    if (!tarefaAlterada) {
      alert('Preencha o campo')
    }

    try {

      const tarefaAlteradaObj = {
        id: idTarefa,
        nome: tarefaAlterada,
        finalizada: tarefaFinalizada
      }

      await fetch(`http://localhost:3000/usuarios/${idUsuario}/alterar/${idTarefa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefaAlteradaObj)
      })

      await pegarDados()

      setAlterarTarefaId(null)
    } catch (e) {
      console.log(e)
    }

  }

  const sair = () => {
    localStorage.removeItem('usuarioLogado')

    setIdUsuario(null)
    setNome('')
    setTarefas([])

    setLogado(false)
  }

  const finalizada = (idTarefa, nomeTarefa) => {
    const index = tarefas.findIndex(e => e.id == idTarefa);
    const novaFinalizada = !tarefas[index].finalizada;

    const tarefaAtualizada = {
      id: idTarefa,
      nome: nomeTarefa,
      finalizada: novaFinalizada
    };

    fetch(`http://localhost:3000/usuarios/${idUsuario}/alterar/${idTarefa}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefaAtualizada)
    })
      .then(() => pegarDados())
      .catch(e => console.log(e));
  }

  return (
    <div className="min-h-screen bg-white md:bg-zinc-100">
      <nav className="bg-black w-full py-2 px-2 flex flex-row justify-between items-center font-semibold text-white">
        <div className="flex flex-row items-center">
          <UserCircleIcon className="h-12 w-14 ml-1 transition-all duration-300 hover:opacity-90 cursor-pointer" />
          <p className="mt-1 hidden md:block">{nome ? nome : 'Visitante'}</p>
        </div>
        <h1 className="text-xl transition-all duration-300 text-center hover:opacity-90 cursor-pointer">Lista de tarefas</h1>
        {logado ? (
          <div>
            <button onClick={sair} className="relative bottom-0 mx-4 py-2 px-4 bg-red-500 rounded-md shadow-sm transition-all duration-300 cursor-pointer hover:bg-red-400 cursor-pointer">Sair</button>
          </div>
        ) : (
          <div>
            <Link className="mx-4 py-2 px-4 bg-green-500 rounded-md transition-all duration-300 cursor-pointer hover:opacity-70" href='/login'><button className="cursor-pointer">Logar</button></Link>
          </div>
        )}
      </nav>

      <main className="flex flex-col justify-center md:py-10 md:px-20">
        <section className="bg-white rounded-lg md:shadow-md p-10 ">

          <div>
            <form onSubmit={criarTarefa} className="flex flex-col md:flex-row gap-5">
              <input className="rounded-md transition-all duration-300 hover:shadow-lg shadow-sm outline-none bg-zinc-200 p-2" type="text" required placeholder="Nome da tarefa" value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)} />
              <button type="submit" className="bg-green-500 relative bottom-0 hover:bottom-1 p-2 shadow-sm text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Criar tarefa</button>
            </form>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-5">

            <div className="flex w-full flex-col gap-2 ">
              <h1 className={`font-bold text-lg text-center ${tarefas == '' ? 'hidden' : ''}`}>Tarefas pendentes</h1>
              <div className={`bg-zinc-300 h-full shadow-lg rounded-md px-4 py-1 ${tarefas == '' ? 'hidden' : ''}`}>
                {tarefas.filter(tarefa => tarefa.finalizada == false).map(tarefa => (
                  <div className="flex justify-between transition-all duration-300 hover:shadow-lg items-center p-4 bg-zinc-200 rounded-md shadow-sm my-5" key={tarefa.id}>
                    {alterarTarefaId === tarefa.id ? (
                      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between w-full">
                        <input
                          type="text"
                          value={tarefaAlterada}
                          onChange={e => setTarefaAlterada(e.target.value)}
                          required
                          className="bg-white transition-all duration-300 hover:shadow-lg rounded-md p-2 focus:outline-none shadow-sm"
                        />
                        <div className="flex flex-col md:flex-row gap-2">
                          <button onClick={() => salvar(tarefa.id, tarefa.finalizada)} className="bg-green-500 relative bottom-0 hover:bottom-1 shadow-sm p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Salvar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4  w-full">
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            checked={tarefa.finalizada}
                            className="relative bottom-[0.6px] cursor-pointer"
                            onChange={() => finalizada(tarefa.id, tarefa.nome)} />

                          <p>{tarefa.nome}</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                          <button onClick={() => alterar(tarefa.id, tarefa.nome)} className="bg-blue-500 relative bottom-0 hover:bottom-1 shadow-sm p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Alterar</button>
                          <button onClick={() => deletar(tarefa.id)} className="bg-red-500 relative bottom-0 hover:bottom-1 shadow-sm p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Deletar</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full  flex-col gap-2">
              <h1 className={`font-bold text-lg text-center ${tarefas == '' ? 'hidden' : ''}`}>Tarefas finalizadas</h1>
              <div className={`bg-green-500 h-full shadow-lg rounded-md px-4 py-1 ${tarefas == '' ? 'hidden' : ''}`}>
                {tarefas.filter(tarefa => tarefa.finalizada == true).map(tarefa => (
                  <div className="flex flex-col justify-between transition-all duration-300 hover:shadow-lg items-center p-4 bg-zinc-200 rounded-md shadow-sm my-5" key={tarefa.id}>
                    {alterarTarefaId === tarefa.id ? (
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                        <input
                          type="text"
                          value={tarefaAlterada}
                          onChange={e => setTarefaAlterada(e.target.value)}
                          required
                          className="bg-white transition-all duration-300 hover:shadow-lg rounded-md p-2 focus:outline-none shadow-sm"
                        />
                        <div className="flex flex-col md:flex-row gap-2">
                          <button onClick={() => salvar(tarefa.id, tarefa.finalizada)} className="bg-green-500 relative bottom-0 hover:bottom-1 shadow-sm p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Salvar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            checked={tarefa.finalizada}
                            className="relative bottom-[0.6px] cursor-pointer"
                            onChange={() => finalizada(tarefa.id, tarefa.nome)} />

                          <p>{tarefa.nome}</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                          <button onClick={() => alterar(tarefa.id, tarefa.nome)} className="bg-blue-500 relative bottom-0 hover:bottom-1 shadow-sm p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Alterar</button>
                          <button onClick={() => deletar(tarefa.id)} className="bg-red-500 relative bottom-0 hover:bottom-1 shadow-sm p-2 text-white rounded-md cursor-pointer transition-all duration-300 hover:opacity-80">Deletar</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
}
