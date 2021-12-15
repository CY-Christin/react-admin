import request from "@/utils/request";

export function reqUserInfo(data){
	return request({
		url: '/userInfo',
		method: 'post',
		data
	})
}

export function getUsers(){
	return request({
		url: '/user/list',
        method: 'get'
    })
}
