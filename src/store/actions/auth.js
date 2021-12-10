import { setUserToken, getUserInfo } from "./user";
import { reqLogin } from '@/api/login'
import {setToken} from "@/utils/auth";

export const login = (username, password) => (dispatch) => {
	return new Promise((resolve,reject) =>{
		reqLogin({username,password})
			.then(response =>{
				const data = response
				console.log('res',response)
				if(data.status === 0){
					const token = data.token
					dispatch(setUserToken(token))
					setToken(token)
					resolve(data)
				}else {
					const msg = data.message
					reject(msg)
				}
			}).catch((error)=>{
				reject(error)
		})
	})
}
