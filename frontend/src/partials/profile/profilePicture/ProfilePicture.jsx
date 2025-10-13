import Container from "components/basicContainer/Container";
import styles from "./ProfilePicture.module.css";
import { FiUser } from "react-icons/fi";


export default function ProfilePicture(){
    // const imgSrc = "https://media.licdn.com/dms/image/v2/D4D03AQHneARuhc5dJw/profile-displayphoto-crop_800_800/B4DZmAqu8SIYAI-/0/1758800311774?e=1761782400&v=beta&t=XhQGNak8mRjMfL1oMOHHjtvhrTes76althSCd0pwy1s"
    let imgSrc;

    function handleSubmitImage(file) {

    }

    function handleEdit(e) {
        const form = Object.assign(document.createElement('input'), {
            type: 'file'
        })
        form.addEventListener('change', handleSubmitImage)
        form.addEventListener('cancel', () => {
            form.removeEventListener('change', handleSubmitImage)
        })
    }

    return (
        <main 
            className={styles.container}
            onClick={handleEdit}
        >
            <Container className={styles.frame}>
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