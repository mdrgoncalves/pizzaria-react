import { useState, ChangeEvent } from 'react';

import Head from 'next/head';
import styles from './styles.module.scss';
import Header from 'components/Header';

import { canSSRAuth } from 'utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

export default function Product() {

    const [avatarUrl, setavatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setavatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <>
        <Head>
            <title>ShelterPizza - Novo Produto</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>Novo Produto</h1>
                <form className={styles.form}>
                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload
                                size={30}
                                color="#fff"
                            />
                        </span>
                        <input 
                            type="file" 
                            accept="image/jpeg, image/png"
                            onChange={handleFile}
                        />
                        {avatarUrl &&
                            <Image 
                                className={styles.preview}
                                src={avatarUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250} 
                            />
                        }
                    </label>
                    <select>
                        <option>
                            Bebida
                        </option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Nome do produto"
                        className={styles.input}
                    />
                    <input 
                        type="text" 
                        placeholder="Preço do produto"
                        className={styles.input}
                    />
                    <textarea 
                        placeholder="Descrição do produto"
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        className={styles.buttonAdd}
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(
    async (ctx) => {
        return {
            props: {}
        }
    }
);