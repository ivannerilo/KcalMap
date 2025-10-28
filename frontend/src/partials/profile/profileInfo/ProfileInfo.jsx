import Container from "components/basicContainer/Container";
import styles from "./ProfileInfo.module.css";
import Input from "components/input/Input";
import { useUser } from "contexts/UserContext";
import { useState, useEffect } from "react";
import Button from "components/button/Button";
import {usePopup} from "../../../contexts/PopupContext";

export default function ProfileInfo({ profile }) {
    const { updateProfile } = useUser();
    const { openPopup } = usePopup();
    const [formValues, setFormValues] = useState();

    async function handleSave() {
        const response = await updateProfile(formValues);
        if (!response.ok) {
            openPopup(response.message, "error");
        } else {
            openPopup("Profile updated successfully!", "success");
        }
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