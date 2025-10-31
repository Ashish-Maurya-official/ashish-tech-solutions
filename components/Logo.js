import styles from './Logo.module.css';

export default function Logo({ size = 'medium', showText = true }) {
  return (
    <div className={`${styles.atSolutionsLogo} ${styles[size]}`}>
      {/* Logo Icon */}
      <div className={styles.logoSymbol}>
        AT
      </div>
      
      {/* Brand Text */}
      {showText && (
        <span className={styles.brandText}>
          AT Solutions
        </span>
      )}
    </div>
  );
}
