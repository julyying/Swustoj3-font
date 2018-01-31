import React from 'react';
import CSSModules from 'react-css-modules';
import { Table, Icon, Row, Col, InputNumber, Input, Select, Button,message } from 'antd';
import {
    connect
} from 'react-redux';
import styles from './styles.scss';
import { getContestProblems } from '../../actions/problems';
import { getProblems } from '../../actions/problems';

import {
    toQuery,
    handleError
} from '../../utils/utils';

const InputGroup = Input.Group;
const Option = Select.Option;

@connect(state => ({
    problems: state.contestProblems,
    srcProblems: state.problems
}))
@CSSModules(styles)
export default class ProblemSelecter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'ids',
            page: 1,
            selectedKeys: [],
            destData: []
        };
    }

    componentDidMount() {
        this.props.dispatch(getProblems(toQuery({
            rows:10, 
            page: 1
        })));
        this.props.problemsId && this.props.dispatch(getContestProblems(toQuery({
            contestId: this.props.problemsId,
            rows: 10,
            page: 1
        }))).then(()=>{
            if(!!this.props.srcProblems.code&&this.props.srcProblems.code!='SUCCESS'){
                var code=this.props.srcProblems.code;
                message.warning('哦哦～后端报错咯:' + code);
            }
        });
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.problemsId !== this.props.problemsId) {
            this.props.dispatch(getContestProblems(toQuery({
                contestId: nextProps.problemsId,
                rows: 10,
                page: 1
            })));
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            destData: nextProps.problems && nextProps.problems.problems
        });
    }

    onScoreChange(pid, value) {
        let _destData = Object.assign([], this.state.destData);
        _destData.forEach((item, index) => {
            if(_destData[index].problemId === pid) {
                _destData[index].score = value;
            }
        });
        this.setState({
            ...this.state,
            destData: _destData
        });
    }

    removeProblem(pid) {
        let _destData = Object.assign([], this.state.destData);
        _destData.forEach((item, index) => {
            if(item.problemId === pid) {
                _destData.splice(index, 1);
            }
        });
        this.setState({
            ...this.state,
            destData: _destData
        });
    }
    
    handleSearchType(value) {
        this.setState({
            ...this.state,
            searchType: value
        });
    }

    handleSearchText(e) {
        this.setState({
            ...this.state,
            searchText: e.target.value
        });
    }

    handleSearch() {
        let config = {
            rows: 10,
            page: this.state.page
        };
        if (!!this.state.searchText) {
            config[this.state.searchType] = this.state.searchText;
        }
        this.props.dispatch(getProblems(toQuery(config)));
    }

    render() {
        let destData = [];
        let srcData = [];
 
    console.log('xxxxx', this.state.destData);

        this.state.destData.forEach((problem, index) => {
            problem.key = problem.problemId;
            destData.push(problem);
        });
        this.props.srcProblems && this.props.srcProblems.problems.forEach((problem, index) => {
            problem.key = 'src' + index;
            srcData.push(problem);
        });

        const srcCol = [
            {
                title: '题号',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            }
        ];
        const destCol = [
            {
                title: '题号',
                dataIndex: 'problemId',
                key: 'problemId'
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '分数',
                key: 'score',
                render: (text, record) => {
                    return <InputNumber min={1} value={record.score || 1} onChange={this.onScoreChange.bind(this, record.problemId)} />
                }
            },
            {
                title: '操作',
                key: 'operate',
                render: (text, record) => {
                    return <a onClick={this.removeProblem.bind(this, record.problemId)}>删除</a>
                }

            }
        ];
        let pageConfig = {
            rows: 10
        };
        const pagination = {
            total: this.props.srcProblems.total,
            onChange: function(cur) {
                this.setState({
                    ...this.state,
                    page: cur
                });
                pageConfig['page'] = cur;
                this.props.dispatch(getProblems(toQuery(pageConfig)));
            }.bind(this)
        };

        let selectIds = [];

        const rowSelection = {
            onSelect: function(record, selected, selectedRows) {
                if(selected) {
                    record.key = record.id;
                    record.problemId = record.id;
                    destData.push(record);
                } else {
                    destData.forEach((item, index) => {
                        if(item.problemId === record.id) {
                            destData.splice(index, 1);
                        }
                    });
                }
                this.setState({
                    ...this.state,
                    destData: destData
                });
                // this.props.onChange && this.props.onChange(destData);
            }.bind(this)
        };

        return (
            <div styleName="wrapper">
                <div styleName="header">
                    题库
                    <InputGroup styleName="searchbar">
                        <div styleName="wrapper">
                            <Select defaultValue="ids" styleName="select" onSelect={ this.handleSearchType.bind(this) }>
                                <Option value="ids">题号</Option>
                                <Option value="title">标题</Option>
                            </Select>
                        </div>
                        <Input styleName="input" onChange={ this.handleSearchText.bind(this) } onPressEnter={ this.handleSearch.bind(this) } />
                        <div styleName="wrapper">
                            <Button icon="search" styleName="btn" onClick={ this.handleSearch.bind(this) } />
                        </div>
                    </InputGroup>
                </div>
                <Table columns={srcCol} selectedRowKeys={[0, 2]} rowSelection={rowSelection} dataSource={srcData} pagination={pagination} />
                <div styleName="header">
                    比赛题目
                </div>
                <Table columns={destCol} dataSource={destData} pagination={false} ref="xxx"/>
            </div>
        );
    }
}