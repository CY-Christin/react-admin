import React from "react";
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, Modal, Layout, Avatar} from "antd";
import { Link } from "react-router-dom";
import { getUserInfo } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";
import './index.less'

const { Header } = Layout

const LayoutHeader = (props) => {
	const {
		token,
		avatar,
		sidebarCollapsed,
		getUserInfo,
		showSettings,
		fixedHeader
	} = props
	token && getUserInfo(token)
	const computedStyle = () => {
		let styles;
		if(fixedHeader) {
			if(sidebarCollapsed){
				styles = {
					width: "calc(100% - 80px)"
				}
		}else{
				styles = {
					width: "calc(100% - 200px)"
				}
			}
		}else{
			styles = {
				width: '100%'
			}
		}
		return styles
	}

	return(
		<>
			{fixedHeader? <Header/> : null}
			<Header
				style={computedStyle()}
				className={fixedHeader? 'fix-header':''}
			></Header>

			<div className="right-menu">
				<FullScreen/>
				{showSettings? <Settings/> :null}
				<div className="dropdown-wrap">
					<Dropdown overlay='menu'>
						<div>
							<Avatar shape="square" size="medium" src={avatar}></Avatar>
							<Icon style={{ color: 'rgba(0,0,0,0.3)'}} type="caret-down" ></Icon>
						</div>
					</Dropdown>
				</div>
			</div>
		</>
	)
}
const mapStateToProps = (state) => {
	return{
		...state.app,
		...state.user,
		...state.settings
	}
}
export default connect(mapStateToProps,{ getUserInfo })(LayoutHeader)
