
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import styles from "./Card.module.css";

import image_light from "../../assets/images/light.png";
import image_cash from "../../assets/images/cash.png";
import image_bomb from "../../assets/images/bomb.png";
import image_five from "../../assets/images/five.png";

const Card = ({ card, isRevealed, onClick }) => {
    const rotateY = useMotionValue(0);
    const [showBack, setShowBack] = useState(false);

    useAnimationFrame(() => {
        const currentRotation = rotateY.get();
        if (isRevealed && currentRotation >= 90 && !showBack) {
            setShowBack(true);
        }
    });

    useEffect(() => {
        if (isRevealed) {
            rotateY.set(0);
            rotateY.set(180);
        }
    }, [isRevealed]);

    const formatNumber = (num) => {
        return num >= 1000 ? `${num / 1000}K` : num;
    };

    return (
        <motion.li
            className={styles.item}
            onClick={onClick}
            style={{
                rotateY,
                transformStyle: "preserve-3d",
                position: "relative",
            }}
            transition={{ duration: 0.6 }}
        >
            {!showBack ? (
                <div className={styles.cardFace}>
                    <div className={styles.cover}>$</div>
                </div>
            ) : (
                <div className={styles.cardBack}>
                    <div className={`${styles.itemData} ${styles[card.type]}`}>
                        {card.type === "five" && (
                            <>
                                <img className={styles.icon} src={image_five} alt="five" />
                                <h1 className={styles.number}>{formatNumber(card.value)}</h1>
                            </>
                        )}
                        {card.type === "bomb" && (
                            <img className={styles.iconBomb} src={image_bomb} alt="bomb" />
                        )}
                        {card.type === "cash" && (
                            <img className={styles.iconCash} src={image_cash} alt="cash" />
                        )}
                        {card.type === "xtwo" && (
                            <h1 className={styles.number}>X2</h1>
                        )}
                        {card.type === "zero" && (
                            <h1 className={styles.number}>0</h1>
                        )}
                    </div>

                    <div
                        className={`${styles.imageLight} ${styles.imageLightFive} ${styles.imageLightCash}`}
                        style={{ backgroundImage: `url(${image_light})` }}
                    ></div>
                </div>
            )}
        </motion.li>
    );
};

export default Card;
