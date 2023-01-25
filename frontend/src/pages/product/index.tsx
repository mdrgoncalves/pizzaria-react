import { useState, ChangeEvent, FormEvent } from 'react';

import Head from 'next/head';
import styles from './styles.module.scss';
import Header from 'components/Header';

import { canSSRAuth } from 'utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

import { setupAPIClient } from 'services/api';

import { toast } from 'react-toastify';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoriesList: ItemProps[];
}

export default function Product({ categoriesList }: CategoryProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setavatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoriesList || []);
    const [categorySelected, setCategorySelected] = useState('');

    function handleFile(event: ChangeEvent<HTMLInputElement>) {

        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setavatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    async function handleRegister(event: FormEvent) {

        event.preventDefault();

        try {
            const data = new FormData();

            if(name === '' || price === '0' || description === '' || imageAvatar === null) {
                toast.error('Preencha todos os campos!');
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();
            await apiClient.post('/products', data);

            toast.success('Produto cadastrado com sucesso!');

            setName('');
            setPrice('');
            setDescription('');
            setImageAvatar(null);
            setavatarUrl('');

        } catch(err) {
            console.log(err);
            toast.error('Ops! Erro ao cadastrar produto!');
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
                <form className={styles.form} onSubmit={handleRegister}>
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
                    <select 
                        value={categorySelected}
                        onChange={(event) => setCategorySelected(event.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={category.id} value={index}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        placeholder="Nome do produto"
                        className={styles.input}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Preço do produto"
                        className={styles.input}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do produto"
                        className={styles.input}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
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

    async (context) => {

        const apiClient = setupAPIClient(context);
        const response = await apiClient.get('/categories');

        return {
            props: {
                categoriesList: response.data
            }
        }
    }
);