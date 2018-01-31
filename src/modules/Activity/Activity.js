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
} from 'antd';
import {
	getUsers,
	getUsersByTime
} from '../../actions/ranklist';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../utils/utils';
import configsSource from '../../constants/configsSource';
import classNames from 'classnames';

@CSSModules(styles)
export default class Activity extends React.Component {
	constructor() {
		super(); //调用基类的所有的初始化方法
		this.state = {}; //初始化赋值
	};
	componentDidMount() {};

	render() {
		return (
		<div className='col-15 col-offset-9'>
				活动,啦啦啦
			</div>
		);
	};
}