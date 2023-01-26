import { useState } from "react";

import { canSSRAuth } from "utils/canSSRAuth"
import Head from "next/head"
import styles from "./styles.module.scss";

import Header from "components/Header";
import { FiRefreshCcw } from "react-icons/fi";

import { setupAPIClient } from "services/api";

import Modal from "react-modal";
import ModalOrder from "components/ModalOrder";

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    quantity: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [ordersList, setOrdersList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModalView() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/orders/detail`, {
            params: {
                order_id: id
            }
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string) {
        
        const apiClient = setupAPIClient();
        await apiClient.put(`/orders/finish`, {
            order_id: id
        });

        const response = await apiClient.get(`/orders`);
        setOrdersList(response.data);

        setModalVisible(false);
    }

    Modal.setAppElement('#__next');

    async function handleRefreshOrders() {

        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/orders`);
        setOrdersList(response.data);
    }

    return (
        <>
        <Head>
            <title>ShelterPizza - Painel</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button
                        onClick={handleRefreshOrders}
                    >
                        <FiRefreshCcw 
                            size={25}
                            color="3fffa3"
                        />
                    </button>
                </div>
                <article className={styles.listOrder}>
                    {ordersList.length === 0 &&
                        <span className={styles.emptyList}>
                            Nenhum pedido aberto foi encontrado...
                        </span>
                    }
                    {ordersList.map(order => (
                        <section 
                            className={styles.orderItem}
                            key={order.id}
                        >
                            <button onClick={() => handleOpenModalView(order.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {order.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>
            {modalVisible &&
                <ModalOrder 
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalView}
                    order={modalItem}
                    onFinish={handleFinishItem}
                />
            }
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(
    
    async (context) => {

        const apiClient = setupAPIClient(context);
        const response = await apiClient.get('/orders');

        return {
            props: {
                orders: response.data
            }
        }
    }
);