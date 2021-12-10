import React,{ Component } from "react";
import { Card, Progress } from "antd";
import { connect } from "react-redux";
import PanThumb from "@/components/PanThumb";
import Mallki from '@/components/Mallki';
import "./index.less"

class BoxCard extends Component {
	state = {}
	render(){
		const {avatar} = this.props
		return(
			<Card
				cover={
					<img
						src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
						alt=""
						style={{height:'480px'}}
					/>
				}
			>
				<div
					style={{position:'relative'}}
				>
					<PanThumb image={avatar} className="panThumb"/>
					<Mallki className='mallki-text' text='admin' />
					<div style={{paddingTop:'35px'}} className='progress-item'>
						<span>Vue</span>
						<Progress percent={70} />
					</div>
					<div className='progress-item'>
						<span>JavaScript</span>
						<Progress percent={18} />
					</div>
					<div className='progress-item'>
						<span>Css</span>
						<Progress percent={12} />
					</div>
					<div className='progress-item'>
						<span>ESLint</span>
						<Progress percent={100} />
					</div>
				</div>
			</Card>
		)
	}
}
export default connect((state) => state.user)(BoxCard)
