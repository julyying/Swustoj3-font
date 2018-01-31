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
    Select,
    Input,
    Col,
    Row,
    Button,
    Tabs
} from 'antd';
import {
    getContests
} from '../../../actions/contests';
import {
    getAllContest
} from '../../../actions/news';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery,
    timeFormat
} from '../../../utils/utils';
import classNames from 'classnames';
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const rows = 10;
const TabPane = Tabs.TabPane;
const status = [
    'Running',
    'Pending',
    'Ended'
];
@connect(state => ({
    contests: state.contests,
    news:state.news,
}))
@CSSModules(styles)
export default class Contests extends React.Component {
        constructor() {
            super(); //调用基类的所有的初始化方法
            this.state = {
                focus: false,
                page: 1,
                isContest: '',
                status: '',
                isPrivate: '',
                title: '',
                holder: '',
                isBeginner: ''
            }; //初始化赋值
        };

        componentDidMount() {
            this.props.dispatch(getContests(toQuery({
                rows: 10,
                page: 1
            })));
            this.props.dispatch(getAllContest(toQuery({
                rows: 10,
                page: 1
            }))).then(()=>{
            });
        };

        handleChangeS1(value) {
            this.setState({
                ...this.state,
                isContest: value
            });
        };
        handleChangeS2(value) {
            this.setState({
                ...this.state,
                status: value
            });
        };
        handleChangeS3(value) {
            this.setState({
                ...this.state,
                isPrivate: value
            });
        };
        handleInputChange1(e) {
            this.setState({
                ...this.state,
                title: e.target.value,
            });
        };
        handleInputChange2(e) {
            this.setState({
                ...this.state,
                holder: e.target.value,
            });
        };
        handleFocusBlur(e) {
            this.setState({
                focus: e.target === document.activeElement,
            });
        };
        handleSearch() {
            let config = {
                status: this.state.status,
                isContest: this.state.isContest,
                isPrivate: this.state.isPrivate,
                title: this.state.title,
                holder: this.state.holder,
                rows: rows,
                page: this.state.page,
                isBeginner: this.state.isBeginner
            }
            this.props.dispatch(getContests(toQuery(config)));
        };
        handleChange(e) {
            if (e == '.$1') {
                this.setState({
                    isContest: 1,
                    isBeginner: ''
                }, () => {
                    this.handleSearch()
                });
            } else if (e == '.$2') {
                this.setState({
                    isContest: 0,
                    isBeginner: ''
                }, () => {
                    this.handleSearch()
                });
            } else if (e == '.$3') {
                this.setState({
                    isBeginner: 1,
                    isContest: ''
                }, () => {
                    this.handleSearch()
                });
            }
        };

        render() {
            const columns = [{
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: (text, record) => (<Link to={`/contests/detail/${record.id}`}>{record.id}</Link>)
            }, {
                title: '比赛题目',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => (<Link to={`/contests/detail/${record.id}`}>{record.title}</Link>)
            }, {
                title: '类型',
                dataIndex: 'isContest',
                key: 'isContest',
                render: (text, record) => {
                    return record.isContest == true ? <span>Contest</span> : <span>Experiment</span>
                }
            }, {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                render: (text, record) => (
                    <span>{timeFormat(record.startTime)}</span>
                )
            }, {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
                render: (text, record) => (
                    <span>{timeFormat(record.endTime)}</span>
                )
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    return <span>{status[record.status]}</span>;
                }
            }, {
                title: '范围',
                dataIndex: 'isPrivate',
                key: 'isPrivate',
                render: (text, record) => {
                    return record.isPrivate == true ? <span>Private</span> : <span>Public</span>;
                }
            }, {
                title: '发布者',
                dataIndex: 'holder',
                key: 'holder'
            }];
            const dataSource = this.props.contests.contests.map(item => ({...item,
                key: item.id
            }));
            let pageConfig = {
                rows: 10,
                page: 1,
                status: this.state.status,
                isContest: this.state.isContest,
                isPrivate: this.state.isPrivate,
                title: this.state.title,
                holder: this.state.holder,
                isBeginner: this.state.isBeginner
            };
            const pagination = {
                total: this.props.contests.total,
                onChange: function(cur) {
                    pageConfig.page = cur;
                    this.props.dispatch(getContests(toQuery(pageConfig)));
                }.bind(this)
            };
            const displayContestNews=()=>{
                let newsPageConfig = {
                    rows: 10,
                    page: 1,
                };
                let total=0;
                if(!!this.props.news.data){
                    total=this.props.news.data.total;
                }
                const newsPagination = {
                    total: total,
                    onChange: function(cur) {
                        newsPageConfig.page = cur;
                        this.props.dispatch(getAllContest(toQuery(newsPageConfig)));
                    }.bind(this)
                };
                const newsColumns=[{
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    render: (text, record) => (<Link to={`/register/${record.id}`}>{record.id}</Link>)
                },{
                    title:'Title',
                    dataIndex:'title',
                    key:'title',
                    render: (text, record) => (<Link to={`/register/${record.id}`}>{record.title}</Link>)
                }];
                let newsSource=[];
                if(!!this.props.news.data){
                    newsSource=this.props.news.data.pagingList.map(item => ({...item,
                        key: item.id
                    }));
                }
                return (<Table columns={newsColumns} dataSource={newsSource} pagination={newsPagination}></Table>)
            };
            const detailUI = () => {
                return (
                    <div>
                        <div styleName='searchbox'>
                            <Row>
                                <Col span={9}>
                                    <Select styleName='select' defaultValue="Type"  onSelect={this.handleChangeS1.bind(this)} >
                                      <Option value="">Type</Option>
                                      <Option value={1}>Contest</Option>
                                      <Option value={0}>Experiment</Option>
                                    </Select>
                               
                                    <Select styleName='select' defaultValue="Status"  onSelect={this.handleChangeS2.bind(this)} >
                                      <Option value="">Status</Option>
                                      <Option value="0">Running</Option>
                                      <Option value="1">Pending</Option>
                                      <Option value="2">Ended</Option>
                                    </Select>

                                    <Select styleName='select' defaultValue="Purview" onSelect={this.handleChangeS3.bind(this)} >
                                      <Option value="">Purview</Option>
                                      <Option value={1}>Private</Option>
                                      <Option value={0}>Public</Option>
                                    </Select> 
                                </Col>
                                <Col span={3}>
                                    <Input placeholder={'Title/ID'} onChange={this.handleInputChange1.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)}/>
                                </Col>
                                <Col span={3}>
                                    <Input placeholder={'Holder'} onChange={this.handleInputChange2.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
                                </Col>
                                <Col span={2}>
                                    <div className="ant-input-group-wrap">
                                        <Button icon="search"  onClick={this.handleSearch.bind(this)} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Table columns={columns} dataSource={dataSource} pagination={pagination}></Table>
                    </div>
                );
            };
            return (
                <div styleName='wrapper' className='col-22 col-offset-1'>
                    <Tabs styleName='tabs' tabPosition='left' onChange={this.handleChange.bind(this)}>
                        <TabPane tab="比赛" key="1">{detailUI()}</TabPane>
                        <TabPane tab="实验" key="2">{detailUI()}</TabPane>
                        <TabPane tab="新手入门" key="3">{detailUI()}</TabPane>
                        <TabPane tab="比赛注册" key="4">{displayContestNews()}</TabPane>
                    </Tabs>
                </div>
            );
        };
    }
    //?????现在是多少页怎么计算得来的