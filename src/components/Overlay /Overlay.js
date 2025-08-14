import styles from './Overlay.module.css';
import Navbar from "../Navbar/Navbar";
import OverlayBomb from "../OverlayBomb/OverlayBomb";
import OverlayCash from "../OverlayCash/OverlayCash";

function Overlay({ card, scope, onClose, resetGame }) {
    let content = null;

    if (card.type === "cash") {
        content = <OverlayCash scope={scope} onClose={onClose} resetGame={resetGame} />;
    } else if (card.type === "bomb") {
        content = <OverlayBomb scope={scope} onClose={onClose} resetGame={resetGame} />;
    }

    return (
        <div className={styles.overlay}>
            <Navbar />
            {content}
        </div>
    );
}

export default Overlay;