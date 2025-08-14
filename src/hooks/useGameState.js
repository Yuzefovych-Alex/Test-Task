import { useState, useRef } from "react";

export function useGameState() {
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

    const resetGame = (fullReset = false) => {
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
        if (fullReset) {
            setScope(0);
        }
    };

    return {
        scope, setScope,
        xtwo, setXtwo,
        overlayCard, setOverlayCard,
        fiveNumber, setFiveNumber,
        xtwoNumber, setXtwoNumber,
        zeroNumber, setZeroNumber,
        bombNumber, setBombNumber,
        cashNumber, setCashNumber,
        gameStarted, setGameStarted,
        resetTrigger,
        xtwoState, setXtwoState,
        balanceRef,
        resetGame
    };
}

export default useGameState;