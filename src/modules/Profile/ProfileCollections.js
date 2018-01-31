import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Link
} from 'react-router';
import {
	Tag,
	Row,
	Col,
	Icon
} from 'antd';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
import styles from './styles.scss';
import CSSModules from 'react-css-modules';
import {
	getOwnCollection
} from '../../actions/profile';
@connect(state => ({
	profile: state.profile
}))
@CSSModules(styles)
export default class ProfileCollections extends React.Component {
	constructor() {
		super();
		this.state = {
			userId: '',
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
		this.props.dispatch(getOwnCollection(toQuery({
			userId: id
		})));
	};

	format(id) {
		let newStr = '';
		id = id.toString();
		if (id.length < 4) {
			newStr = newStr.concat('000', id);
			if (newStr.length >= 4) {
				return newStr.substring(newStr.length - 4, newStr.length);
			}
		} else {
			return id;
		}
	}
	render() {
		var displayCollections = () => {
			if (!!this.props.profile.collections) {
				if (this.props.profile.collections.length > 0) {
					let Collections = [];
					this.props.profile.collections.map((item, index) => {
						Collections.push(
							<Link key={index} to = {`/problems/${item.problemId}/${-1}`}>
								<Tag color="blue">
									{this.format(item.problemId)+item.title}
								</Tag>
							</Link>
						);
					});
					return (
						<div styleName='Collections'>
							<div styleName='title'>我收藏的题目</div>
							<div styleName='content'>{Collections}</div>
						</div>);
				} else {
					return (
						<div styleName='Collections'>
							<div styleName='title'>我收藏的题目</div>
							<div styleName='smileWrap'><div styleName='smile'><Icon type="smile" />快去收藏题目吧</div></div>
					</div>);
				}
			}
		};
		return (
			<div styleName='Collections'>
				{displayCollections()}
			</div>
		);
	};
}