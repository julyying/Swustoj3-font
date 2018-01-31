import React from 'react';
import {
    Link
} from 'react-router';
import {
    Table,
    Icon
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    getContestsProblems,
} from '../../../actions/contests';
import {
    connect
} from 'react-redux';
import {
    toQuery
} from '../../../utils/utils';
let curPage;
@connect(state => ({
    contest: state.contest,
}))
@CSSModules(styles)
export default class ContestProblems extends React.Component {
    constructor() {
        //debugger;
        super();
        this.state = {};
    };
    componentWillMount() {
        if (!!this.props.contestId) {
            this.props.dispatch(getContestsProblems(toQuery({
                rows: 10,
                page: 1,
                contestId: this.props.contestId || ''
            }))).then(() => {
                if (!!this.props.contest.code && this.props.contest.code != 'SUCCESS') {
                    var code = this.props.contest.code;
                    var warning = '';
                    message.warning('哦哦～后端报错咯:' + code);
                }
            });
            curPage = 1;
        }

    }
    render() {
        const columns = [{
            title: 'AC? ',
            dataIndex: 'userAc',
            key: 'userAc',
            render: (text, record) => {
                if (!!record.userAc) {
                    return <Icon type="check" />
                }
            }
        }, {
            title: 'Problem',
            dataIndex: 'problemId',
            key: 'problemId',
            render: (text, record) => {
                let ascll = (curPage - 1) * 10 + record.indexForSort + 65;
                return (<Link to={`/problems/${record.problemId}/${this.props.contestId}`}>{record.problemId+ '('+String.fromCharCode(ascll)+')'}</Link>);
            }
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (<Link to={`/problems/${record.problemId}/${this.props.contestId}`}>{record.title}</Link>)
        }, {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        }];
        let pageConfig = {};
        if (!!this.props.contestId) {
            pageConfig = {
                rows: 10,
                page: 1,
                contestId: this.props.contestId
            };
        }

        const pagination = {
            total: this.props.contest.problemsTotal,
            onChange: function(cur) {
                pageConfig.page = cur;
                curPage = cur;
                this.props.dispatch(getContestsProblems(toQuery(pageConfig))).then(() => {
                    if (!!this.props.contest.code && this.props.contest.code != 'SUCCESS') {
                        var code = this.props.contest.code;
                        var warning = '';
                        message.warning('哦哦～后端报错咯:' + code);
                    }
                });
            }.bind(this)
        };
        let dataSource = [];
        if (!!this.props.contest.problems) {
            dataSource = this.props.contest.problems.map((item, index) => ({...item,
                key: item.problemId
            }));
        };
        return (
            <div>
                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
        );
    };
}