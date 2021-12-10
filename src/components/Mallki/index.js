import React from "react";
import { PropTypes } from "prop-types";
import './index.less'
const Mallki = (props) => {
	const { className, text } = props
	return(
		<a className={`mallki ${className}`} href='#/'
		>
			{text}
			<span data-letters={text}></span>
			<span data-letters={text}></span>
		</a>
	)
}

Mallki.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string
}
Mallki.defaultProps = {
	className: '',
	text: 'admin'
}
export default Mallki
