import {useRef, useEffect, forwardRef} from "react";

import styles from "./Reward-conunter.module.css"
import icon_five from "../../assets/icons/cash.svg";

const RewardCounter = forwardRef(({ scope, xtwoState }, ref) => {
    return (
        <div className={styles.RewardCounter}>
            <div className={styles.container}>
                {xtwoState && <div className={styles.xtwo}>x2</div>}
                <img className={styles.img} src={icon_five} alt="icon" />
                <h1 className={styles.number} ref={ref}>{scope}</h1>
            </div>
        </div>
    );
});

export default RewardCounter;