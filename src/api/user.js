import request from "@/utils/request";

export function reqUserInfo(data){
	return request({
		use: '/userInfo',
		method: 'post',
		data
	})
}

export function getUsers(){
	return request({
        use: '/user/list',
        method: 'get'
    })
}
