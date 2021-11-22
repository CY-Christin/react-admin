import user from "../store/reducers/user";

const tokens = {
	admin:'admin-token',
}

const users = {
	"admin-token" : {
		id:'admin',
		role:'admin',
		name:'ch',
		description:'拥有系统内所有菜单和路由权限'
	}
}

export default {
	login: (config) => {
		const { username } = JSON.parse(config.body)
		const token = tokens[username]
		if(!token){
			return{
				status:1,
				message:"用户名或密码错误"
			}
		}
		return {
			status: 0,
			token
		}
	},
	userInfo: (config) => {
		const token = config.body
		const userInfo = users[token]
		if(!userInfo){
			return{
                status:1,
                message:"获取用户信息失败"
            }
		}
		return {
			status: 0,
			userInfo
		}
	},
	getUsers: () => {
		return {
			status: 0,
			users: Object.values(users),
		};
	},
}
