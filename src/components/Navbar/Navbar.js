import styles from './Navbar.module.css';
import image_logo from "../../assets/images/white-green-logo.png";

function Navbar() {
    return (
        <div className={styles.Navbar}>
            <div className={styles.container}>
                <img className={styles.logo} src={image_logo} alt="logo" />
            </div>
        </div>
    );
}

export default Navbar;