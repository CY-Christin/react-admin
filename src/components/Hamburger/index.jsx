import React from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import { toggleSiderBar } from "@/store/actions";
import './index.less'

const Hamburger = (props) => {
	const { sidebarCollapsed, toggleSidebar } = props
	return(
		<div className="hamburger-container">
			<Icon
				type={sidebarCollapsed ? "menu-unfold" : "menu-fold"}
				onClick={toggleSidebar}
			>
			</Icon>
		</div>
	)
}

export default connect((state) => state.app, {toggleSiderBar})(Hamburger)
