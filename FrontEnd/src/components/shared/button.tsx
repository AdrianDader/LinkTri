import styles from "./button.module.css";

export function ButtonPrimary({ children, onClick }) {
  return (
    <button className={styles.buttonPrimary} onClick={onClick}>
      {children}
    </button>
  );
}

export function ButtonSecondary({ children, onClick }) {
  return (
    <button className={styles.buttonSecondary} onClick={onClick}>
      {children}
    </button>
  );
}
