import styles from './Title.module.css';

function Title() {
    return (
        <header className={styles.Title}>
            <div className={styles.container}>
                <div className={styles.lineLeft}></div>
                <h1 className={styles.title}>Roll Craft</h1>
                <div className={styles.lineRight}></div>
            </div>
        </header>
    );
}

export default Title;