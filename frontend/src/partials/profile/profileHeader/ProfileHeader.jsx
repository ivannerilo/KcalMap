import { useUser } from "contexts/UserContext"
import styles from "./ProfileHeader.module.css"

export default function ProfileHeader(){
    const { profile } = useUser();
    console.log(profile)

    return (
        <header className={styles.header}>
                <h2 className={styles.title}>Hello, Ivan!</h2>
        </header>
    )
}