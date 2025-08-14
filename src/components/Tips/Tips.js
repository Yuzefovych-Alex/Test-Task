import styles from "./Tips.module.css";
import icon_five from "../../assets/icons/cash.svg";
import icon_xtwo from "../../assets/icons/Frame 28.svg";
import icon_zero from "../../assets/icons/cash-1.svg";
import icon_bomb from "../../assets/icons/image 5.svg";
import icon_cash from "../../assets/icons/cash-2.svg";

function Tips({five, xtwo, zero, bomb, cash}){
    return (
        <div className={styles.Tips}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_five} />
                        <h5 className={styles.number}>
                            {five}
                        </h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_xtwo} />
                        <h5 className={styles.number}>
                            {xtwo}
                        </h5>
                    </li>
                    <li className={styles.item}>
                        <img className={`${styles.img} ${styles.imgZero}`} src={icon_zero}/>
                        <h5 className={styles.number}>
                            {zero}
                        </h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_bomb} />
                        <h5 className={styles.number}>
                            {bomb}
                        </h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_cash} />
                        <h5 className={styles.number}>
                            {cash}
                        </h5>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Tips;