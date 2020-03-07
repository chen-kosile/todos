// import { useState, useEffect } from 'react';
import Todos from './Todos';
import styles from './index.less';
// import { formatMessage } from 'umi-plugin-locale';
export default function() {
  return (
    <div className={styles.normal}>
      <Todos/>
    </div>
  );
}
