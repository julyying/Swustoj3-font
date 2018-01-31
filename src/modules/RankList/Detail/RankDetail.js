import React, {
	PropTypes
} from 'react';
import UserInfo from './UserInfo';
import UserProblems from '../../../components/User/UserProblems';
import UserContests from '../../../components/User/UserContests';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import classNames from 'classnames';
@CSSModules(styles)
export default class RankDetial extends React.Component {
	constructor() {
		super();
	};
	render() {
		return (
			<div styleName='wrapper' className='col-22 col-offset-1'> 
				<div styleName='title'>{this.props.params.username}的个人主页</div>
				<UserInfo userId={this.props.params.id} />
				<div styleName='userProblems'  className='col-20 col-offset-2 rel'>
					<div styleName='badge'>做题战绩</div>
					<UserProblems userId={this.props.params.id} />
				</div>
				<div styleName='userContests' className='col-20 col-offset-2 rel'>
					<div styleName='badge'>比赛战绩</div>
					<UserContests userId={this.props.params.id} />
				</div>
			</div>
		);
	};
}