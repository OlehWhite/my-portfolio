import styles from "./ClickAnimation.module.css";

interface Props {
  className?: string;
}

const ClickAnimation = ({ className }: Props) => {
  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
      <span className={styles.ripple} />
      <svg
        className={styles.hand}
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M32 6c-3 0-6 2.5-6 6v20h-2c-3.3 0-6 2.7-6 6v7c0 7.2 5.8 13 13 13h6c7.2 0 13-5.8 13-13V28c0-3.3-2.7-6-6-6h-2V12c0-3.5-2.7-6-6-6h-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ClickAnimation;
