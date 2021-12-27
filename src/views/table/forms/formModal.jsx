import React, {Component, useEffect, useState} from 'react';
import {Modal, Row, Col} from "antd";
import './forms.less'
const FormModal = (props) => {
	const {show,showModal} = props
	const [modalVisible, setModalVisible] = useState(false);
	useEffect(()=>{
		setModalVisible(show)
	},[show])
	useEffect(()=>{
		showModal(modalVisible)
	},[modalVisible])
	return(
		<>
			<Modal
				visible={modalVisible}
				onOk={()=>setModalVisible(false)}
				onCancel={()=>setModalVisible(false)}
				className="modalStyle"
				title='弹出框'
				okText='确定'
				cancelText='取消'
			>
				<Row>
					<Col span={8}>3-8</Col>
					<Col span={8}>3-8</Col>
					<Col span={8}>3-8</Col>
				</Row>
				<Row>
					<Col span={6}>4-6</Col>
					<Col span={6}>4-6</Col>
					<Col span={6}>4-6</Col>
					<Col span={6}>4-6</Col>
				</Row>
				<Row>
					<Col span={12}>2-12</Col>
					<Col span={12}>2-12</Col>
				</Row>
			</Modal>
		</>
	)
}
export default FormModal
