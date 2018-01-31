import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Link
} from 'react-router';
import {
	Timeline,
	Icon,
	message
} from 'antd';
import {
	getRoad
} from '../../actions/profile';
/*import {
	jwtExpire
} from '../../actions/code';*/
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery,
	timeFormat
} from '../../utils/utils';
import classNames from 'classnames';
@connect(state => ({
	profile: state.profile
}))
@CSSModules(styles)
export default class ProfileRoad extends React.Component {
	constructor() {
		super();
	};

	componentDidMount() {
		this.props.dispatch(getRoad(toQuery({
			status: 0
		}))).then(() => {
			if (!!this.props.profile.code && this.props.profile.code != 'SUCCESS') {
				var code = this.props.profile.code;
				message.warning('哦哦～后端报错咯:' + code);
			}
		});
	};

	render() {
		const road = [];
		if (!!this.props.profile.road) {
			this.props.profile.road.map((item, index) => {
				road.push(<Timeline.Item key={index}>{timeFormat(item.submitTime)} AC第<span styleName='num'>{item.num}</span>题  <Link to={`/problems/${item.problemId}/${-1}`}>{item.problemTitle}</Link></Timeline.Item>);
			});
		}
		return (
			<div className=' col-offset-2'>
			 	<Timeline pending={<Link to={`/problems`}>继续挑战</Link>}>
			 		{road}
			 	</Timeline>
			</div>
		);
	};
}