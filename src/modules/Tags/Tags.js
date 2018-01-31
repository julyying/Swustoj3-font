import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Tag,
	Col,
	Row,
} from 'antd';
import {
	tagsToProblems
} from '../../actions/jumpPage';
import {
	getTagsAll
} from '../../actions/tags';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import TagChart from './TagChart';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
@connect(state => ({
	tags: state.tags
}))
@CSSModules(styles)
export default class Tags extends React.Component {
	constructor() {
		super();
	};
	componentDidMount() {
		this.props.dispatch(getTagsAll(toQuery({
			page: 1,
			rows: 22
		})));
	};

	render() {
		var dispalyChart = () => {
			if (!!this.props.tags.tagss.length) {
				return (<TagChart  data={this.props.tags.tagss}/>)
			}
		}
		return (
			<div styleName='tagsWrap' className="col-22 col-offset-1">
				{dispalyChart()}
			</div>
		);
	};
}