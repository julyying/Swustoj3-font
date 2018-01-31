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
	message,
	Icon,
	Popover,
	Button
} from 'antd';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
import {
	getOwnCollection
} from '../../actions/profile';
import {
	getOwnTag,
	addTags,
	deleteTag,
} from '../../actions/tags';
import styles from './styles.scss';
import CSSModules from 'react-css-modules';
@connect(state => ({
	tags: state.tags
}))
@CSSModules(styles)
export default class ProfileTags extends React.Component {
	constructor() {
		super();
		this.state = {
			userId: null,
			myTags: [],
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
		this.props.dispatch(getOwnTag(toQuery({
			userId: id
		}))).then(() => {});
	};
	handleDelete(tids, e) {
		this.props.dispatch(deleteTag(toQuery({
			tids: tids
		}))).then(() => {
			if (!!this.props.tags.code && this.props.tags.code != 'SUCCESS') {
				var code = this.props.tags.code;
				var warning = '';
				message.warning('哦哦～后端报错咯:' + code);
			};
			if (this.props.tags.delecode === 'SUCCESS') {
				this.props.dispatch(getOwnTag(toQuery({
					userId: this.state.userId
				}))).then(() => {
					message.success('删除标签成功');
				});
			}
		});
	};
	render() {
		var displayTags = () => {
			if (!!this.props.tags.owntags) {
				this.state.myTags = [];
				if (Object.keys(this.props.tags.owntags).length > 0) {
					for (var Key in this.props.tags.owntags) {
						var str = Key;
						var index = str.indexOf('name=');
						str = str.substr(index + 5);
						str = str.substring(0, str.length - 1);
						var tids = Key;
						index = tids.indexOf("id=");
						var index2 = tids.indexOf(",");
						tids = tids.substring(index + 3, index2);
						if (!!this.props.tags.owntags[Key]) {
							const item = this.props.tags.owntags[Key];
							this.state.myTags.push(
								<Tag key={tids+item[0].title} styleName="green_tag">
								<Link  to = {`/problems/${item[0].problemId}/${-1}`} styleName="green_tag">
								{str}({item[0].title})
								</Link>
								<Icon type="cross" styleName="green_tag" onClick={this.handleDelete.bind(this,tids)}/>
							</Tag>
							);
						}
					}
					return (
						<div styleName='Tags'>
							<div styleName='title'>我添加的标签</div>
							<div styleName='content'>{this.state.myTags}</div>
						</div>);
				} else {
					return (<div styleName='Tags'>
							<div styleName='title'>我添加的标签</div>
							<div styleName='smileWrap'><div styleName='smile'><Icon type="smile" />快去添加标签吧</div></div>
					</div>);
				}
			}
		}
		return (
			<div>
				{displayTags()}
			</div>
		);
	};
}