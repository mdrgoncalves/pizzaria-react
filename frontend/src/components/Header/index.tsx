import styles from './styles.module.scss';
import Link from 'next/link';

import Image from 'next/image';
import logoImg from "assets/logo.svg";
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from 'contexts/AuthContext';

const Header: React.FC = () => {

    const { signOut } = useAuth();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image 
                        src={logoImg}
                        alt="ShelterPizza"
                        width={190} 
                        height={60} 
                    />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category">Categoria</Link>
                    <Link href="/product">Cardápio</Link>
                    <button onClick={signOut}>
                        <FiLogOut
                            color="#FFF"
                            size={24}
                        />
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header;