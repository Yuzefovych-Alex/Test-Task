import React, { useState, useEffect } from "react";
import styles from "./Grid.module.css";

import image_light from "../../assets/images/light.png";
import image_cash from "../../assets/images/cash.png";
import image_bomb from "../../assets/images/bomb.png";
import image_five from "../../assets/images/five.png";
import image_fon_xtwo from "../../assets/images/x20-fon.png";

import { generateCards } from "../../services/cardGenerator";
import {
    FIVE_COUNT, CASH_COUNT, BOMB_COUNT, XTWO_COUNT, ZERO_COUNT
} from "../../constans/gameConstans";

function Grid({ onCardReveal, resetTrigger, onCoinCreate }) {
    const [cards, setCards] = useState([]);
    const [revealed, setRevealed] = useState(Array(9).fill(false));

    useEffect(() => {
        const generated = generateCards({
            five: FIVE_COUNT,
            cash: CASH_COUNT,
            bomb: BOMB_COUNT,
            xtwo: XTWO_COUNT,
            zero: ZERO_COUNT,
        });

        setCards(generated);
        setRevealed(Array(9).fill(false));
    }, [resetTrigger]);

    const handleClick = (index) => {
        if (revealed[index]) return;

        const clickedCard = cards[index];

        setRevealed((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });

        onCardReveal?.(clickedCard, index);

        if (onCoinCreate) {
            const cardElement = document.querySelectorAll(`.${styles.item}`)[index];
            const rect = cardElement.getBoundingClientRect();

            onCoinCreate(
                {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                },
                clickedCard
            );
        }
    };

    const formatNumber = (num) => {
        return num >= 1000 ? `${num / 1000}K` : num;
    };

    return (
        <div className={styles.Carts}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {cards.map((card, index) => {
                        const isRevealed = revealed[index];

                        return (
                            <li
                                key={index}
                                className={`${styles.item} ${isRevealed ? styles[card.type] : ""}`}
                                onClick={() => handleClick(index)}
                            >
                                <div className={`${styles.flipCardInner} ${isRevealed ? styles.flipped : ""}`}>
                                    <div className={styles.cardFront}>
                                        <div className={styles.cover}>$</div>
                                    </div>

                                    <div className={`${styles.cardBack} ${styles.itemData}`}>
                                        {isRevealed && (
                                            <>
                                                <div
                                                    className={`
                                                        ${styles.imageLight}
                                                        ${card.type === "five" ? styles.imageLightFive : ""}
                                                        ${card.type === "cash" ? styles.imageLightCash : ""}
                                                        ${card.type === "bomb" ? styles.imageLightBomb : ""}
                                                        ${card.type === "xtwo" ? styles.imageLightXtwo : ""}
                                                        ${card.type === "zero" ? styles.imageLightZero : ""}
                                                      `}
                                                    style={{ backgroundImage: `url(${image_light})` }}
                                                ></div>

                                                {card.type === "xtwo" && (
                                                    <div
                                                        className={styles.imageLightXtwoOverlay}
                                                        style={{ backgroundImage: `url(${image_fon_xtwo})` }}
                                                    ></div>
                                                )}
                                            </>
                                        )}

                                        {card.type === "five" && (
                                            <>
                                                <img
                                                    className={styles.iconFive}
                                                    src={image_five}
                                                    alt="five"
                                                />
                                                <h1 className={styles.number}>
                                                    {formatNumber(card.value)}
                                                </h1>
                                            </>
                                        )}
                                        {card.type === "bomb" && (
                                            <img
                                                className={styles.iconBomb}
                                                src={image_bomb}
                                                alt="bomb"
                                            />
                                        )}
                                        {card.type === "cash" && (
                                            <img
                                                className={styles.iconCash}
                                                src={image_cash}
                                                alt="cash"
                                            />
                                        )}
                                        {card.type === "xtwo" && (
                                            <h1 className={styles.numberXtwo}>x2</h1>
                                        )}
                                        {card.type === "zero" && (
                                            <h1 className={styles.numberZero}>0</h1>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Grid;
