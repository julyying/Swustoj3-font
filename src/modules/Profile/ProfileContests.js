import React from 'react';
import {
	connect
} from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import UserContests from '../../components/User/UserContests';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
@CSSModules(styles)
export default class ProfileContests extends React.Component {
	constructor() {
		super();
	};

	render() {

		return (
			<div className="col-offset-1">
			 	<UserContests />
			</div>
		);
	};
}