import { message } from 'antd';
import config from '../config';

const { HOST, PORT } = config;

export function obj2query(obj = {}) {
    let str = '';
    Object.keys(obj).forEach((k) => {
        if (typeof obj[k] !== 'undefined') {
            str += `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}&`;
        }
    });
    return str.slice(0, -1);
}

export default (option) => {
    const { payload, url } = option;
    const { noToast, data } = payload;
    return fetch(url, {
        method: 'POST',
        withCredentials: true,
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: obj2query(data)
    }).then(res => {
        return res.json()
    }).catch(err => {
        message.error('错误');
        throw err;
    }).then((resp) => {
        if (resp.code !== 200) {
            if (!noToast) {
                message.error('错误');
            }
            return Promise.reject(resp.msg || resp.message || resp.debugInfo || '请求失败');
        } if (!noToast) {
            // message.error(resp.message);
        }
        return resp;
    });
}