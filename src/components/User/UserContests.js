import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Link
} from 'react-router';
import {
	getOwnContests
} from '../../actions/profile';
import {
	Table
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery,
	timeFormat
} from '../../utils/utils';
import classNames from 'classnames';
const status = [
	'Running',
	'Pending',
	'Ended'
];
@connect(state => ({
	profile: state.profile
}))
@CSSModules(styles)
export default class UserContests extends React.Component {
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
		this.props.dispatch(getOwnContests(toQuery({
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
		}
	};

	render() {
		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: (text, record) => (<Link to={`/contests/detail/${record.contest.id}`}>{record.contest.id}</Link>)
		}, {
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			render: (text, record) => (<Link to={`/contests/detail/${record.contest.id}`}>{record.contest.title}</Link>)
		}, {
			title: 'Type',
			dataIndex: 'isContest',
			key: 'isContest',
			render: (text, record) => {
				return record.contest.isContest == true ? <span>Contest</span> : <span>Experiment</span>
			}
		}, {
			title: 'StartTime',
			dataIndex: 'startTime',
			key: 'startTime',
			render: (text, record) => (
				<span>{timeFormat(record.contest.startTime)}</span>
			)
		}, {
			title: 'EndTime',
			dataIndex: 'endTime',
			key: 'endTime',
			render: (text, record) => (
				<span>{timeFormat(record.contest.endTime)}</span>
			)
		}, {
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (text, record) => {
				return <span>{status[record.contest.status]}</span>;
			}
		}, {
			title: 'TotalScore',
			dataIndex: 'totalScore',
			key: 'totalScore',
			render: (text, record) => {
				return <span>{record.contest.totalScore}</span>;
			}
		}, {
			title: 'CurrSocre',
			dataIndex: 'currSocre',
			key: 'currSocre',
			render: (text, record) => {
				return <span>{record.currSocre}</span>;
			}
		}];
		let dataSource = [];
		if (!!this.props.profile.contests) {
			dataSource = this.props.profile.contests.map((item, index) => ({...item,
				key: item.contest.id
			}));
		}
		return (
			<div>
				<Table columns={columns} dataSource={dataSource}></Table>
			</div>
		);
	};
}