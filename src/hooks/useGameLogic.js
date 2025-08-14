import image_five from "../assets/images/five.png";

export function useGameLogic(state) {
    const {
        setScope, setXtwo, setOverlayCard, setXtwoState,
        setFiveNumber, setXtwoNumber, setZeroNumber,
        setBombNumber, setCashNumber, xtwo
    } = state;

    const animateCoin = (startPosition, endRect, imgSrc) => {
        return new Promise((resolve) => {
            const coin = document.createElement("img");
            coin.src = imgSrc;
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

    const handleMultipleCoinsOverlap = async (startPosition, clickedCard, ref, count = 5, delay = 400) => {
        if (!ref.current) return;

        if (clickedCard.type === "five") {
            const promises = [];

            for (let i = 0; i < count; i++) {
                const p = new Promise((resolve) => {
                    setTimeout(async () => {
                        await animateCoin(startPosition, ref.current.getBoundingClientRect(), image_five);
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

    const workCards = (card) => {
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
                setScope(prev => prev + card.value * (xtwo === 1 ? 2 : 1));
                setFiveNumber(prev => prev - 1);
                setXtwo(0);
                break;
            default:
                break;
        }
    };

    const handleCardReveal = (card) => {
        workCards(card);
    };

    return {
        handleCardReveal,
        handleMultipleCoinsOverlap
    };
}
