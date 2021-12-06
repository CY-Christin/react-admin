import React from 'react'
import { Row, Col, Icon } from 'antd'
import CountUp from 'react-countup'

const chartList = [
	{
		type: 'New Visits',
		icon: 'user',
		num: 102400,
		color: '#40c9c6'
	},
	{
		type: "Messages",
		icon: "message",
		num: 81282,
		color: '#36a3f7'
	},
	{
		type: "Purchases",
		icon: "pay-circle",
		num: 9280,
		color: "#f4516c",
	},
	{
		type: "Shoppings",
		icon: "shopping-cart",
		num: 13600,
		color: "#f6ab40",
	},
]

const PanelGroup = (props) => {
	const { handleSetLineChartData } = props;
	return (
		<div className='panel-group-container' >
			<Row gutter={40} className='panel-group' >
				{chartList.map((chart,i)=> (
					<Col
						lg={6}
						sm={12}
						xs={12}
						key={i}
						onClick={handleSetLineChartData.bind(this, chart.type)}
						className='card-panel-col'
					>
						<div className='card-panel' >
							<div className='card-panel-icon-wrapper' >
								<Icon type={chart.icon} style={{ fontSize: 55, color: chart.color }} className={chart.type} />
							</div>
							<div className='card-panel-description' >
								<p className='card-panel-text'>{chart.type}</p>
								<CountUp
									start={0}
									end={chart.num}
									className="card-panel-num"
								/>
							</div>
						</div>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default PanelGroup
