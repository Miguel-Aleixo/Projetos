'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { IMaskInput } from 'react-imask';
import { Input } from '@/components/input';

export default function Cadastro() {
    const [passo, setPasso] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');

    const irParaProximo = (e) => {
        e.preventDefault();

        if (!nome || !email || !telefone) {
            alert("Preencha todos os campos corretamente antes de continuar.");
            return;
        }

        if (email.includes('@') && email.includes('.com')) {
        } else {
            alert('Preencha corretamente o email.')
            return;
        }

        if (telefone.length < 15) {
            alert('Preencha corretamente o telefone.')
            return;
        }

        setPasso(1);

    }

    const voltar = (e) => {
        e.preventDefault();
        setPasso(0);
    }

    const cadastro = async (e) => {

        if (senha.length < 8) {
            alert("A senha precisa de no minimo 8 carecteres.")
            e.preventDefault()
            return;
        }

        const dadosCadastrados = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            endereco: endereco,
            tarefas: []
        }

        try {
                await fetch('http://localhost:3000/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosCadastrados)
            })
        } catch (e) {
            console.error("Erro ao cadastrar usuário:", e);
            alert("Erro ao tentar cadastrar.");
        }
    }

    return (
        <section className="min-h-screen w-full flex justify-center items-center md:bg-zinc-200 bg-white">

            <div className="rounded-3xl p-7 py-10 bg-white md:shadow-sm font-semibold transition-all duration-300 hover:shadow-2xl overflow-hidden w-[350px]">
                <form className="relative w-[700px] flex transition-transform duration-500" style={{ transform: `translateX(-${passo * 50}%)` }}>
                    <article className="w-1/2 flex flex-col gap-5 mr-27">

                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Criar sua conta agora</h1>
                        </div>

                        <Input
                            id="nome"
                            label="Nome"
                            placeholder="Seu nome..."
                            icon={<UserIcon className="w-6 h-6" />}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            autoComplete="name"
                        />

                        <Input
                            id="email"
                            label="Email"
                            placeholder="email@email.com"
                            icon={<EnvelopeIcon className="w-6 h-6" />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />

                        <div className="flex flex-col">
                            <label htmlFor="telefone" className="mb-1">Telefone</label>
                            <div className="flex items-center group bg-zinc-100 rounded-lg px-3 transition-all duration-300 hover:shadow-xl">
                                <PhoneIcon className="w-6 h-6 transition-all duration-300 group-hover:text-blue-500"></PhoneIcon>
                                <IMaskInput
                                    id="telefone"
                                    value={telefone}
                                    mask="(00) 00000-0000"
                                    onAccept={(e) => setTelefone(e)}
                                    type="text"
                                    required
                                    placeholder="(11) 11111-1111"
                                    className="bg-zinc-100 rounded-sm py-4 px-4 w-full outline-none"
                                    autoComplete="tel"
                                    overwrite
                                />
                            </div>
                        </div>

                        <div className="flex flex-row gap-7 justify-center mt-2">
                            <button disabled className="px-4 py-2 border-2 border-zinc-200 rounded-lg bg-zinc-300 cursor-not-allowed">Voltar</button>
                            <button className="px-4 py-2 border-2 border-zinc-200  rounded-lg bg-blue-500 cursor-pointer text-white hover:bg-blue-600 transition" onClick={irParaProximo}>Próximo</button>
                        </div>

                        <div className="flex gap-1 justify-center mt-4 text-sm">
                            <span>Já tem uma conta?</span>
                            <Link href="/login" className="relative text-blue-600 after:transition-all after:duration-100 hover:after:w-full after:w-0 after:h-[1px] after:bg-blue-600 after:absolute after:left-0 after:bottom-0 ">Entrar</Link>
                        </div>

                    </article>

                    <article className="w-1/2 flex flex-col gap-5 relative right-13.5">

                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Criar sua conta agora</h1>
                        </div>

                        <div className="flex flex-col">

                            <div className="flex gap-1">
                                <label htmlFor="endereco" className="mb-1">Endereço</label>
                                <MapPinIcon className="w-6 h-6 "></MapPinIcon>
                            </div>

                            <div className="flex items-center group bg-zinc-100 rounded-lg px-3 transition-all duration-300 hover:shadow-xl mb-5">
                                <textarea
                                    id="endereco"
                                    type="text"
                                    required
                                    placeholder="Rua exemplo, Bairro exemplo, Número 999"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    autoComplete="endereco"
                                    className="bg-zinc-100 rounded-sm h-[160px] py-2 w-full outline-none"
                                />
                            </div>

                            <Input
                                id="senha"
                                label="Senha"
                                placeholder="Sua senha..."
                                type="password"
                                icon={<LockClosedIcon className="w-6 h-6" />}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                autoComplete="current-password"
                            />

                        </div>


                        <div className="flex flex-row gap-7 justify-center mt-2">
                            <button className="px-4 py-2 rounded-lg border-2 border-zinc-100 bg-zinc-200 cursor-pointer hover:bg-zinc-300 transition" onClick={voltar}>Voltar</button>
                            <button onClick={cadastro} type='submit' className="px-4 py-2 rounded-lg border-2 border-zinc-300 bg-green-500 cursor-pointer text-white hover:bg-green-600 transition">Criar conta</button>
                        </div>

                        <div className="flex gap-1 justify-center mt-4 text-sm">
                            <span>Já tem uma conta?</span>
                            <Link href="/login" className="relative text-blue-600 after:transition-all after:duration-100 hover:after:w-full after:w-0 after:h-[1px] after:bg-blue-600 after:absolute after:left-0 after:bottom-0 ">Entrar</Link>
                        </div>


                    </article>
                </form>
            </div>
        </section>
    )
}