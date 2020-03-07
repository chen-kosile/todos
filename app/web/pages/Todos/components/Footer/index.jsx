import React from 'react';
import styles from './index.less';

function Footer(props) {
    const { 
        selectType, length, isCompleted,
        onChangeType, clearCompleted 
    } = props;

    return (
        <div className={styles.footer}>
            <div className={`${styles.common} ${styles.one}`}>
            <div className={styles.itemNum}>{length} items left</div>
                <div className={styles.selectType}>
                   <div 
                    className={`${styles.type} ${selectType === 'all' ? styles.actived : ''}`} 
                    onClick={() => onChangeType('all')}>
                        all
                    </div>
                    <div 
                    className={`${styles.type} ${selectType === 'active' ? styles.actived : ''}`}
                    onClick={() => onChangeType('active')}>
                        active
                    </div> 
                    <div 
                    className={`${styles.type} ${selectType === 'completed' ? styles.actived : ''}`}
                    onClick={() => onChangeType('completed')} >
                       Completed
                    </div> 
                </div>                 
                <div className={styles.clearBtn} onClick={clearCompleted}>
                    { isCompleted ? 'Clear completed' : ''}
                </div>
            </div>
            <div className={`${styles.common} ${styles.tow}`}></div>
            <div className={`${styles.common} ${styles.three}`}></div>
        </div>
    )
}

export default Footer;