import React from "react";
import { Redirect, withRouter, Route, Switch} from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Layout } from "antd";
import { getMenuItemInMenuListByProperty } from '@/utils'
import user from "../../../store/reducers/user";
import routeList from '@/config/routeMap.js'
const { Content } = Layout

const getPageTitle = (menuList, pathName) => {
	let title = "Ant Design Pro"
	let item = getMenuItemInMenuListByProperty(menuList, "path", pathName)
	if(item){
		title = `${item.title} - Ant Design Pro`
	}
	return title
}
const LayoutContent = (props) => {
	const { role, location} = props
	const { pathname } = location
	const handleFilter = (route) => {
		return role === 'admin' || !route.roles || route.roles.includes(role)
	}
	return(
		<DocumentTitle title={getPageTitle('', pathname)}
		>
			<Content style={{height :"calc(100% - 100px)"}}>
				<TransitionGroup>
					<CSSTransition
						key={location.pathname}
						timeout={500}
						className="fade"
						exit={false}
					>
						<Switch location={location}>
							{routeList.map(route=>{
								return(
									handleFilter(route)&&(
										<Route
											component={route.component}
											key={route.path}
											path={route.path}
										/>
									)
								)
							})}
							<Redirect to='/'></Redirect>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			</Content>
		</DocumentTitle>
	)
}

export default connect((state) => state.user)(withRouter(LayoutContent))
