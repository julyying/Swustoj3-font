import React, {
	PropTypes
} from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Table,
	Input,
	Button,
	Row,
	Col
} from 'antd';
const Search = Input.Search;
import {
	getUsers,
	getUsersByTime
} from '../../../actions/ranklist';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../../utils/utils';
import configsSource from '../../../constants/configsSource';
import classNames from 'classnames';
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;
const rows = 10;
const baseUrl = configsSource.baseUrl;

@connect(state => ({
	users: state.users
}))
@CSSModules(styles)
export default class RankList extends React.Component {
	constructor() {
		super(); //调用基类的所有的初始化方法
		this.state = {
			value: '',
			timeType: '',
			focus: false,
			page: 1,
			btn1: 'ghost',
			btn2: 'ghost',
			btn3: 'ghost',
			btn4: 'primary',
		}; //初始化赋值
	};
	componentDidMount() {
		this.props.dispatch(getUsers(toQuery({
			rows: rows,
			page: 1,
			sortByAcNum: true
		})));
	};


	handleInputChange(e) {
		this.setState({
			...this.state,
			value: e.target.value,
		});
	};
	handleFocusBlur(e) {
		this.setState({
			focus: e.target === document.activeElement,
		});
	};
	handleChooseTime(value) {
		this.setState({
			...this.state,
			timeType: value,
		});
		let config = {
			timeType: value,
			rows: rows,
			page: this.state.page,
		}
		if (!!value) {
			this.props.dispatch(getUsersByTime(toQuery(config)));
		} else {
			let config = {
				rows: rows,
				page: this.state.page,
				sortByAcNum: true,
			}
			this.props.dispatch(getUsers(toQuery(config)));
		}
		this.setState({
			btn1: 'ghost',
			btn2: 'ghost',
			btn3: 'ghost',
			btn4: 'ghost',
		});
		if (value === 1) {
			this.setState({
				btn1: 'primary',
			});
		} else if (value === 2) {
			this.setState({
				btn2: 'primary',
			});
		} else if (value === 3) {
			this.setState({
				btn3: 'primary',
			});
		} else {
			this.setState({
				btn4: 'primary',
			});
		}
	}
	handleSearch() {
		let config = {
			username: this.state.value,
			rows: rows,
			page: this.state.page,
			sortByAcNum: true,
		}
		this.props.dispatch(getUsers(toQuery(config)));
	};

	returnFloat = (text, record) => {
		if (!!record.acNum) {
			var value = Math.round(record.acNum / record.submitNum * 10000) / 100.00;
			var str = value.toString().split('.');
			if (str.length == 1) {
				value = value.toString() + ".00";
				return value;
			}
			if (str.length > 1) {
				if (str[1].length < 2) {
					value = value.toString() + "0";
				}
				return value;
			}
		} else {
			return '0.00';
		}

	};
	render() {
		const btnCls = classNames({
			'ant-search-btn': true,
			'ant-search-btn-noempty': !!this.state.value.trim(),
		});
		const searchCls = classNames({
			'ant-search-input': true,
			'ant-search-input-focus': this.state.focus,
		});
		let rank = 0;
		let pageConfig = {
			rows: rows,
			page: 1,
			sortByAcNum: true,
			username: this.state.value,
			timeType: this.state.timeType,
		};
		let pageConfig1 = {
			rows: rows,
			page: 1,
			timeType: this.state.timeType,
		};
		const pagination = {
			total: this.props.users.total,
			onChange: function(cur) {
				pageConfig.page = cur;
				pageConfig1.page = cur;
				if (!!this.state.timeType) {
					this.props.dispatch(getUsersByTime(toQuery(pageConfig1)));
				} else {
					this.props.dispatch(getUsers(toQuery(pageConfig)));
				}
			}.bind(this)
		}
		const columns = [{
			title: '排名',
			dataIndex: 'rank',
			key: 'rank',

		}, {
			title: '头像',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (text, record) => ( < img styleName = 'facePhoto'
				src = {
					baseUrl + record.avatar
				}
				alt = "头像" / >
			)
		}, {
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
			render: (text, record) => (<Link to={`/ranklist/${record.id}/${record.username}`}>{record.username}</Link>)
		}, {
			title: '个性签名',
			dataIndex: 'sign',
			key: 'sign',
		}, {
			title: 'AC数',
			dataIndex: 'acNum',
			key: 'acNum',
		}, {
			title: '提交量',
			dataIndex: 'submitNum',
			key: 'submitNum',
		}, {
			title: '正确率',
			dataIndex: 'ratio',
			key: 'ratio',
			render: (text, record) => (
				<span>{this.returnFloat(text, record)}%</span>
			)
		}];
		const dataSource = this.props.users.users.map(item => ({...item,
			key: item.id
		}));
		return (
			<div styleName='wrapper' className='col-22 col-offset-1 ant-layout-content'>
				<Row>
					<Col span={8} >
						<InputGroup className={searchCls} styleName='searchBox' style={{ width: 400 }}> 
		          			<Input placeholder={'用户名'} value={this.state.value} onChange={this.handleInputChange.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)}  onPressEnter={this.handleSearch.bind(this)} />
		          			<div className="ant-input-group-wrap">
								<Button icon="search" className={btnCls}  onClick={this.handleSearch.bind(this)} />
		          			</div>
		        		</InputGroup>
	        		</Col>
	        		<Col span={5} offset={11}>
		        		<ButtonGroup >
						    <Button type={this.state.btn1} onClick={this.handleChooseTime.bind(this, 1)}>日</Button>
						    <Button type={this.state.btn2} onClick={this.handleChooseTime.bind(this, 2)}>周</Button>
						    <Button type={this.state.btn3} onClick={this.handleChooseTime.bind(this, 3)}>月</Button>
						    <Button type={this.state.btn4} onClick={this.handleChooseTime.bind(this, '')}>所有</Button>
					    </ButtonGroup>
				    </Col>
			    </Row>
				<Table styleName='RankList' columns={columns} dataSource={dataSource} pagination={pagination} />
			</div>
		);
	};
}