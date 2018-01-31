import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Link
} from 'react-router';
import {
	Tag,
	Icon
} from 'antd';
import {
	getOwnAc,
	getOwnChallenging
} from '../../actions/profile';
import {
	getUser,
} from '../../actions/users';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../utils/utils';
import UserProblemsChart from './UserProblemsChart';
import classNames from 'classnames';
@connect(state => ({
	profile: state.profile,
	user:state.user,
}))
@CSSModules(styles)
export default class UserProblems extends React.Component {
	constructor() {
		super();
		this.state = {
			userId: '',
			rawData: {},
			rank:0,
			challengeNum:0,
			acNum:0,
		}
	};

	componentDidMount() {
		let id = '';
		if (!!this.props.userId) {
			id = this.props.userId;
			this.setState({
				userId: this.props.userId
			});
		} else if (!!localStorage.userId) {
			id = localStorage.userId;
			this.setState({
				userId: localStorage.userId
			});
		}
		this.props.dispatch(getOwnAc(toQuery({
			userId: id
		})));

		this.props.dispatch(getOwnChallenging(toQuery({
			userId: id
		})));

		this.props.dispatch(getUser(toQuery({
			ids:id,
			page:1,
			rows:1
		}))).then(()=>{
			this.setState({
				acNum:this.props.user.data.acNum,
				rank:this.props.user.data.rank,
				challengeNum:this.props.user.data.challengeNum,
			});
		});
	};

	format(id) {
		let newStr = '';
		id = id.toString();
		if (id.length < 4) {
			newStr = newStr.concat('000', id);
			if (newStr.length >= 4) {
				return newStr.substring(newStr.length - 4, newStr.length);
			}
		}
	};

	render() {


		var displayChallenging = () => {
			//debugger;
			if (!!this.props.profile.challenging) {
				if (!!this.props.profile.challenging && this.props.profile.challenging.length > 0) {
					let Challenging = [];
					this.props.profile.challenging.map((item, index) => {
						Challenging.push(
							<Link key={index} to = {`/problems/${item.problemId}/${-1}`}>
								<Tag color="red">
									{item.title}
								</Tag>
							</Link>
						);
					});
					return (
						<div styleName='Challenging'>
							<div styleName='title'>正在挑战的题目({this.state.challengeNum})</div>
							<div styleName='content'>{Challenging}</div>
						</div>);
				} else {
					return (
						<div styleName='Challenging'>
							<div styleName='title'>正在挑战的题目({this.state.challengeNum})</div>
							<div styleName='smileWrap'><div styleName='smile'><Icon type="smile" />问题都解决了哦</div></div>
					</div>);
				}
			}

		};
		var dispalyChart = () => {
			if (!!this.props.profile.ac) {
				return (<UserProblemsChart rawData={this.props.profile.ac} acNum={this.state.acNum} rank={this.state.rank}/>)
			}
		}

		return (
			<div>
				{displayChallenging()}
				{dispalyChart()}		
			</div>
		);
	};
}