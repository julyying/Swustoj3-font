import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    Table,
} from 'antd';
import CSSModules from 'react-css-modules';
import {
    getContestsRanklist,
} from '../../../actions/contests';
import styles from './styles.scss';
import {
    toQuery
} from '../../../utils/utils';
@connect(state => ({
    contest: state.contest,
}))
@CSSModules(styles)
export default class ContestRanklist extends React.Component {
    constructor() {
        super(); //调用基类的所有的初始化方法
        this.state = {};
    };
    componentDidMount() {
        if (!!this.props.contestId) {
            this.props.dispatch(getContestsRanklist(toQuery({
                rows: 10,
                page: 1,
                contestId: this.props.contestId || ''
            }))).then(()=>{
                if (!!this.props.contest.code && this.props.contest.code != 'SUCCESS') {
                    var code = this.props.contest.code;
                    var warning = '';
                    message.warning('哦哦～后端报错咯:' + code);
                }
            });
        }
    };

    digits(num) {
        if (num.length < 2) {
            num = '0' + num;
        }
        return num;
    };
    formatTime(time) {
        var hou = parseInt(time / 360).toString();
        var min = (parseInt(time % 360 / 60)).toString();
        var sec = (time % 360 % 60).toString();
        return (hou + ':' + this.digits(min) + ':' + this.digits(sec))
    };
    render() {
        let columns = [{
            title: 'Rank',
            dataIndex: 'contestRank',
            key: 'contestRank',
        }, {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: 'Accepted',
            dataIndex: 'totalAcedCount',
            key: 'totalAcedCount',
        }, {
            title: 'Time Used',
            dataIndex: 'totalTimeUsed',
            key: 'totalTimeUsed',
            render: (text, record) => {
                return (<span>{this.formatTime(record.totalTimeUsed)}</span>);
            }
        }];
        let pageConfig = {};
        if (!!this.props.contestId) {
            pageConfig = {
                rows: 10,
                page: 1,
                contestId: this.props.contestId || ''
            };
        }
        const pagination = {
            total: this.props.contest.ranklistTotal,
            onChange: function(cur) {
                pageConfig.page = cur;
                this.props.dispatch(getContestsRanklist(toQuery(pageConfig))).then(()=>{
                    if (!!this.props.contest.code && this.props.contest.code != 'SUCCESS') {
                    var code = this.props.contest.code;
                    var warning = '';
                    message.warning('哦哦～后端报错咯:' + code);
                }
                });
            }.bind(this)
        };
        let dataSource = [];
        if (!!this.props.contest.ranklist) {
            dataSource = this.props.contest.ranklist.map((item, index) => ({...item,
                key: item.id
            }));
            if (!this.props.contest.ranklist.length) {
                return;
            }
            let problems = this.props.contest.ranklist[0].contestUserProblemSubmits;
            let ascll = 65;
            problems.map((item, index) => {
                columns.push({
                    title: '' + String.fromCharCode(ascll),
                    key: 'timeUse' + index,
                    render: (text, record) => {
                        var submitInfo = record.contestUserProblemSubmits[index];
                        var ac = {
                            height: 36,
                            display: 'block',
                            backgroundColor: 'green',
                            color: '#fff',
                        };
                        var error = {
                            height: 36,
                            display: 'block',
                            backgroundColor: 'red',
                            color: '#fff',
                        };
                        var span = {
                            height: 36,
                            display: 'block',
                        }
                        if (submitInfo.ac != 0) {
                            if (submitInfo.error == 0) {
                                return <span style={ac}>{this.formatTime(submitInfo.totalTimeUsed)}</span>;
                            } else {
                                return <span style={ac}>{this.formatTime(submitInfo.totalTimeUsed)}<div>(-{submitInfo.error})</div></span>;
                            }
                        } else {
                            if (submitInfo.error == 0) {
                                return <span style={span}></span>;
                            } else {
                                return <span style={error}>{this.formatTime(submitInfo.totalTimeUsed)}<div>(-{submitInfo.error})</div></span>;
                            }
                        }
                    }
                });
                ascll += 1;
            });
        };
        return (
            <div >
                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
        );
    };
}