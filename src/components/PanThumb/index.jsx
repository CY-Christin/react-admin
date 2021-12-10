import React from "react";
import { PropTypes } from "prop-types";
import './index.less'

const PanThumb = (props) => {
	const { image, zIndex, width, height, className} = props
	return(
		<div
			className={`pan-item ${className}`}
			style={{
				zIndex,
				height,
				width
			}}
		>
			<div className='pan-info'>
				<div className='pan-info-roles-container'>
					{props.children}
				</div>
				<img src={image} className='pan-thumb' alt=""/>
			</div>
		</div>
	)
}

PanThumb.propTypes = {
	image: PropTypes.string,
	zIndex: PropTypes.number,
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string
}
PanThumb.defaultProps = {
	zIndex: 1,
	width: '150px',
	height: '150px',
	className: ''
}
export default PanThumb
