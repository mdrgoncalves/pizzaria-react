import { useState, FormEvent } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "/styles/home.module.scss";

import logoImg from "assets/logo.svg";

import { Input } from "components/ui/Input";
import Button from "components/ui/Button";

import Link from "next/link";

import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {

    const { signUp } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.error('Preencha todos os campos!')
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
        <Head>
            <title>ShelterPizza - Cadastro</title>
        </Head>
        <div>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Shelter Pizza" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>

                    <form onSubmit={handleSignUp}>
                        <Input 
                            placeholder="Digite seu nome"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <Input 
                            placeholder="Digite seu email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button 
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link 
                        href="/"
                        className={styles.text}
                    >
                        J?? possui uma conta? Fa??a login!
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}
