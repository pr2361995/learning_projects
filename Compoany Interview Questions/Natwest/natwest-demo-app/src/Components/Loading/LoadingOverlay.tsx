import React from 'react';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingOverlay;
