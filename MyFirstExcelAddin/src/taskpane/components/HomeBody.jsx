import React from 'react';
import styles from './HomeBody.module.css';
/* https://www.letsbuildui.dev/articles/what-is-css-motion-path/ */
export const HomeBody = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyItems:'center',alignContent:'center',justifyContent:'center' }}>
    <div className={styles['example-1']}>
      {/* {"Lets get this done"} */}
    </div>
    </div>
  );
};
