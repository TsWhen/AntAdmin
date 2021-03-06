/*
 * @Author: 情雨随风 
 * @Date: 2019-05-05 22:24:18 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-11 01:01:19
 * @Types axios配置
 */


import axios from 'axios'
import { Response,ResCatch } from './ponse'


// 创建 axios 实例
const http = axios.create({
    baseURL: '/api',    //代理地址
    timeout: 6000       //请求超时时间
})

//请求拦截器
http.interceptors.request.use((config) => {
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//响应拦截器
http.interceptors.response.use(
    res => Response(res),
    err => ResCatch(err)
)


class Axios {
    get(props, url) {
        return http.get(url, {
            params: { ...props }
        })
    }

    post(props, url) {
        return http.post(url, {
            ...props
        })
    }

    upload(props, url) {
        return http({
            method: 'POST',
            url,
            data: props,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default new Axios();