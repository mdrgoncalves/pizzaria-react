import { FormEvent, useState } from 'react';

import Head from "next/head"
import Image from "next/image"
import styles from "/styles/home.module.scss";

import logoImg from "assets/logo.svg";

import { Input } from "components/ui/Input";
import Button from "components/ui/Button";

import Link from "next/link";

import { useAuth } from "contexts/AuthContext";
import { toast } from 'react-toastify';

import { canSSRGuest } from 'utils/canSSRGuest';

export default function Home() {

    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (email === '' || password === '') {
            toast.error('Preencha todos os campos!')
            return;
        }

        setLoading(true);

        let data = {
            email,
            password
        }

        await signIn(data);

        setLoading(false);
    }

    return (
        <>
        <Head>
            <title>ShelterPizza - Login</title>
        </Head>
        <div>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Shelter Pizza" />

                <div className={styles.login}>
                    <form onSubmit={handleLogin}>
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
                            Acessar
                        </Button>
                    </form>

                    <Link 
                        href="/signup"
                        className={styles.text}
                    >
                        Não possui uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest(

    async(context) => {
        return {
            props: {}
        }
    }
)
