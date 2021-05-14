import axios from 'axios'
import { notification } from 'antd';
import { Configs } from '../configs';

const app = axios.create({
    baseURL: `${Configs.HOST}`,
    withCredentials: true,
})

app.interceptors.request.use(
    request => {
        const token = localStorage.getItem('token') 
        if(token) {
            request.headers['Authorization'] = `Bearer ${token}`
        }
        return request
    },
    error => {
        return Promise.reject(error)
    }
)

app.interceptors.response.use(
    response => (response), 
    error => {
        notification.error({
            message: 'Error',
            description: error.response.data.message
        })
        if(error.response.data.code === 401) {
            localStorage.removeItem('token')
            setTimeout(() => {
                window.location.replace("/admin/login");
            }, 1000)
        }
        return Promise.reject(error.response.data || error.response.data.err)
    }
)

const fetcher = url => {
    return app.get(url, {withCredentials: true}).then(res => res.data)
}
const post = (url,data) => {
    return app({
        method: 'post',
        url,
        data,
        withCredentials: true,
    }).then(res => res.data).catch(err => err);
}
const patch = (url,data) => {
    return app({
        method: 'patch',
        url,
        data,
        withCredentials: true,
    }).then(res => res.data).catch(err => err);
}
const del = (url) => {
    return app({
        method: 'delete',
        url,
        withCredentials: true,
    }).then(res => res.data).catch(err => err);
}
export { post, patch, del }
export default fetcher