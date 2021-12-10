import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from "react-redux";
import echarts from '@/lib/echarts'
import { debounce } from "@/utils";

class LineChart extends Component {
	static porpTypes = {
		width: PropTypes.string,
		height: PropTypes.string,
		className: PropTypes.string,
		styles: PropTypes.object,
		chartData: PropTypes.object.isRequired
	}
	static defaultProps = {
		width: '100%',
		height: '350px',
		styles: {},
		className: ''
	}
	state = {
		chart: null
	}
	componentDidMount() {
		debounce(this.initChart.bind(this), 300)()
		window.addEventListener('resize', () => this.resize())
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
			this.resize()
		}
		if(nextProps.chartData !== this.props.chartData) {
			debounce(this.initChart.bind(this), 300)()
		}
	}

	componentWillUnmount() {
		this.dispose()
	}

	resize(){
		const chart = this.state.chart
		if(chart) {
			debounce(chart.resize.bind(this), 300)
		}
	}

	dispose() {
		if (!this.state.chart) {
			return
		}
		window.removeEventListener("resize", () => this.resize())
		this.setState({ chart: null })
	}

	setOptions({ expectedData, actualData } = {}) {
		this.state.chart.setOption({
			backgroundColor: '#fff',
			xAxis: {
				data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				boundaryGap: false,
				axisTick: {
					show: false
				}
			},
			grid: {
				left: 10,
				right: 10,
				bottom: 10,
				top: 30,
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
				},
				padding: [ 5, 10]
			},
			yAxis: {
				axisTick: {
					show: false
				}
			},
			legend:{
				data: ["expected", "actual"],
			},
			series: [
				{
					name: "expected",
					itemStyle: {
						normal:{
							color: "#FF005A",
							lineStyle: {
								color: "#FF005A",
								width: 2
							}
						}
					},
					smooth: true,
					type: 'line',
					data: expectedData,
					animationDuration: 2000,
					animationEasing: 'cubicInOut'
				},
				{
					name: 'actual',
					smooth: true,
					type: 'line',
					itemStyle: {
						normal: {
							color: "#3888FA",
							lineStyle: {
								color: "#3888FA",
								width: 2
							},
							areaStyle:{
								color: "F3F8FF"
							}
						}
					},
					data: actualData,
					animationDuration: 2000,
					animationEasing: "quadraticOut"
				}
			]
		})
	}


	initChart() {
		if(!this.el) return;
		this.setState({ chart: echarts.init(this.el, "macarons") },()=>{
			this.setOptions(this.props.chartData)
		})
	}

	render() {
		const { className, height, width, styles } = this.props
		return(
			<div
				className={className}
				ref={(el) => (this.el = el)}
				style={{
					...styles,
					height,
					width
				}}
			></div>
		)
	}
}

export default connect(state=> this.state.app)(LineChart)