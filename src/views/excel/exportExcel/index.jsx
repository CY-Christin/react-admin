import React,{ Component } from "react";
import {
	Table,
	Tag,
	Form,
	Icon,
	Button,
	Input,
	Radio,
	Select,
	message,
	Collapse
} from "antd";
import { excelList } from "@/api/excel";
const { Panel } = Collapse
const columns = [
	{
		title: "id",
		dataIndex: 'id',
		key: 'id',
		width: 200,
		align: 'center'
	},
	{
		title:'Title',
		dataIndex: 'title',
		key: 'title',
		width: 200,
		align: 'center'
	},
	{
		title: 'Author',
		key: 'author',
		dataIndex: 'author',
		width: 100,
		align: 'center',
		render: (author) => <Tag key={author}>{author}</Tag>
	},
	{
		title: 'Reading',
		dataIndex: 'readings',
		key: 'readings',
		width: 195,
		align: "center"
	},
	{
		title: "Date",
		dataIndex: 'date',
		key: 'date',
		width: 195,
		align: "center"
	}
]
class Excel extends Component{
	_isMounted = false
	state = {
		list: [],
		filename: 'excel-file',
		autoWidth: true,
		bookType: 'xlsx',
		downloadLoading: false,
		selectedRows: [],
		selectedRowKeys: []
	}
	fetchData = () => {
		excelList().then(res => {
			console.log('res',res)
			const list = res.data.data.items
			if(this._isMounted){
				this.setState({list})
			}
		})
	}
	componentDidMount() {
		this._isMounted = true
		this.fetchData()
	}
	componentWillUnmount() {
		this._isMounted = false
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({ selectedRowKeys, selectedRows })
	}
	handleDownload = (type) => {
		if(type === 'selected' && this.state.selectedRowKeys.length === 0){
			message.error('Please select the data you want to download')
			return
		}
		this.setState({
			downloadLoading:true
		})
		import('@/lib/Export2Excel').then((excel) => {
			const tHeader = ["ID", "Title", "Author", "Readings", "Date" ]
			const filterVal = [ 'id', "title", "author", "readings", "date" ]
			const list = type === 'all' ? this.state.list : this.state.selectedRows
			const data = this.formatJson(filterVal, list)
			excel.export_json_to_excel({
				header: tHeader,
				data,
				filename: this.state.filename,
				autoWidth: this.state.autoWidth,
				bookType: this.state.bookType
			})
			this.setState({
				selectedRowKeys: [],
				downloadLoading: false
			})
		})
	}
	formatJson(filterVal,jsonData){
		return jsonData.map(v => filterVal.map(j => v[j]))
	}
	filenameChange = (e) => {
		this.setState({
			filename: e.target.value
		})
	}
	autoWidthChange = (e) => {
		this.setState({
			autoWidth: e.target.checked
		})
	}
	bookTypeChange = (value) => {
		this.setState({
			bookType: value
		})
	}
	render() {
		const { selectedRowKeys } = this.state
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange
		}
		return(
			<div className='app-container'>
				<Collapse defaultActiveKey={['1']}>
					<Panel header='导出选项' key='1'>
						<Form layout='inline'>
							<Form.Item label='文件名：'>
								<Input
									style={{ width:'250px'}}
									prefix={
										<Icon type='file' style={{ color: "rgba(0,0,0,.25)" }}  />
									}
									placeholder='请输入文件名（默认excel-file）'
									onChange={this.filenameChange}
								/>
							</Form.Item>
							<Form.Item label='单元格宽度是否自适应：'>
								<Radio.Group
									onChange={this.autoWidthChange}
									value={this.state.autoWidth}
								>
									<Radio value={true}>是</Radio>
									<Radio value={false}>否</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label='文件类型：'>
								<Select
									defaultValue='xlsx'
									style={{ width: 120 }}
									onChange={this.bookTypeChange}
								>
									<Select.Option value='xlsx'>xlsx</Select.Option>
									<Select.Option value='csv'>csv</Select.Option>
									<Select.Option value='txt'>txt</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item>
								<Button
									type='primary'
									icon='file-excel'
									onClick={this.handleDownload.bind(null,'all')}
								>
									全部导出
								</Button>
							</Form.Item>
							<Form.Item>
								<Button
									type='primary'
									icon='file-excel'
									onClick={this.handleDownload.bind(null,'selected')}
								>
									导出已选项
								</Button>
							</Form.Item>
						</Form>
					</Panel>
				</Collapse>
				<br/>
				<Table
					bordered
					columns={columns}
					rowKey={(record => record.id)}
					dataSource={this.state.list}
					pagination={false}
					rowSelection={rowSelection}
					loading={this.state.downloadLoading}
				/>
			</div>
		)
	}
}
export default Excel
