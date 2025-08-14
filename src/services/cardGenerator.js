export const generateCards = ({ five = 5, cash = 1, bomb = 1, xtwo = 1, zero = 1 }) => {
    const fiveValues = [100, 500, 1000, 10000];

    const fiveCards = Array(five)
        .fill(null)
        .map(() => ({
            type: "five",
            value: fiveValues[Math.floor(Math.random() * fiveValues.length)],
        }));

    const allCards = [
        ...fiveCards,
        ...Array(cash).fill({ type: "cash" }),
        ...Array(bomb).fill({ type: "bomb" }),
        ...Array(xtwo).fill({ type: "xtwo" }),
        ...Array(zero).fill({ type: "zero" }),
    ];

    return allCards.sort(() => Math.random() - 0.5);
};
