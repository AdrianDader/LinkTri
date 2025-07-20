// ButtonPrimary.tsx
import styles from "./button.module.css";

export function ButtonPrimary({ children, ...props }) {
  return (
    <button
      className={styles.buttonPrimary}
      {...props} 
    >
      {children}
    </button>
  );
}

export function ButtonSecondary({ children, ...props }) {
  return (
    <button
      className={styles.buttonSecondary}
      {...props}
    >
      {children}
    </button>
  );
}
