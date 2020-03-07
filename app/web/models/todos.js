import fetch from '../utils/fetch';

export default {
    namespace: 'todos',

    state: {
        dataList: [],
        selectAll: false,
        selectList: [],
        selectType: 'all'
    },

    effects: {
        *queryTodosList({ payload = {}}, { call, put, select }) {
            let response = yield call(fetch, {
                url: '/api/todos/list',
                payload: {
                    data: {
                        ...payload
                    }
                }
            })
            if (response && response.code === 200) {
                yield put({
                    type: 'save',
                    payload: {
                        ...response.data,
                        selectList: response.data.dataList
                    }
                })
            }
        },

        *queryAddItem({ payload = {}}, { call, put, select }) {
            let response = yield call(fetch, {
                url: '/api/todos/add',
                payload: {
                    data: {
                        ...payload
                    }
                }
            })
            return response;
        },
        *querySelectAll({ payload = {}}, { call, put, select }) {
            let response = yield call(fetch, {
                url: '/api/todos/selectAll',
                payload: {
                    data: {
                        ...payload
                    }
                }
            })
            return response;
        },
        *queryChangeSelect({ payload = {}}, { call, put, select}) {
            let response = yield call(fetch, {
                url: '/api/todos/changeSelect',
                payload: {
                    data: {
                        ...payload
                    }
                }
            })
            return response;
        },
        *queryClearCompleted({ payload = {}}, { call, put, select }) {
            let response = yield call(fetch, {
                url: '/api/todos/clearCompleted',
                payload: {
                    data: {
                        ...payload
                    }
                }
            })   
            return response;
        },
        *queryRemoveItem({ payload = {}}, { call, put, select}) {
            let response = yield call(fetch, {
                url: '/api/todos/delete',
                payload: {
                    data: {
                        ...payload
                    }
                }
            })
            return response;
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}