import React, {
	PropTypes
} from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import styles from './styles.scss';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import {
	Col,
	Row,
} from 'antd';
import {
	hashHistory
} from 'react-router';

@CSSModules(styles)
export default class Head extends React.Component {
	render() {
		return (
			<div className="col-22 col-offset-1" styleName="acmicon">
	           <img alt="top" src="http://192.168.0.27:8888/group1/M01/00/21/wKgAG1k8m9yADmO5AAHIjndG_Vc790.png" />
	        </div>
		);
	};
}