import Container from "components/basicContainer/Container";
import styles from "./ProfileInfo.module.css";
import Input from "components/form/input/Input";
import { useUser } from "contexts/UserContext";
import { useState, useEffect } from "react";
import Button from "components/button/Button";

export default function ProfileInfo() {
    const { getProfile } = useUser();
    const [profile, setProfile] = useState();

    console.log("profile", profile);

    function handleSave() {
    }

    useEffect(() => {
        async function load() {
            const response = await getProfile();
            setProfile(response)
        }
        load();
    }, [])

    return (
        <Container className={styles.container}>
            <Input
                className={styles.input}
                label={"Username"} 
                defaultValue={profile?.user?.username}
            />
            <Input
                className={styles.input}
                label={"Email"} 
                defaultValue={profile?.user?.email}
            />
            <Input
                className={styles.input}
                label={"Calories Goal"} 
                defaultValue={profile?.profile?.calories_goal}
            />
            <Input
                className={styles.input}
                label={"Height"} 
                defaultValue={profile?.profile?.cm_height}
            />
            <Input
                className={styles.input}
                label={"Weight"} 
                defaultValue={profile?.profile?.kg_weight}
            />
            <Input
                className={styles.input}
                label={"Age"} 
                defaultValue={profile?.profile?.age}
            />
            <Button
                onClick={handleSave}
            >
                Save
            </Button>
        </Container>
    )
}