import React from 'react';

import {
	connect
} from 'react-redux';
import {
	getUser
} from '../../../actions/users';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../../utils/utils';
import configsSource from '../../../constants/configsSource';
import classNames from 'classnames';
import {
	Modal
} from 'antd';
const baseUrl = configsSource.baseUrl;

@connect(state => ({
	user: state.user
}))
@CSSModules(styles)
export default class UserInfo extends React.Component {
	constructor() {
		super(); //调用基类的所有的初始化方法
		this.state = {
			avatar: '',
			userId: '',
			username: '',
			email: '',
			school: '',
			institution: '',
			studentClass: '',
			phoneNumber: '',
			qq: '',
			studentId: '',
			sign: '',
			rank: '',
			acNum: undefined,
			visible: false
		}; //初始化赋值
	};
	componentDidMount() {
		this.setState({
			userId: this.props.userId,
		});
		this.props.dispatch(getUser(toQuery({
			ids: this.props.userId,
			page: 1,
			rows: 1
		}))).then(() => {
			var user = this.props.user.data;
			if (!!user) {
				this.setState({
					...this.state,
					avatar: user.avatar,
					username: user.username,
					email: user.email,
					school: user.school,
					institution: user.institution,
					studentClass: user.studentClass,
					phoneNumber: user.phoneNumber,
					qq: user.qq,
					studentId: user.studentId,
					sign: user.sign,
					rank: user.rank,
					acNum: user.acNum
				});
			}

		});
	};
	handleCancel(e) {
		this.setState({
			visible: false
		});
	};
	handleClick() {
		this.setState({
			visible: true
		});
	};
	render() {
		return (
			<div styleName='userInfo' className='col-20 col-offset-2  rel'>
				<div styleName='badge'>基本信息</div>
				<div styleName='userImg' onClick={this.handleClick.bind(this)}><img src={baseUrl+this.state.avatar} /></div>
				<div styleName='userOther'>
					<span>账号：</span><span styleName='content'>{this.state.username}</span>
					<span>学校：</span><span styleName='content'>{this.state.school}</span>
					<span>班级：</span><span styleName='content'>{this.state.studentClass}</span>
					<hr />
					<span>学号：</span><span styleName='content'>{this.state.studentId}</span>
					<span>学院：</span><span styleName='content'>{this.state.institution}</span>
					<span>手机号：</span><span styleName='content'>{this.state.phoneNumber}</span>
					<hr />
					<span>QQ：</span><span styleName='content'>{this.state.qq}</span>
					<span>排名：</span><span styleName='content'>{this.state.rank}</span>
					<span>AC数量：</span><span styleName='content'>{this.state.acNum}</span>
				</div>
				<Modal visible={this.state.visible} styleName="priview" footer={null} onCancel={this.handleCancel.bind(this)}>
					<div styleName='priviewImg'>
						<img src={baseUrl+this.state.avatar} />
					</div>
				</Modal>
			</div>
		);
	};
}