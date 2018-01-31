import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    Table
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery
} from '../../../utils/utils';
let curPage;
import {
    getContestsStatistics,
} from '../../../actions/contests';
@connect(state => ({
    contest: state.contest,
}))
@CSSModules(styles)
export default class ContestStatistic extends React.Component {
    constructor() {
        super(); //调用基类的所有的初始化方法
        this.state = {};
    };
    componentWillMount() {
        if (!!this.props.contestId) {
            this.props.dispatch(getContestsStatistics(toQuery({
                rows: 10,
                page: 1,
                contestId: this.props.contestId || ''
            })));
            curPage = 1;
        }

    }
    render() {
        const columns = [{
            title: 'ID ',
            dataIndex: 'problemId',
            key: 'problemId',
            render: (text, record) => {
                let ascll = (curPage - 1) * 10 + record.indexForSort + 65;
                return (<Link to={`/problems/${record.problemId}/${-1}`}>{String.fromCharCode(ascll)}</Link>);;
            }
        }, {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        }, {
            title: 'AC',
            dataIndex: 'ac',
            key: 'ac',
        }, {
            title: 'PE',
            dataIndex: 'pe',
            key: 'pe',
        }, {
            title: 'TLE',
            dataIndex: 'tle',
            key: 'tle',
        }, {
            title: 'MLE',
            dataIndex: 'mle',
            key: 'mle',
        }, {
            title: 'WA',
            dataIndex: 'wa',
            key: 'wa',
        }, {
            title: 'RE',
            dataIndex: 're',
            key: 're',
        }, {
            title: 'OLE',
            dataIndex: 'ole',
            key: 'ole',
        }, {
            title: 'CE',
            dataIndex: 'ce',
            key: 'ce',
        }, {
            title: 'GCC',
            dataIndex: 'gcc',
            key: 'gcc',
        }, {
            title: 'G++',
            dataIndex: 'gplus',
            key: 'gplus',
        }, {
            title: 'Java',
            dataIndex: 'java',
            key: 'java',
        }, {
            title: 'Python',
            dataIndex: 'python',
            key: 'python',
        }, {
            title: 'Pascal',
            dataIndex: 'pascal',
            key: 'pascal',
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
            total: this.props.contest.statisticsTotal,
            onChange: function(cur) {
                pageConfig.page = cur;
                curPage = cur;
                this.props.dispatch(getContestsStatistics(toQuery(pageConfig)));
            }.bind(this)
        };
        let dataSource = [];
        if (!!this.props.contest.statistics) {
            dataSource = this.props.contest.statistics.map((item, index) => ({...item,
                key: item.problemId,
            }));
        };
        return (
            <div>
                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
        );
    };
}