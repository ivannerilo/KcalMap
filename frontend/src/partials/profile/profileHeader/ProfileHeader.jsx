import { useUser } from "contexts/UserContext"
import styles from "./ProfileHeader.module.css"

export default function ProfileHeader({ profile }) {
    const captalizedName = profile?.user?.username?.charAt(0).toUpper() + profile?.profile?.name.slice(1);

    return (
        <header className={styles.header}>
                <h2 className={styles.title}>Hello, {captalizedName}!</h2>
        </header>
    )
}