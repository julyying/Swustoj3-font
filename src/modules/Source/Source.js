import React from 'react';
import {
	Table,
	Button,
	Icon
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import classNames from 'classnames';
import Codemirror from 'react-codemirror';
import {
	connect
} from 'react-redux';
import {
	getCode,
	getStatus
} from '../../actions/status';
import {
	toQuery
} from '../../utils/utils';
import {
	Link
} from 'react-router';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/3024-day.css'
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import customStyles from './custom.css';
const compiler = [
	'gcc',
	'g++',
	'java',
	'Pascal',
	'Python'
];
const result = [
	'Waiting',
	'Accepted',
	'Presentation Error',
	'Time Limit Exceeded',
	'Memory Limit Exceeded',
	'Wrong Answer',
	'Runtime Error',
	'Output Limit Exceeded',
	'Compile Error',
	'System Error',
	'Security error'
];

@connect(state => ({
	status: state.status
}))
@CSSModules(styles)
export default class Source extends React.Component {

	constructor() {
		super();
		this.state = {
			code: undefined,
			error: undefined
		}
	};
	componentDidMount() {
		if (!!this.props.params.contestId && !!this.props.params.id) {
			this.props.dispatch(getStatus(toQuery({
				rows: 10,
				page: 1,
				contestId: this.props.params.contestId,
				ids: this.props.params.id
			})));
		}
		if (!!this.props.params.id && !!this.props.params.params) {
			let config = {};
			if (this.props.params.params == 1) {
				config = {
					isSource: true,
					isErrMsg: false,
					submitId: this.props.params.id
				};
				this.props.dispatch(getCode(toQuery(config))).then(() => {
					if (!!this.props.status.source) {
						this.setState({
							code: this.props.status.source.source
						});
					}
				});
			} else {
				config = {
					isSource: false,
					isErrMsg: true,
					submitId: this.props.params.id
				};
				this.props.dispatch(getCode(toQuery(config))).then(() => {
					if (!!this.props.status.source) {
						this.setState({
							error: this.props.status.source.errorMsg
						});
					}
				});
			}
		}
	};
	render() {
		const columns = [{
			title: 'Problem ID',
			dataIndex: 'problemId',
			key: 'problemId',
			render: (text, record) => {
				return <Link to={`/Problems/${record.problemId}/${this.props.params.contestId}`}>{record.problemId}</Link>
			}
		}, {
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			render: (text, record) => (<Link to={`/ranklist/${record.userId}/${record.username}`}>{record.username}</Link>)
		}, {
			title: 'Memory[KB]',
			dataIndex: 'memoryUsed',
			key: 'memoryUsed'
		}, {
			title: 'Time[MS]',
			dataIndex: 'timeUsed',
			key: 'timeUsed'
		}, {
			title: 'Compiler',
			dataIndex: 'compilerId',
			key: 'compilerId',
			render: (text, record) => {
				return <span>{compiler[record.compilerId-1]}</span>;
			}
		}, {
			title: 'Result',
			dataIndex: 'status',
			key: 'status',
			render: (text, record) => {
				return <span>{result[record.status+1]}</span>
			}
		}];
		let options1 = {
			lineNumbers: true,
			mode: this.state.mode,
			theme: 'monokai',
			readOnly: true,
		};
		let options2 = {
			lineNumbers: true,
			mode: this.state.mode,
			theme: '3024-day',
			readOnly: true,
		};
		const dataSource=[];
		if(!!this.props.status.status[0]){
			const indexData = this.props.status.status[0];
			dataSource.push(indexData);
		}
		let display = () => {
			//debugger;
			if (!!this.props.status.source) {
				if (!!this.state.code) {
					//debugger;
					return (<Codemirror options={options1} value={ this.state.code }/>);
				} else if (!!this.state.error) {
					return (<div><Codemirror options={options2} value={this.state.error}/></div>);
				}
			}
		};

		return (
			<div styleName="wrapper"  className='col-22 col-offset-1 m-source-wrapper' style={customStyles}>
				<div styleName="status">
					<Table columns={columns} dataSource={dataSource} pagination={false}></Table>
				</div>
				<div className='col-3' styleName="go_back">
					<Link to="/status"><Button><Icon type="left" />Go back</Button></Link> 
      			</div>
				<div className='col-24' styleName="code">{display()}</div>
			</div>
		);
	};
}