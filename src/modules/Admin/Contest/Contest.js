import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    Table,
    Modal,
    message,
    DatePicker,
    Switch, 
    Icon,
    Form,
    Button,
    Input,
    Select
} from 'antd';
import {
    getContests
} from '../../../actions/contests';
import {
    getContest,
    addContest
} from '../../../actions/contest';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery,
    handleError,
    dateToTimestamp
} from '../../../utils/utils';
import ProblemSelecter from '../../../components/ProblemSelecter/ProblemSelecter';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const rows = 10;
const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

@connect(state => ({
    contests: state.contests,
    contest: state.contest
}))
@CSSModules(styles)
export default class AdminContest extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getContests(toQuery({
            rows: 10,
            page: 1
        })));

    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            contest: nextProps.contest && nextProps.contest.contest || {}
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'title',
            page: 1,
            selectedKeys: '',
            modalVisable: false,
            contest: {}
        };
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
            rows: rows,
            page: this.state.page
        };
        if (!!this.state.searchText) {
            config[this.state.searchType] = this.state.searchText;
        }
        this.props.dispatch(getContests(toQuery(config)));
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    handleModalShow(id) {

        if(id) {
            this.props.dispatch(getContest(toQuery({
                ids: id,
                page: 1,
                rows: 1
            })));
            this.setState({
                ...this.state,
                modalVisable: true
            }); 
        } else {
            this.setState({
                ...this.state,
                contest: {},
                modalVisable: true
            });
        }
    }

    handleSubmit() {
        console.log('contest', this.state.contest);
        console.log('pids', this.refs.pids.mergedProps.problems.problems);
        let _context = {
            contest: this.state.contest,
            ContestTemplate: this.refs.pids.mergedProps.problems.problems
        };
        this.props.dispatch(addContest(_context));
    }

    onChangeTime(value, dateString) {
        this.setState({
            ...this.state,
            contest: {
                ...this.state.contest,
                startTime: dateToTimestamp(value[0]),
                endTime: dateToTimestamp(value[1])
            }
        });
    }

    onChangeTitle(e) {
        this.setState({
            ...this.state,
            contest: {
                ...this.state.contest,
                title: e.target.value
            }
        });
    }

    onChangeType(checked) {
        this.setState({
            ...this.state,
            contest: {
                ...this.state.contest,
                isContest: checked
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a onClick={this.handleModalShow.bind(this, record.id)}>{record.title}</a>
            )
        }];

        let pageConfig = {
            rows: 10
        };
        pageConfig[this.state.searchType] = this.state.searchText;
        const contests = this.props.contests && this.props.contests.contests;
        const dataSource = contests && contests.map(item => ({...item,
            key: item.id
        }));

        let contest = this.state.contest;

        console.log('contest', contest);

        const pagination = {
            total: this.props.contests.total,
            onChange: function(cur) {
                this.setState({
                    ...this.state,
                    page: cur
                });
                pageConfig['page'] = cur;
                this.props.dispatch(getContests(toQuery(pageConfig)));
            }.bind(this)
        };
        return (
            <div className="ant-layout-content" styleName="wrapper">

                <InputGroup styleName="searchbar">
                    <div styleName="wrapper">
                        <Select defaultValue="title" styleName="select" onSelect={ this.handleSearchType.bind(this) }>
                            <Option value="title">标题</Option>
                        </Select>
                    </div>
                    <Input styleName="input" onChange={ this.handleSearchText.bind(this) } onPressEnter={ this.handleSearch.bind(this) } />
                    <div styleName="wrapper">
                        <Button icon="search" styleName="btn" onClick={ this.handleSearch.bind(this) } />
                    </div>
                </InputGroup>

                <Button styleName="toolbar" size="large" onClick={this.handleModalShow.bind(this, null)}>
                        添加
                    <Icon type="plus-circle-o" />
                </Button>

                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
           
                <Modal title="比赛" visible={this.state.modalVisable}
                    onCancel={()=> this.setState({...this.state, 'modalVisable': false})}
                    width={800} okText="确定" onOk = {this.handleSubmit.bind(this)} ref="modal"
                >
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="标题："
                        >
                            <Input value={contest && contest.title} onChange={this.onChangeTitle.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="时间："
                        >
                            <RangePicker showTime format="yyyy/MM/dd HH:mm:ss" onChange={this.onChangeTime.bind(this)} value={[new Date((contest && contest.startTime || dateToTimestamp(new Date())) * 1000), new Date((contest && contest.endTime || dateToTimestamp(new Date())) * 1000)]}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="类型："
                        >
                            <Switch checkedChildren="赛" checked={contest && contest.isContest} unCheckedChildren="实" onChange={this.onChangeType.bind(this)} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="题目："
                        >
                            <ProblemSelecter ref="pids" problemsId={contest && contest.id} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}