import React, {
    PropTypes
} from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    Table,
    Input,
    Col,
    Row,
    Button,
    Icon,
    message,
    Progress,
    Tooltip
} from 'antd';
import {
    getProblems,
} from '../../../actions/problems';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery
} from '../../../utils/utils';
const Search = Input.Search;
const InputGroup = Input.Group;
const rows = 10;
@connect(state => ({
    problems: state.problems,
    tags: state.tags,
    params: state.params,
    code: state.code,
}))
@CSSModules(styles)
export default class ProblemList extends React.Component {
    constructor() {
        super(); //调用基类的所有的初始化方法
        this.state = {
            data: '',
            ids: '',
            title: '',
            tagsName: '',
            focus: false,
            page: 1,
            source: '',
            warning: ''
        }; //初始化赋值
    };
    handleInputChange1(e) {
        this.setState({
            ...this.state,
            ids: e.target.value,
        });
    };
    handleInputChange2(e) {
        this.setState({
            ...this.state,
            title: e.target.value
        });
    };
    handleInputChange3(e) {
        this.setState({
            ...this.state,
            source: e.target.value,
        });
    };
    handleInputChange4(e) {
        this.setState({
            ...this.state,
            tagsName: e.target.value,
        });
    };
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    };
    handleSearch() {
        let config = {
            ids: this.state.ids,
            title: this.state.title,
            tagsName: this.state.tagsName,
            source: this.state.source,
            tagsReturn: 2,
            rows: rows,
            page: 1,
            showDetail: false
        };
        this.props.dispatch(getProblems(toQuery(config)));
    };
    componentDidMount() {
        this.props.dispatch(getProblems(toQuery({
            rows: rows,
            tagsReturn: 2,
            page: 1,
        }))).then(() => {
            if (!!this.props.problems.code && this.props.problems.code != 'SUCCESS') {
                var code = this.props.problems.code;
                var warning = '';
                message.warning('哦哦～后端报错咯:' + code);
            }
            if (!!this.props.params.params) {
                this.props.params.params.tagName && this.setState({
                    tagsName: this.props.params.params.tagName,
                }, () => {
                    this.handleSearch();
                });
            }
        });
    };

    componentWillUnmount() {
        this.props.params.params = '';
    };
    handleClick(e) {

    }
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
        const columns = [{
            title: 'AC',
            dataIndex: 'userAc',
            key: 'userAc',
            render: (text, record) => {
                //debugger;
                if (!!record.userAc) {
                    return <Icon type="check" />
                } else {
                    return <Icon style={{opacity:0}} type="check" />
                }
            }
        }, {
            title: '题号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                const id=this.format(record.id);
                return (<Link to={`/problems/${record.id}/${-1}`}>{id}</Link>)}
        }, {
            title: '题目',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => {
                if (!!record.tags) {
                    return <Tooltip  title={'Tags:'+record.tags}><Link to={`/problems/${record.id}/${-1}`}>{record.title}</Link></Tooltip>
                } else {
                    return <Link to={`/problems/${record.id}/${-1}`}>{record.title}</Link>
                }
            }
        }, {
            title: '难度',
            key: 'difficulty',
            render: (text, record) => (
                <Progress percent={parseInt(record.acNum/record.submitNum*100)} strokeWidth={5} status="active" />
            )
        }, {
            title: 'AC/Submit',
            key: 'AC/Submit',
            render: (text, record) => (
                <span>
                    {record.acNum} / {record.submitNum}
                </span>
            )
        }];
        let pageConfig = {
            ids: this.state.ids,
            title: this.state.title,
            tagsName: this.state.tagsName,
            tagsReturn: 2,
            rows: rows,
            page: 1
        };


        const pagination = {
            total: this.props.problems.total,
            onChange: function(cur) {
                pageConfig.page = cur;
                this.props.dispatch(getProblems(toQuery(pageConfig)));
            }.bind(this)
        };
        let dataSource = [];
        if (!!this.props.problems.problems) {
            dataSource = this.props.problems.problems.map(item => ({...item,
                key: item.id
            }));
        };
        return (
            <div styleName="wrapper" className="col-22 col-offset-1">
                <InputGroup styleName='searchbox'>
                    <Row>
                        <Col span={5}>
                            <Input placeholder={'Problem ID'} onChange={this.handleInputChange1.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)}/>
                        </Col>
                        <Col span={5}>
                            <Input placeholder={'Title'} onChange={this.handleInputChange2.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
                        </Col>
                        <Col span={5}>
                            <Input placeholder={'Source'} onChange={this.handleInputChange3.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
                        </Col>
                        <Col span={5}>
                            <Input  value={this.state.tagsName} placeholder={'Cloud'} onChange={this.handleInputChange4.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
                        </Col>
                        <Col span={2}>
                            <div className="ant-input-group-wrap">
                                <Button icon="search"  onClick={this.handleSearch.bind(this)} />
                            </div>
                        </Col>
                    </Row>
                </InputGroup>
                <Table columns={columns} dataSource={dataSource} pagination={pagination} onRowClick={this.handleClick.bind(this)} />
            </div>
        );
    }
}