import {createPortal} from "react-dom";
import Container from "components/basicContainer/Container";
import styles from "./CreateFoodsModal.module.css"
import Button from "components/button/Button";
import Input from "components/input/Input";
import {useRef, useState} from "react";
import Select from "components/select/Select";
import {useFood} from "contexts/FoodContext";

export function CreateFoodsModal({ setIsModalOpen }) {
    const { createFood } = useFood();
    const overlayRef = useRef(null);
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [unit, setUnit] = useState("");

    function handleClickOusideModal(e) {
        const target = e.target;
        if (target === overlayRef.current) {
            setIsModalOpen(false);
        }
    }

    async function handleSave() {
        try {
            const response = await createFood(name, calories, unit);
            setIsModalOpen(false);
        } catch (e) {
            console.log(e.message);
        }
    }

    return createPortal((
        <div
            className={styles.overlay}
            onClick={handleClickOusideModal}
            ref={overlayRef}
        >
            <Container
                className={styles.container}
            >
                <div className={styles.formContainer}>
                    <Input
                        className={styles.input}
                        label={"Food name"}
                        placeholder={"eg. Banana"}
                        name={'name'}
                        onChange={(e) => setName(e.target.value)}
                        type={'text'}
                    />
                    <div className={styles.formContainerInside}>
                        <Input
                            name={'calories'}
                            className={styles.input}
                            placeholder={"eg. 100"}
                            label={"Calories per unit"}
                            onChange={(e) => setCalories(e.target.value)}
                            type={'number'}
                        />
                        <Select
                            name={'unit'}
                            className={styles.selectInput}
                            label={"Select the unit"}
                            onChange={(e) => setUnit(e.target.value)}
                            type={'text'}
                            options={[
                                {
                                    children: "Select a option.",
                                    disabled: true,
                                    selected: true,
                                },
                                {
                                    children: "Grams (g)",
                                    value: "g",
                                },
                                {
                                    children: "Mililiters (ml)",
                                    value: "ml",
                                },
                                {
                                    children: "Units",
                                    value: "unit",
                                }
                            ]}
                        />
                    </div>
                </div>
                <span>a</span>
                <div className={styles.buttonsContainer}>
                    <Button
                        className={styles.button}
                        onClick={() => setIsModalOpen(false)}
                    >Fechar</Button>
                    <Button
                        className={styles.button}
                        onClick={handleSave}
                    >Salvar</Button>
                </div>
            </Container>
        </div>
    ), document.body);
}