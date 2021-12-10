import React,{ Component } from "react";
import {PropTypes} from "prop-types";
import { debounce } from "@/utils";
import echarts from '@/lib/echarts'
import { connect } from 'react-redux'

class BarChart extends Component {
	static propTypes = {
		width: PropTypes.string,
		height:	PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
	}
	static defaultProps = {
		width: "100%",
		height: "300px",
		style: {},
		className: "",
	}
	state = {
		chart: null
	}

	resize(){
		if(this.state.chart){
			debounce(() => {
				this.state.chart.bind(this);
			},100)()
		}
	}
	dispose() {
		if(!this.state.chart){
			return
		}
		window.removeEventListener("resize",() => {
			this.resize()
		})
		this.setState({chart:null})
	}

	setOptions(){
		const animationDuration = 3000
		this.state.chart.setOption({
			tooltip: {
				trigger: "axis",
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			grid: {
				top: 10,
				left: "2%",
				right: "2%",
				bottom: "3%",
				containLabel: true,
			},
			xAxis: [
				{
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisTick: {
						alignWithLabel: true,
					},
				},
			],
			yAxis: [
				{
					type: "value",
					axisTick: {
						show: false,
					},
				},
			],
			series: [
				{
					name: "pageA",
					type: "bar",
					stack: "vistors",
					barWidth: "60%",
					data: [79, 52, 200, 334, 390, 330, 220],
					animationDuration,
				},
				{
					name: "pageB",
					type: "bar",
					stack: "vistors",
					barWidth: "60%",
					data: [80, 52, 200, 334, 390, 330, 220],
					animationDuration,
				},
				{
					name: "pageC",
					type: "bar",
					stack: "vistors",
					barWidth: "60%",
					data: [30, 52, 200, 334, 390, 330, 220],
					animationDuration,
				},
			],
		})
	}

	initChart(){
		if(!this.el) return
		this.setState({ chart: echarts.init(this.el,'macarons')},() => {})
		this.setOptions(this.props.chartData)
	}

	componentDidMount() {
		debounce(this.initChart.bind(this),300)()
		window.addEventListener("resize",() => this.render())
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.chartData !== this.props.chartData){
			this.resize()
		}
		if(nextProps.chartData !== this.props.chartData){
			this.setOptions(nextProps.chartData)
		}
	}
	componentWillUnmount() {
		this.dispose()
	}

	render() {
		const { className, height, width, style } = this.props
		return(
			<div
				className={className}
				style={{
					...style,
					height,
					width,
				}}
				ref={el => {
					this.el = el
				}}
			></div>
		)
	}
}
export default connect((state) => state.app)(BarChart)
