import React, { useEffect } from 'react';
import { connect } from 'dva';
import AddHead from './components/AddHead';
import Lists from './components/Lists';
import Footer from './components/Footer';
import styles from './index.less';

function Todos(props) {
    const { todos, dispatchAction } = props;
    const { dataList, selectAll, selectList, selectType } = todos;
    useEffect(() => {
        dispatchAction({
            type: 'todos/queryTodosList'
        })
    }, [dispatchAction]);

    function onAddItem(value, setInput) {
        dispatchAction({
            type: 'todos/queryAddItem',
            payload: {
                value
            }
        }).then(res => {
            if (res.code === 200) {
                dispatchAction({
                    type: 'todos/queryTodosList'
                })
                setInput('');
            }
        })
    }

    function changeStatusAll(checked) {
        dispatchAction({
            type: 'todos/querySelectAll',
            payload: {
                selectAll: checked
            }
        }).then(res => {
            if (res.code === 200) {
                if (res.code === 200) {
                    dispatchAction({
                        type: 'todos/queryTodosList'
                    })
                } 
            }
        })
    }

    function changeStatus(checked, index) {
        // let list = selectList;
        // list[index].checked = checked;
        // let newList = list.filter(item => {
        //     if (selectType === 'all') {
        //         return true;
        //     } else if ( selectType === 'active') {
        //         return !item.checked;
        //     } else if (selectType === 'completed') {
        //         return item.checked;
        //     }
        //     return false;
        // })

        dispatchAction({
            type: 'todos/queryChangeSelect',
            payload: {
                checked,
                id: selectList[index].id
            }
        }).then(res => {
            if (res.code === 200) {
                dispatchAction({
                    type: 'todos/queryTodosList'
                })
            }
        })
    }

    function removeItem(index) {
        dispatchAction({
            type: 'todos/queryRemoveItem',
            payload: {
                id: selectList[index].id
            }
        }).then(res => {
            if (res.code === 200) {
                dispatchAction({
                    type: 'todos/queryTodosList'
                })
            } 
        })
    }

    function onChangeType(type) {
        let selectList = dataList.filter(item => {
            if (type === 'all') {
                return true;
            } else if ( type === 'active') {
                return !item.checked;
            } else if (type === 'completed') {
                return item.checked;
            }
            return false;
        })
        dispatchAction({
            type: 'todos/save',
            payload: {
                selectType: type,
                selectList
            }
        });
    }

    function clearCompleted() {
        dispatchAction({
            type: 'todos/queryClearCompleted'
        }).then(res => {
            if (res.code === 200) {
                dispatchAction({
                    type: 'todos/queryTodosList'
                })
            } 
        })
    }
    return (
        <div className={styles.todos}>
            <AddHead
                changeStatusAll={changeStatusAll}
                onAddItem={onAddItem}
                dataList={dataList}
                selectAll={selectAll}
            />
            {
                dataList.length > 0 ? 
                <>
                    <Lists
                        changeStatus={changeStatus}
                        removeItem={removeItem}
                        selectList={selectList}
                    />
                    <Footer
                        onChangeType={onChangeType}
                        clearCompleted={clearCompleted}
                        length={selectList.length}
                        selectType={selectType}
                        isCompleted={selectList.some(item => item.checked === true)}
                    />
                </> : ''
            }
        </div>
    )
}

export default connect(
    state => ({
        todos: state.todos
    }),
    dispatch => ({
        dispatchAction: dispatch
    })
)(Todos);