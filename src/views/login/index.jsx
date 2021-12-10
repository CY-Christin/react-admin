import React, { useState } from "react";
import { Form, Icon, Input, Button, message, Spin} from "antd";
import DocumentTitle from "react-document-title";
import {connect} from "react-redux";
import { login,getUserInfo } from "../../store/actions";
import "./index.less"
import {Redirect} from "react-router-dom";

const Login = (props) =>{
	const { form, token, login, getUserInfo } = props
	const { getFieldDecorator } = form

	const [ loading, setLoading ] = useState(false)
	const handleLogin = (username,password) =>{
		setLoading(true)
		login(username,password)
			.then((data) => {
				message.success('登录成功')
				handleUserInfo(data.token)
			}).catch((err)=>{
				console.log(err)
				message.error('登录失败')
                setLoading(false)
            })
	}
	const handleSubmit = (event) =>{
		event.preventDefault()
		form.validateFields((err,values)=>{
			if(!err) {
				console.log(1)
				const { username, password} = values
				handleLogin(username,password)
			}else{
				message.error('检验失败')
			}
		})
	}

	const handleUserInfo = (token) => {
		getUserInfo(token)
			.then((data) => {})
			.catch((error) => {
				message.error(error)
			})
	}
	if(token){
		return <Redirect to="/dashboard" />
	}
	return(
		<DocumentTitle title={"用户登录"}>
			<div className={"login-container"}>
				<Form onSubmit={handleSubmit} className="content">
					<div className="title">
						<h2>用户登录</h2>
					</div>
					<Spin spinning={loading} tip='登录中...'>
						<Form.Item>
							{getFieldDecorator('username',{
								rules:[
									{
										required:true,
										whiteSpace:true,
										message:'请输入用户名'
									}
								],
								initialValue: "admin"
							})(
								<Input
									perfix={
										<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}></Icon>
									}
									placeholder='用户名'
								></Input>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password',{
								rules:[
									{
										required:true,
										whiteSpace:true,
										message:'请输入密码'
									}
								],
								initialValue: "123456"
							})(
								<Input
									perfix={
										<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}></Icon>
									}
									type='password'
									placeholder='密码'
								></Input>
							)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
						</Form.Item>
						<Form.Item>
							<span>账号：admin 密码：随便填</span>
						</Form.Item>
					</Spin>
				</Form>
			</div>

		</DocumentTitle>
	)
}

const WrapLogin = Form.create()(Login)

export default connect((state) => state.user, {login,getUserInfo})(
	WrapLogin
)
