import React from 'react';

import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Table,
	Modal,
	Button,
	Input,
	message
} from 'antd';
import {
	toQuery,
	timeFormat
} from '../../utils/utils';
import {
	getnote,
	deteleproblemnote,
	updataproblemnote
} from '../../actions/profile';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
@connect(state => ({
	profile: state.profile
}))
@CSSModules(styles)
export default class ProfileDiscuss extends React.Component {
	constructor() {
		super();
		this.state = {
			code: '',
			problemId: '',
			userId: localStorage.userId,
			data: [],
			visible: false,
			rowcontent: '',
			noteid: '',
			title: '',
			text: '',
			notecontent: '',
			notetitle: '',
			selectedKeys: '',
			isMounted: false,
			pid: ''
		}
	};
	componentDidMount() {
	    this.state.isMounted = true;
		this.props.dispatch(getnote(toQuery({
			rows: 10,
			page: 1,
			userId: this.state.userId,
			problemId: this.state.problemId,
			id: ''
		}))).then(() => {
			if (!!this.props.profile) {
				if (this.state.isMounted){
					this.setState({
						data: this.props.profile.data
				     });
				}
				
			}
		});
	};

	showModal(e) {
	//debugger;
	//console.log(e);
	this.props.dispatch(getnote(toQuery({
			rows: 10,
			page: 1,
			userId: this.state.userId,
			problemId: this.state.problemId,
			id: ''
		}))).then(() => {
			if (!!this.props.profile) {
				if(this.props.profile.data.length!=0){
					this.props.profile.data.map((item,index)=>{
						if(item.id == e.id){
					        if (this.state.isMounted){
					        	this.setState({
									visible: true,
									noteid: item.problemId,
									notecontent: item.text,
									notetitle: item.title,
									pid: item.id
								});
					        }
							
						}
					});
				}
			}
		});
	};

	start() {

		this.props.dispatch(deteleproblemnote(toQuery({
			pids: this.state.selectedKeys
		}))).then(() => {
			if (!!this.props.profile.code && this.props.profile.code != 'SUCCESS') {
				var code = this.props.profile.code;
				var warning = '';
				message.warning('哦哦～后端报错咯:' + code);
			} else if (!!this.props.profile.code && this.props.profile.code === 'SUCCESS') {
				message.success('删除笔记成功!');
			}
			this.props.dispatch(getnote(toQuery({
				rows: 10,
				page: 1,
				userId: this.state.userId,
				problemId: this.state.problemId,
				id: ''
			}))).then(() => {
				if (!!this.props.profile) {
					if (this.state.isMounted){
						this.setState({
							data: this.props.profile.data
						});
					}
					
				}
			})
		});
		if (this.state.isMounted){
			this.setState({
				...this.state,
				selectedKeys: ''
			});
		}	
		
	};

	handleOk(e) {
		let Note = {
				id: this.state.pid,
				title: this.state.notetitle,
				text: this.state.notecontent,
				postTime: '',
				userId: this.state.userId,
				problemId: this.state.noteid
			}
			//ProblemNote:Note
		this.props.dispatch(updataproblemnote(Note)).then(() => {
			this.props.dispatch(getnote(toQuery({
				rows: 10,
				page: 1,
				userId: this.state.userId,
				problemId: this.state.problemId,
				id: ''
			}))).then(() => {
				if (!!this.props.profile.code && this.props.profile.code != 'SUCCESS') {
					var code = this.props.profile.code;
					var warning = '';
					message.warning('哦哦～后端报错咯:' + code);
				};
				if (!!this.props.profile) {
					if (this.state.isMounted){
						this.setState({
							data: this.props.profile.data
						});
					}
					
				}
			});
			if (!!this.props.profile.code) {
				if (this.state.isMounted){
					this.setState({
						visible: false
					});
				}
				
			}
		});
	};
	handleCancel() {
		if (this.state.isMounted){
			this.setState({
				visible: false
			});
		}
		
	};
	handleInputChange1(e) {
		if (this.state.isMounted){
			this.setState({
				...this.state,
				notetitle: e.target.value,
			});
		}
		
	};
	handleInputChange2(e) {
		if (this.state.isMounted){
			this.setState({
				...this.state,
				notecontent: e.target.value,
			});
		}
		
	}
	render() {
		const columns = [{
			title: 'ID',
			dataIndex: 'problemId',
			key: 'problemId',
			render: (text, record) => (<Link to={`/problems/${record.problemId}/${-1}`}>{record.problemId}</Link>)
		}, {
			title: 'title',
			dataIndex: 'title',
			key: 'title'
		}, {
			title: 'text',
			dataIndex: 'text',
			key: 'text'
		}, {
			title: 'time',
			dataIndex: 'postTime',
			key: 'time',
			render: (text, record) => (<span>{timeFormat(record.postTime)}</span>)
		}];

		//const RowKeys=this.state.selectedRowKeys;
	    const rowSelection = { 
	       onChange: function(selectedRowKeys, selectedRows) {
	       	if (this.state.isMounted)
                this.setState({
                    ...this.state,
                    selectedKeys: selectedRowKeys.join(',')
                });
            }.bind(this),
	    };
	    let content=this.state.data;
	    var le=content.length;
		if(le!=0){
			content.map((item,index)=>{
				if(item.text.length>20){
					item.text=item.text.substring(0,20)+'...';
				}
				if(item.title.length>5){
					item.title=item.title.substring(0,5)+'...';
				}
			});
		}
		let Source;
		if (le == 0) {
			Source = null;
		} else {
			const dataSource = content.map(item => ({
				...item,
				key: item.id
			}));
			Source = dataSource;
		}

		return (
			<div className="col-22 col-offset-1">
			 	<Table columns={columns} dataSource={Source} rowSelection={rowSelection} pagination={false} onRowClick={this.showModal.bind(this)} />
			    <div styleName="deletebutton">
		          <Button type="primary" onClick={this.start.bind(this)}
		            disabled={false} 
		          >删除</Button>
		        </div>
			    <div>
			        
			        <Modal ref="modal"
                          visible={this.state.visible}
                          title="添加笔记" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>close</Button>,
                            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>submit </Button>,
                          ]}>
                          <p>title:<Input placeholder="" onChange={this.handleInputChange1.bind(this)} value={this.state.notetitle} /></p>

                          <p>text:<Input placeholder="" type="textarea"rows={8} onChange={this.handleInputChange2.bind(this)} value={this.state.notecontent} /></p>
                          
                        </Modal>
			         
			      </div>
			</div>
		);
	};
}