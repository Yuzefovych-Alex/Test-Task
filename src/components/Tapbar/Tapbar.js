import styles from "./Tapbar.module.css";
import icon_office from "../../assets/icons/office.svg"
import icon_resources from "../../assets/icons/resources.svg"
import icon_materials from "../../assets/icons/materials.svg"
import icon_goods from "../../assets/icons/goods.svg"
import icon_stock from "../../assets/icons/stock.svg"

function Tapbar() {
    return (
        <div className={styles.Tapbar}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_office} alt=""/>
                        <h5 className={styles.title}>Office</h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_resources} alt=""/>
                        <h5 className={styles.title}>Resources</h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_materials} alt=""/>
                        <h5 className={styles.title}>Materials</h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_goods} alt=""/>
                        <h5 className={styles.title}>Goods</h5>
                    </li>
                    <li className={styles.item}>
                        <img className={styles.img} src={icon_stock} alt=""/>
                        <h5 className={styles.title}>Stock</h5>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Tapbar;