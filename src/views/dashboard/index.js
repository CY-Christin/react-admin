import React,{ useState } from "react";
import { Row, Col } from 'antd'
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart"
import TransactionTable from './components/TransactionTable'
const lineChartDefaultData = {
	"New Visits": {
		expectedData: [100, 120, 161, 134, 105, 160, 165],
		actualData: [120, 82, 91, 154, 162, 140, 145],
	},
	Messages: {
		expectedData: [200, 192, 120, 144, 160, 130, 140],
		actualData: [180, 160, 151, 106, 145, 150, 130],
	},
	Purchases: {
		expectedData: [80, 100, 121, 104, 105, 90, 100],
		actualData: [120, 90, 100, 138, 142, 130, 130],
	},
	Shoppings: {
		expectedData: [130, 140, 141, 142, 145, 150, 160],
		actualData: [120, 82, 91, 154, 162, 140, 130],
	},
};

const Dashboard = () => {
	const [lineChartData,setLineChart] = useState(
		lineChartDefaultData['New Visits']
	)
	const handleSetLineChartData = (type) => setLineChart(lineChartDefaultData[type])
	return(
		<div className="app-container">
			<a href="www.baidu.com" target='_blank'></a>
			<PanelGroup handleSetLineChartData={handleSetLineChartData} />
			<LineChart
				chartData={lineChartData}
				width={500}
				height={300}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			></LineChart>
			<Row gutter={32}>
				<Col xs={24} sm={24} lg={8}>
					<div className="chart-wrapper">
						<RaddarChart/>
					</div>
				</Col>
				<Col xs={24} sm={24} lg={8}>
					<div className="chart-wrapper">
						<PieChart/>
					</div>
				</Col>
				<Col xs={24} sm={24} lg={8}>
					<div className="chart-wrapper">
						<BarChart/>
					</div>
				</Col>
			</Row>

			<Row gutter={8}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={24}
					xl={12}
					style={{ paddingRight: '8px', marginBottom: '30px' }}
				>
					<TransactionTable />
				</Col>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={12}
					xl={12}
					style={{ marginBottom: '30px'}}
				></Col>
			</Row>
		</div>
	)
}

export default Dashboard
