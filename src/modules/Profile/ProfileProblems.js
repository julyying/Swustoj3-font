import React from 'react';
import {
	connect
} from 'react-redux';

import UserProblems from '../../components/User/UserProblems';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';

export default class ProfileProblems extends React.Component {
	constructor() {
		super();
	};

	render() {
		return (
			<div>
				<UserProblems />  
			</div>
		);
	};
}