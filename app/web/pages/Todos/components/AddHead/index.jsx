import React, { useState } from 'react';
import { Input, Checkbox } from 'antd';
import styles from './index.less';

function AddHead(props) {
    const { onAddItem, dataList, selectAll, changeStatusAll } = props;
    const [inputValue, setInputValue] = useState('');
    
    function onSelectAll(ev) {
        const { checked } = ev.target;
        changeStatusAll(checked);
    }

    function onPressEnter(ev) {
        if (ev.nativeEvent.keyCode === 13 && ev.target.value) {
            const { value } = ev.target;
            onAddItem(value, setInputValue);
        }
       
    }

    function onChangeInput(ev) {
        setInputValue(ev.target.value);
    }
    return (
        <div className={`${styles.addHead} ${dataList.length > 0 ? styles.borderStyle : ''}`}>
            <div className={styles.left}>
                {
                    dataList.length > 0 ?
                    <Checkbox checked={selectAll} onChange={onSelectAll} className={styles.checkbox}/>
                    : ''
                }
            </div>
            <div className={styles.right}>
                <Input value={inputValue} onPressEnter={onPressEnter} onChange={onChangeInput}/>
            </div>
        </div>
    )
}

export default AddHead;