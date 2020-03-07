import React from 'react';
import { Checkbox, Icon } from 'antd';
import styles from './index.less';

function Lists(props) {
    const { changeStatus, selectList, selectAll, removeItem } = props;

    function changeCheckBox(ev, index) {
        const { checked } = ev.target;
       changeStatus(checked, index);
    }

    return (
        <div className={styles.lists}>
            {
                selectList.map((item, index) => (
                    <div className={styles.item} key={item.id}>
                        <Checkbox checked={item.checked} onChange={(ev) => changeCheckBox(ev, index)}/>
                        <div className={`${styles.middle} ${!selectAll ? styles.itemValue : styles.select}`}>
                            {item.value}
                        </div>
                        <div className={styles.removeItem} onClick={() => removeItem(index)}>
                            <Icon type="close"/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Lists;