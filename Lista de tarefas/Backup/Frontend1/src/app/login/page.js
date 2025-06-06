'use client';

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import { Input } from '@/components/input';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const logar = async (e) => {
        e.preventDefault()

        try {
           const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })

        if (!res.ok) {
            const errorData = await res.json();
            alert(errorData.mensagem || 'Erro ao fazer login');
            return;
        }

           const data = await res.json();
           
           localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
           window.location.href = '/'
           

    } catch (e) {
            console.error('Erro ao fazer login:', e);
            alert('Erro no servidor. Tente novamente mais tarde.');
        }

    }


    return (
        <section className="min-h-screen w-full flex justify-center items-center bg-white md:bg-zinc-200">
            <div className="rounded-3xl p-7 py-10 bg-white md:shadow-sm font-semibold transition-all duration-300 hover:shadow-2xl overflow-hidden w-[350px]">
                <form>
                    <article className="flex flex-col gap-5">
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Faça login</h1>
                        </div>

                        <Input
                            id="email"
                            label="Email"
                            placeholder="email@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<EnvelopeIcon className="w-6 h-6" />}
                            required
                            autoComplete="email"
                        />

                        <Input
                            id="senha"
                            label="Senha"
                            placeholder="Sua senha..."
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            icon={<LockClosedIcon className="w-6 h-6" />}
                            required
                            autoComplete="current-password"
                        />

                        <div className="flex flex-row gap-7 justify-center mt-2">
                            <button onClick={logar} className="px-4 py-2 border-2 border-zinc-200 w-full rounded-lg bg-blue-500 cursor-pointer text-white hover:bg-blue-600 transition">Entrar</button>
                        </div>

                        <div className="flex gap-1 justify-center mt-4 text-sm">
                            <span>Não tem uma conta?</span>
                            <Link href="/cadastro" className="relative text-blue-600 after:transition-all after:duration-100 hover:after:w-full after:w-0 after:h-[1px] after:bg-blue-600 after:absolute after:left-0 after:bottom-0 ">Criar conta</Link>
                        </div>
                    </article>
                </form>
            </div>
        </section>
    )
}