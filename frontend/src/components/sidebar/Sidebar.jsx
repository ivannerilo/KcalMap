// src/components/Sidebar/Sidebar.js

import styles from './Sidebar.module.css';

// Ícones SVG simples para dar um toque visual.
// Em um projeto real, você usaria uma biblioteca como react-icons.
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const FoodIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18M12 2a9 9 0 0 0 0 18c5 0 9-4 9-9s-4-9-9-9z"></path><path d="M22 12c-3-4-6-4-9-4s-6 0-9 4"></path></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>;
const FriendsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;


export default function Sidebar() {
    // No futuro, você pode usar o `NavLink` do react-router-dom
    // e a propriedade `isActive` para definir qual item está ativo.
    const activeItem = 'dashboard'; // Exemplo estático

    return (
        <nav className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>KcalMap</h2>
            </div>
            <ul className={styles.navList}>
                <li className={`${styles.navItem} ${activeItem === 'profile' ? styles.active : ''}`}>
                    <UserIcon />
                    <span>Perfil</span>
                </li>
                <li className={styles.navItem}>
                    <FoodIcon />
                    <span>Adicionar Comida</span>
                </li>
                <li className={styles.navItem}>
                    <ChartIcon />
                    <span>Gráficos</span>
                </li>
                <li className={styles.navItem}>
                    <FriendsIcon />
                    <span>Amigos</span>
                </li>
            </ul>
        </nav>
    );
}
