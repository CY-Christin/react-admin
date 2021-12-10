import axios from 'axios'
import store from "@/store";
import { Modal } from "antd";
import { getToken } from "./auth";

const service = axios.create({
	baseURI: process.env.REACT_APP_BASE_API,
	timeout: 5000
})
service.interceptors.request.use(
    config => {
        if (store.getState().user.token) {
            config.headers.Authorization = getToken()
        }
        return config
    },
    error => {
		console.log(error)
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response) => {
        console.log('response',response)
        return response
    },
    // response => {
    //     console.log('response',response)
    //     const res = response.data
    //     if (res.status !== 0) {
    //         Modal.error({
    //             title: '错误',
    //             content: res.msg
    //         })
    //         return Promise.reject(res.msg)
    //     } else {
    //         return res
    //     }
    // },
    error => {
        console.log('err' + error) // for debug
        Modal.error({
            title: '错误',
            content: error.message
        })
        return Promise.reject(error)
    }
)

export default service
