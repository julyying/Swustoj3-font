import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Table,
	Select,
	Input,
	Col,
	Row,
	Button
} from 'antd';
import {
	getStatus
} from '../../actions/status';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import customStyles from './custom.css';
import {
	toQuery,
	timeFormat
} from '../../utils/utils';
import classNames from 'classnames';
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const rows = 10;

const compiler = [
	'gcc',
	'g++',
	'java',
	'Pascal',
	'Python',
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
export default class Status extends React.Component {
	constructor() {
		super(); //调用基类的所有的初始化方法
		this.state = {
			result: '',
			compiler: '',
			username: '',
			problemID: '',
			contestId: '',
			focus: false,
			page: 1,
		}; //初始化赋值
	};

	componentDidMount() {
		if (!!this.props.contestId) {
			this.setState({
				contestId: this.props.contestId
			});
			this.props.dispatch(getStatus(toQuery({
				rows: 10,
				page: 1,
				contestId: this.props.contestId
			})));
		}
	}
	handleChangeS1(value) {
		this.setState({
			...this.state,
			result: value

		});
	}
	handleChangeS2(value) {
		this.setState({
			...this.state,
			compiler: value

		});
	}
	handleInputChange1(e) {
		this.setState({
			...this.state,
			username: e.target.value,
		});
	};
	handleInputChange2(e) {
		this.setState({
			...this.state,
			problemID: e.target.value,
		});
	};
	handleFocusBlur(e) {
		this.setState({
			focus: e.target === document.activeElement,
		});
	};
	handleSearch() {
		let config = {
			status: this.state.result,
			compilerId: this.state.compiler,
			username: this.state.username,
			problemId: this.state.problemID,
			rows: rows,
			page: this.state.page,
			contestId: this.state.contestId
		}
		this.props.dispatch(getStatus(toQuery(config)));
	};
	render() {
		const status_style = [
			'status_gray',
			'status_green',
			'status_blue',
			'status_yellow',
			'status_yellow',
			'status_red',
			'status_red',
			'tatus_black',
			'status_red',
			'status_blue',
			'status_blue'
		];
		const columns = [{
			title: 'Run ID',
			dataIndex: 'id',
			key: 'id'
		}, {
			title: 'Problem ID',
			dataIndex: 'problemId',
			key: 'problemId',
			render: (text, record) => {
				return <Link to={`/Problems/${record.problemId}/${this.props.contestId}`}>{record.problemId}</Link>
			}
		}, {
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			render: (text, record) => (<Link to={`/ranklist/${record.userId}/${record.username}`}>{record.username}</Link>)
		}, {
			title: 'Result',
			dataIndex: 'status',
			key: 'status',
			render: (text, record) => {
				if (record.status == 7 && !!localStorage.userId && (localStorage.roleId == 1 || localStorage.roleId == 2 || localStorage.roleId == 3)) {
					var id = record.id;
					var params = 2;
					var contestId = this.props.contestId;
					return (<Link to = {`/source/${id}/${params}/${contestId}`} ><Button className={status_style[record.status+1]}>{result[record.status+1]}</Button></Link>);
				} else if (record.status == 7 && !!localStorage.userId && record.userId == localStorage.userId) {
					var id = record.id;
					var params = 2;
					var contestId = this.props.contestId;
					return (<Link to = {`/source/${id}/${params}/${contestId}`} > <Button className={status_style[record.status+1]}>{result[record.status+1]}</Button></Link>);
				} else {
					return <Button className={status_style[record.status+1]}>{result[record.status+1]}</Button>
				}
			}
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
				if (!!localStorage.userId && (localStorage.roleId == 1 || localStorage.roleId == 2 || localStorage.roleId == 3)) {
					var id = record.id;
					var params = 1;
					var contestId = this.props.contestId;
					return (<Link to = {`/source/${id}/${params}/${contestId}`} > <span>{compiler[record.compilerId-1]}</span></Link>);
				} else if (!!localStorage.userId && record.userId == localStorage.userId) {
					var id = record.id;
					var params = 1;
					var contestId = this.props.contestId;
					return (<Link to = {`/source/${id}/${params}/${contestId}`} > <span>{compiler[record.compilerId-1]}</span></Link>);
				} else {
					return <span>{compiler[record.compilerId-1]}</span>;
				}
			}
		}, {
			title: 'Lenght[B]',
			dataIndex: 'codeLength',
			key: 'codeLength'
		}, {
			title: 'Submit Time',
			dataIndex: 'submitTime',
			key: 'submitTime',
			render: (submitTime) => (
				<span>{timeFormat(submitTime)}</span>
			)
		}];
		const dataSource = this.props.status.status.map(item => ({...item,
			key: item.id
		}));
		let pageConfig = {
			rows: 10,
			page: 1,
			status: this.state.result,
			compilerId: this.state.compiler,
			username: this.state.username,
			problemId: this.state.problemID,
			contestId: this.state.contestId
		};
		const pagination = {
			total: this.props.status.total,
			onChange: function(cur) {
				pageConfig.page = cur;
				this.props.dispatch(getStatus(toQuery(pageConfig)));
			}.bind(this)
		};
		return (
			<div styleName='wrapper' style={customStyles}>
					<InputGroup styleName='searchbox'>
						<Row>
							<Col span={12}>
								<Select defaultValue="Result" style={{ width: 156 }}  onSelect={this.handleChangeS1.bind(this)} >
							      <Option value="">Result</Option>
							      <Option value="-1">Waiting</Option>
							      <Option value="0">Accepted</Option>
							      <Option value="1">Presentation Error</Option>
							      <Option value="2">Time Limit Exceeded</Option>
							      <Option value="3">Memory Limit Exceeded</Option>
							      <Option value="4">Wrong Answer</Option>
							      <Option value="5">Runtime Error</Option>
							      <Option value="6">Output Limit Exceeded</Option>
							      <Option value="7">Compile Error</Option>
							      <Option value="8">System Error</Option>
							      <Option value="9">Security error</Option>
							    </Select>
						   
							    <Select defaultValue="Compiler" style={{ width: 156 }} onSelect={this.handleChangeS2.bind(this)} >
							      <Option value="">Compiler</Option>
							      <Option value="1">{compiler[0]}</Option>
							      <Option value="2">{compiler[1]}</Option>
							      <Option value="3">{compiler[2]}</Option>
							      <Option value="4">{compiler[3]}</Option>
							      <Option value="5">{compiler[4]}</Option>
							    </Select>
						    </Col>
						    <Col span={5}>
						    	<Input placeholder={'Username'} onChange={this.handleInputChange1.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)}/>
						    </Col>
						    <Col span={5}>
						    	<Input placeholder={'Problem ID'} onChange={this.handleInputChange2.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
						    </Col>
						    <Col span={2}>
		          				<div className="ant-input-group-wrap">
									<Button icon="search"  onClick={this.handleSearch.bind(this)} />
		          				</div>
						    </Col>
						</Row>
					</InputGroup>
					<Table columns={columns} dataSource={dataSource} pagination={pagination}></Table>
				</div>
		);
	};
}