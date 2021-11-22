import Mock from 'mockjs'
import loginAPI from './login'

Mock.mock(/\/login/,"post", loginAPI.login)
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo)

export default Mock
