import styles from './OverlayBomb.module.css';
import image_bomb from '../../assets/images/bomb.png'
import image_light from '../../assets/images/light.png'
import image_money from '../../assets/images/five.png'
import icons_defuse from '../../assets/icons/icon.svg'

function OverlayBomb({scope, onClose, resetGame}) {
    return (
        <div className={styles.OverlayBomb}>
            <div className={styles.container}>
                <h1 className={styles.title}>Danger ahead!</h1>
                <p className={styles.description}>You're on a Bomb Square! You hit a bomb<br/>
                    and lose all rewards from this field...</p>
                <div className={styles.data}>
                    <div className={styles.overlayWrapper}>
                        <img className={styles.image} src={image_bomb} />
                        <div
                            className={styles.imageBox}
                            style={{ backgroundImage: `url(${image_light})` }}
                        ></div>
                    </div>
                </div>
                <div className={styles.money}>
                    <img
                        className={styles.imageMoney}
                        src={image_money}
                    />
                    <h1 className={styles.titleMoney}>{scope}</h1>
                </div>
                <p  className={` ${styles.decriptionDown}`}>...or defuse it and save your run!</p>
                <div className={styles.buttonContainer}>
                    <button className={`${styles.button} ${styles.buttonHit}`}
                            onClick={() => {
                                onClose();
                                resetGame();
                            }}
                    >
                        <img
                            className={styles.buttonImageHit}
                            src={image_bomb}
                        />
                        Take a hit
                    </button>
                    <button className={`${styles.button} ${styles.buttonDefuse}`}
                        onClick={onClose}
                    >
                        Defuse for
                        <img
                            className={styles.buttonIconDefuse}
                            src={icons_defuse}
                        />
                        49
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OverlayBomb;