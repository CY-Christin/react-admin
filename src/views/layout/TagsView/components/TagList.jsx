﻿import React,{ Component } from "react";
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
	handleClose = (tag) => {
		const { history, deleteTag, taglist } = this.props
		const path = tag.path
		const currentPath = history.location.pathname
		const length = taglist.length
		if(path === currentPath ) {
			history.push(taglist[length-1].path)
		}
		if(path === taglist[length-1].path &&
		currentPath === taglist[length-1].path){
			if(length-2 > 0){
				history.push(taglist[length-2].path)
			}else if (length===2){
				history.push(taglist[0].path)
			}
		}
		deleteTag(tag)
	}
	handleClick = (path) => {
		this.props.history.push(path)
	}
	openContextMenu = (tag,event) => {
		event.preventDefault()
		const menuMinWidth = 105
		const clickX = event.clientX
		const clickY = event.clickY
		const clientWidth = this.tagListContainer.current.clientWidth
		const maxLeft = clientWidth - menuMinWidth

		if (clickX > maxLeft) {
			this.setState({
				left: clickX - menuMinWidth + 15,
				top: clickY,
				menuVisible: true,
				currentTag: tag
			})
		}else{
			this.setState({
				left: clickX,
				top: clickY,
				menuVisible: true,
				currentTag: tag
			})
		}
	}

	handleCloseOtherTags = () => {
		const currentTag = this.state.currentTag
		const { path } = currentTag
		this.props.closeOtherTags(currentTag)
		this.props.history.push(path)
		this.closeContextMenu()
	}

	handleCloseAllTags = () => {
		this.props.emptyTaglist()
		this.props.history.push("/dashboard")
		this.closeContextMenu()
	}

	closeContextMenu = () => {
		this.setState({
			menuVisible: false
		})
	}

	handleClickOutside = (event) => {
		const { menuVisible } = this.state
		const isOutside = !(
			this.contextMenuContainer.current &&
				this.contextMenuContainer.current.contains(event.target)
		)
		if(isOutside && menuVisible){
			this.closeContextMenu()
		}
	}

	componentDidMount() {
		document.body.addEventListener("click", this.handleClickOutside)
	}

	componentWillUnmount() {
		document.body.removeEventListener("click", this.handleClickOutside)
	}

	render() {
		const { left, top, menuVisible } = this.state
		const { taglist, history } = this.props
		const currentPath = history.location.pathname
		return(
			<>
				<Scrollbars
					autoHide
					autoHideTimeout={1000}
					autoHideDuration={200}
					hideTracksWhenNoteNeeded={true}
					renderView={(props) => (
						<div {...props} className='scrollbar-track-vertical'></div>
					)}
					renderTrackVertical={(props) => (
						<div {...props} className='scrollbar-thumb-vertical'></div>
					)}
				>
					<ul className='tags-wrap' ref={this.tagListContainer}>
						{taglist.map((tag)=>(
							<li key={tag.path}>
								<Tag
									onClose={this.handleClose.bind(null,tag)}
									closable={tag.path !== "/dashboard"}
									close={currentPath === tag.path ? 'geekblue': 'gold'}
									onClick={this.handleClick.bind(null,tag.path)}
									onContextMenu={this.openContextMenu.bind(null,tag)}
								>
									{tag.title}
								</Tag>
							</li>
						))}
					</ul>
				</Scrollbars>
				{menuVisible?(
					<ul
						className='contextmenu'
						style={{ left: `${left}px`, top: `${top}px` }}
					>
						<li onClick={this.handleCloseOtherTags}>关闭其他</li>
						<li onClick={this.handleCloseAllTags}>关闭其他</li>
					</ul>
				) : null}
			</>
		)
	}

}
export default withRouter(
	connect((state) => state.tagsView,{
		deleteTag,
		emptyTaglist,
		closeOtherTags
	})(TagList)
)
