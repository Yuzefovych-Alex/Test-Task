import { useGameState } from "../hooks/useGameState";
import { useGameLogic } from "../hooks/useGameLogic";

import Tapbar from "../components/Tapbar/Tapbar";
import Tips from "../components/Tips/Tips";
import Title from "../components/Title/Title";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import Navbar from "../components/Navbar/Navbar";
import RewardCounter from "../components/Reward-counter/Reward-counter";
import Overlay from "../components/Overlay /Overlay";

function Game() {
    const state = useGameState();
    const { handleCardReveal, handleMultipleCoinsOverlap } = useGameLogic(state);

    const {
        scope,
        xtwoState,
        balanceRef,
        resetTrigger,
        gameStarted,
        setGameStarted,
        resetGame,
        overlayCard,
        setOverlayCard,
        fiveNumber,
        xtwoNumber,
        zeroNumber,
        bombNumber,
        cashNumber
    } = state;

    return (
        <>
            <Navbar />
            <Title />
            <RewardCounter ref={balanceRef} scope={scope} xtwoState={xtwoState} />
            <Grid
                onCardReveal={(card) => {
                    if (!gameStarted) {
                        setGameStarted(true);
                    }
                    handleCardReveal(card);
                }}
                resetTrigger={resetTrigger}
                onCoinCreate={(startPosition, card) =>
                    handleMultipleCoinsOverlap(startPosition, card, balanceRef)
                }
            />
            <Tips
                five={fiveNumber}
                xtwo={xtwoNumber}
                zero={zeroNumber}
                bomb={bombNumber}
                cash={cashNumber}
            />
            <Button
                isActive={gameStarted}
                onClick={gameStarted ? () => resetGame(false) : null}
            />
            <Tapbar />
            {overlayCard && (
                <Overlay
                    card={overlayCard}
                    scope={scope}
                    onClose={() => setOverlayCard(null)}
                    resetGame={() => resetGame(true)}
                />
            )}
        </>
    );
}

export default Game;
