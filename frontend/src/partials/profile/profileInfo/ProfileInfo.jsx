import Container from "components/basicContainer/Container";
import styles from "./ProfileInfo.module.css";
import Input from "components/form/input/Input";
import { useUser } from "contexts/UserContext";
import { useState, useEffect } from "react";
import Button from "components/button/Button";

export default function ProfileInfo() {
    const { getProfile, updateProfile } = useUser();
    const [profile, setProfile] = useState();
    const [formValues, setFormValues] = useState();

    async function handleSave() {
        const response = await updateProfile(formValues);
        console.log("responseShit", response);
    }

    function handleChange(e) {
        const element = e.target;
        const key = element.name;
        const value = element.value;
        setFormValues((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    useEffect(() => {
        async function load() {
            const response = await getProfile();
            setProfile(response)
        }
        load();
    }, [])

    return (
        <>
            <Input
                name={'username'}
                className={styles.input}
                label={"Username"} 
                defaultValue={profile?.user?.username}
                onChange={handleChange}
            />
            <Input
                name={'email'}
                className={styles.input}
                label={"Email"} 
                defaultValue={profile?.user?.email}
                onChange={handleChange}
            />
            <Input
                name={'calories_goal'}
                className={styles.input}
                label={"Calories Goal"} 
                defaultValue={profile?.profile?.calories_goal}
                onChange={handleChange}
            />
            <Input
                name={'cm_height'}
                className={styles.input}
                label={"Height"} 
                defaultValue={profile?.profile?.cm_height}
                onChange={handleChange}
            />
            <Input
                name={'kg_weight'}
                className={styles.input}
                label={"Weight"} 
                defaultValue={profile?.profile?.kg_weight}
                onChange={handleChange}
            />
            <Input
                name={'age'}
                className={styles.input}
                label={"Age"} 
                defaultValue={profile?.profile?.age}
                onChange={handleChange}
            />
            <div className={styles.buttonsDiv}>
                <Button
                    className={styles.button}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </>
    )
}