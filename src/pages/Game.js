import Tapbar from "../components/Tapbar/Tapbar";
import Tips from "../components/Tips/Tips";
import Title from "../components/Title/Title";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import Navbar from "../components/Navbar/Navbar";
import RewardCounter from "../components/Reward-counter/Reward-counter";
import Overlay from "../components/Overlay /Overlay";
import image_five from "../assets/images/five.png";

import { useState, useRef } from "react";

function Game() {
    const [scope, setScope] = useState(0);
    const [xtwo, setXtwo] = useState(0);
    const [overlayCard, setOverlayCard] = useState(null);
    const [fiveNumber, setFiveNumber] = useState(5);
    const [xtwoNumber, setXtwoNumber] = useState(1);
    const [zeroNumber, setZeroNumber] = useState(1);
    const [bombNumber, setBombNumber] = useState(1);
    const [cashNumber, setCashNumber] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [xtwoState, setXtwoState] = useState(false);
    const balanceRef = useRef(null);

    const resetGameAllClean = () => {
        setScope(0);
        setOverlayCard(null);
        setFiveNumber(5);
        setXtwoNumber(1);
        setZeroNumber(1);
        setBombNumber(1);
        setCashNumber(1);
        setGameStarted(false);
        setResetTrigger(prev => prev + 1);
        setXtwoState(false);
        setXtwo(0);
    };

    const resetGame = () => {
        setOverlayCard(null);
        setFiveNumber(5);
        setXtwoNumber(1);
        setZeroNumber(1);
        setBombNumber(1);
        setCashNumber(1);
        setGameStarted(false);
        setResetTrigger(prev => prev + 1);
        setXtwoState(false);
        setXtwo(0);
    };

    const animateCoin = (startPosition, endRect, imgSrc) => {
        return new Promise((resolve) => {
            const coin = document.createElement("img");
            coin.src = imgSrc;
            coin.alt = "coin";
            coin.style.position = "fixed";
            coin.style.left = `${startPosition.x}px`;
            coin.style.top = `${startPosition.y}px`;
            coin.style.width = "32px";
            coin.style.height = "32px";
            coin.style.pointerEvents = "none";
            coin.style.transition = "all 0.8s ease-in-out";
            coin.style.zIndex = 9999;
            coin.style.transformOrigin = "center";
            coin.style.opacity = "1";

            document.body.appendChild(coin);

            requestAnimationFrame(() => {
                coin.style.left = `${endRect.left + endRect.width / 2 - 16}px`;
                coin.style.top = `${endRect.top + endRect.height / 2 - 16}px`;
                coin.style.transform = "scale(0.3)";
                coin.style.opacity = "0";
            });

            setTimeout(() => {
                coin.remove();
                resolve();
            }, 600);
        });
    };

    const createExplosion = (x, y) => {
        const explosion = document.createElement("div");
        explosion.style.position = "absolute";
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        explosion.style.pointerEvents = "none";
        explosion.style.zIndex = 9999;

        const colors = ["#ff0", "#f00", "#f80", "#0f0", "#0ff", "#f0f", "#fff"];

        for (let i = 0; i < 60; i++) {
            const particle = document.createElement("div");
            const size = Math.random() * 8 + 4;
            const angle = Math.random() * 2 * Math.PI;
            const radius = 50 + Math.random() * 100;
            const xOffset = Math.cos(angle) * radius;
            const yOffset = Math.sin(angle) * radius;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const delay = Math.random() * 0.3;

            particle.style.position = "absolute";
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.borderRadius = "50%";
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.opacity = "1";
            particle.style.transform = "translate(0, 0)";
            particle.style.transition = `all 1s ease-out ${delay}s`;

            explosion.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(0.5) rotate(720deg)`;
                particle.style.opacity = "0";
                particle.style.filter = "blur(4px)";
            });
        }

        document.body.appendChild(explosion);

        setTimeout(() => {
            explosion.remove();
        }, 1500);
    };

    const handleMultipleCoinsOverlap = async (startPosition, clickedCard, count = 5, delay = 400) => {
        if (!balanceRef.current) return;

        if (clickedCard.type === "five") {
            const promises = [];

            for (let i = 0; i < count; i++) {
                const shiftedStart = {
                    x: startPosition.x,
                    y: startPosition.y,
                };

                const p = new Promise((resolve) => {
                    setTimeout(async () => {
                        await animateCoin(shiftedStart, balanceRef.current.getBoundingClientRect(), image_five);
                        resolve();
                    }, i * delay);
                });
                promises.push(p);
            }

            await Promise.all(promises);
        } else if (clickedCard.type === "bomb") {
            createExplosion(startPosition.x, startPosition.y);
        }
    };

    const WorkCards = (card) => {
        switch (card.type) {
            case "cash":
                setOverlayCard(card);
                setCashNumber(prev => prev - 1);
                break;
            case "bomb":
                setOverlayCard(card);
                setBombNumber(prev => prev - 1);
                break;
            case "xtwo":
                setXtwo(1);
                setScope(prev => prev * 2);
                setXtwoNumber(prev => prev - 1);
                setXtwoState(true);
                break;
            case "zero":
                setZeroNumber(0);
                break;
            case "five":
                if (xtwo === 1) {
                    setScope(prev => prev + card.value * 2);
                    setXtwo(0);
                    setFiveNumber(prev => prev - 1);
                } else {
                    setScope(prev => prev + card.value);
                    setFiveNumber(prev => prev - 1);
                }
                break;
            default:
                break;
        }
    };

    const handleCardReveal = (card, index) => {
        if (!gameStarted) {
            setGameStarted(true);
        }

        WorkCards(card);
    };

    return (
        <>
            <Navbar />
            <Title />
            <RewardCounter ref={balanceRef} scope={scope} xtwoState={xtwoState} />
            <Grid
                onCardReveal={handleCardReveal}
                resetTrigger={resetTrigger}
                onCoinCreate={handleMultipleCoinsOverlap}
            />
            <Tips five={fiveNumber} xtwo={xtwoNumber} zero={zeroNumber} bomb={bombNumber} cash={cashNumber} />
            <Button
                isActive={gameStarted}
                onClick={gameStarted ? resetGame : null}
            />
            <Tapbar />
            {overlayCard && (
                <Overlay
                    card={overlayCard}
                    scope={scope}
                    onClose={() => setOverlayCard(null)}
                    resetGame={resetGameAllClean}
                />
            )}
        </>
    );
}
export default Game;