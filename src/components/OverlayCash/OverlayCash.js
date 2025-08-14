import styles from './OverlayCash.module.css';
import image_cash from '../../assets/images/cash.png'
import image_light from '../../assets/images/light.png'
import image_money from '../../assets/images/five.png'

function OverlayCash({scope, onClose, resetGame}) {
    return (
        <div className={styles.OverlayCash}>
            <div className={styles.container}>
                <h1 className={styles.title}>Game over!</h1>
                <p className={styles.description}>You've reached<br/>
                the end of this run...</p>
                <div className={styles.data}>
                    <div className={styles.overlayWrapper}>
                        <img className={styles.image} src={image_cash} />
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
                <p  className={` ${styles.decriptionDown}`}>...claim and return to the main board</p>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            onClose();
                            resetGame();
                        }}
                    >Claim</button>
                </div>
            </div>
        </div>
    );
}

export default OverlayCash;