import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { Tag } from 'antd'
import { deleteTag, emptyTaglist, closeOtherTags } from "@/store/actions";

class TagList extends Component {
	tagListContainer = React.createRef()
	contextMenuContainer = React.createRef()
	state = {
		left: 0,
		top: 0,
		menuVisible: false
	}


}
