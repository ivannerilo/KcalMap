import Container from "components/basicContainer/Container";
import styles from "./ProfilePicture.module.css";
import { FiUser } from "react-icons/fi";
import { useUser } from "contexts/UserContext";
import { useEffect, useInsertionEffect, useState } from "react";

export default function ProfilePicture ({ profile }) {
    const {updateProfilePicture} = useUser();
    const [imgSrc, setImgSrc] = useState(null)

    async function handleSubmitImage(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('foto_perfil', formData);
        const response = await updateProfilePicture(formData);
        console.log("Rexposta", response);
    }

    function handleEdit(e) {
        const form = Object.assign(document.createElement('input'), {
            type: 'file'
        })
        form.addEventListener('change', handleSubmitImage)
        form.addEventListener('cancel', () => {
            form.removeEventListener('change', handleSubmitImage)
        })
        form.click();
    }

    useEffect(() => {
        setImgSrc(profile?.profile?.profile_picture)
    }, [profile])

    return (
        <main 
            className={styles.container}
        >
            <Container 
                className={styles.frame}
                onClick={handleEdit}
            >
                {!imgSrc && <FiUser
                    className={styles.icon} 
                />}
                {imgSrc && <img 
                    className={styles.image} 
                    src={imgSrc} 
                />}
            </Container>
        </main>
    )
}