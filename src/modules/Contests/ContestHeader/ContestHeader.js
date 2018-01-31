import React from 'react';
import {
    Link
} from 'react-router';
import {
    Tabs,
    Progress
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    connect
} from 'react-redux';
import ContestProblems from '../ContestProblems/ContestProblems';
import ContestRanklist from '../ContestRanklist/ContestRanklist';
import ContestStatistic from '../ContestStatistic/ContestStatistic';
import ContestStatus from '../ContestStatus/ContestStatus';
import {
    toQuery,
    timeFormat
} from '../../../utils/utils';
import {
    getContests
} from '../../../actions/contests';
import {
    getOwnContests
} from '../../../actions/profile';
const TabPane = Tabs.TabPane;
@connect(state => ({
    contests: state.contests,
    profile: state.profile
}))
@CSSModules(styles)
export default class ContestHeader extends React.Component {
    constructor() {
        super(); //调用基类的所有的初始化方法
        this.state = {
            name: '',
            startTime: '',
            endTime: '',
            progress: 100,
            now: (new Date()).valueOf().toString().substring(0, 10),
            getScord: 2,
            allScord: '',
            showScord: false,
        };
    };
    componentDidMount() {
        if (!!localStorage.userId) {
            this.props.dispatch(getOwnContests(toQuery({
                userId: localStorage.userId,
                contestId: this.props.params.id,
            }))).then(() => {
                //debugger;
                if (!!this.props.profile.contests) {
                    if (this.props.profile.contests.length === 0) {
                        this.getContestsData();
                    } else {
                        if (!!this.props.profile.code && this.props.profile.code != 'SUCCESS') {
                            var code = this.props.profile.code;
                            var warning = '';
                            message.warning('哦哦～后端报错咯:' + code);
                        }
                        var data = this.props.profile.contests[0];
                        this.setState({
                            name: data.contest.title,
                            startTime: timeFormat(data.contest.startTime),
                            endTime: timeFormat(data.contest.endTime),
                            getScord: data.currSocre,
                            allScord: data.contest.totalScore,
                            showScord: true
                        });
                        this.progress(data.contest.startTime, data.contest.endTime);
                    }
                }
            });
        } else {
            this.getContestsData();
        }

    };
    getContestsData() {
        this.props.dispatch(getContests(toQuery({
            rows: 10,
            page: 1,
            title: this.props.params.id,
        }))).then(() => {
            if (!!this.props.contests.code && this.props.contests.code != 'SUCCESS') {
                var code = this.props.contests.code;
                var warning = '';
                message.warning('哦哦～后端报错咯:' + code);
            }
            if (!!this.props.contests.contests && this.props.contests.contests.length) {
                var data = this.props.contests.contests[0];
                this.setState({
                    name: data.title,
                    startTime: timeFormat(data.startTime),
                    endTime: timeFormat(data.endTime),
                });
                this.progress(data.startTime, data.endTime);
            }
        });
    };

    callback(e) {

    }
    displayScore(flag) {
        if (flag == true) {
            return (<div className="col-5 col-offset-2" styleName='timeItem'><span>You have got {this.state.getScord} of {this.state.allScord} scores</span></div>);
        }
    };
    progress(startTime, endTime) {
        var progress;
        if (startTime < this.state.now && this.state.now < endTime) {
            progress = parseInt((this.state.now - startTime) / (endTime - startTime) * 100);
        } else if (this.state.now <= startTime) {
            progress = 0;
        } else if (this.state.now >= endTime) {
            progress = 100;
        }
        this.setState({
            progress: progress
        });
    };

    render() {
        return (
            <div className="col-22 col-offset-1 " styleName='contestWrap'> 
                <div styleName='title'>{this.state.name}</div> 
                <Progress styleName='progress' percent={this.state.progress} status="active" />
                <div styleName='timeDis'>
                    <div className="col-4" styleName='timeItem'><span >start time:{this.state.startTime}</span></div>
                    <div className="col-4 col-offset-2"  styleName='endTime'><span>end time:{this.state.endTime}</span></div>
                    <div className="col-4 col-offset-2" styleName='timeItem'><span>server time:{timeFormat(this.state. now)}</span></div>
                    {this.displayScore(this.state.showScord)}
                </div>
                <Tabs onChange={this.callback.bind(this)}  tabPosition='left'>
                    <TabPane tab="问题" key="1"><ContestProblems contestId={this.props.params.id}/></TabPane>
                    <TabPane tab="提交" key="2"><ContestStatus contestId={this.props.params.id}/></TabPane>
                    <TabPane tab="排名" key="3"><ContestRanklist contestId={this.props.params.id}/></TabPane>
                    <TabPane tab="统计" key="4"><ContestStatistic contestId={this.props.params.id}/></TabPane>
                </Tabs>
            </div>
        );
    };
}