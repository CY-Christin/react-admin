import React from "react";
import { connect } from 'react-redux'
import { Layout} from "antd";

const Main = (props) => {
	const { tagsView } = props
	return(
		<Layout style={{minHeight: '100vh'}}></Layout>
	)
}
export default connect((state) => state.settings)(Main)
