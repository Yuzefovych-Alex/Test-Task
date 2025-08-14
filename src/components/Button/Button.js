
import styles from "./Button.module.css";

function Button({ isActive, onClick }) {
    return (
        <div className={styles.Button}>
            <div className={styles.container}>
                <button
                    className={isActive ? styles.buttonActive : styles.button}
                    onClick={isActive ? onClick : null}
                    disabled={!isActive}
                >
                    Claim
                </button>
            </div>
        </div>
    );
}

export default Button;
