import Head from "next/head"
import Image from "next/image"
import styles from "/styles/home.module.scss";

import logoImg from "assets/logo.svg";

import { Input } from "components/ui/Input";
import Button from "components/ui/Button";

import Link from "next/link";

export default function Home() {
    return (
        <>
        <Head>
            <title>ShelterPizza - Login</title>
        </Head>
        <div>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Shelter Pizza" />

                <div className={styles.login}>
                    <form>
                        <Input 
                            placeholder="Digite seu email"
                            type="email"
                        />
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                        />
                        <Button 
                            type="submit"
                            loading={false}
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
