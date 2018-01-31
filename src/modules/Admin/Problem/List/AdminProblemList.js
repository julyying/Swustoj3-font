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
    message
} from 'antd';
import {
    getProblems,
    deleteProblems,
    addProblem
} from '../../../../actions/problems';
import CSSModules from 'react-css-modules';
import {
    Button,
    Icon,
    Input,
    Select
} from 'antd';
import styles from './styles.scss';
import {
    toQuery,
    handleError
} from '../../../../utils/utils';
import AdminProblemEdit from '../Edit/AdminProblemEdit';
import AdminProblemForm from '../../../../components/AdminProblemForm/AdminProblemForm';
import { getAdminTags } from '../../../../actions/tags';
import Editor from '../../../../components/Editor/Editor';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const rows = 10;
const Option = Select.Option;

@connect(state => ({
    problems: state.problems,
    tags: state.tags
}))
@CSSModules(styles)
export default class AdminProblemList extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getProblems(toQuery({
            rows: rows,
            page: 1
        })));
        redux.dispatch(getAdminTags());
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'ids',
            page: 1,
            selectedKeys: '',
            modalVisable: false
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
        this.props.dispatch(getProblems(toQuery(config)));
    }

    handleDelete() {
        let config = {
            rows: rows,
            page: this.state.page
        };
        config[this.state.searchType] = this.state.searchText;
        this.props.dispatch(deleteProblems(toQuery({
            pids: this.state.selectedKeys
        }))).then(
            setTimeout(() => {
                this.props.dispatch(getProblems(toQuery(config)));
            }, 500)
        );
        this.setState({
            ...this.state,
            selectedKeys: ''
        });
    }

    handleModalShow() {
        this.setState({
            ...this.state,
            modalVisable: true
        });
    }

    handleSubmit() {
        const form = this.refs.form;
        let formData = form.getFieldsValue();
        // 处理editor 因为editor为Simditor封装 
        // 无法直接触发onChange事件(会造成循环更新)
        // 故在此同步富文本编辑器的内容到需要提交的表单中
        for(let name in form.fields) {
            if(!(form.fields[name].instance instanceof Editor)) continue;
            formData[name] = form.fields[name].instance.value;
        }
        formData['tags'] = formData['tags'] && formData['tags'].join(',') || '';

        addProblem(formData).then((res) => {
            handleError(res.data, () => {
                message.success('添加题目成功！');
                this.refs.modal.destroy();
            });
        });
    }

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Link to={`/admin/problem/${record.id}`}>{record.title}</Link>
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
            rows: rows
        };
        pageConfig[this.state.searchType] = this.state.searchText;
        const problems = this.props.problems;
        const dataSource = problems && problems.problems.map(item => ({...item,
            key: item.id
        }));
        const pagination = {
            total: this.props.problems.total,
            onChange: function(cur) {
                this.setState({
                    ...this.state,
                    page: cur
                });
                pageConfig['page'] = cur;
                this.props.dispatch(getProblems(toQuery(pageConfig)));
            }.bind(this)
        };
        const rowSelection = {
            onChange: function(selectedRowKeys, selectedRows) {
                this.setState({
                    ...this.state,
                    selectedKeys: selectedRowKeys.join(',')
                });
            }.bind(this),
            // onSelect: function(record, selected, selectedRows) {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: function(selected, selectedRows, changeRows) {
            //     console.log(selected, selectedRows, changeRows);
            // }
        };
        return (
            <div className="ant-layout-content" styleName="wrapper">


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

                <ButtonGroup styleName="toolbar" size="large">
                    <Button onClick={this.handleModalShow.bind(this)}>
                        添加
                        <Icon type="plus-circle-o" />
                    </Button>
                    <Button onClick={ this.handleDelete.bind(this) }>
                        删除
                        <Icon type="cross-circle-o" />
                    </Button>
                </ButtonGroup>
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={pagination} />
                <Modal title="题目" visible={this.state.modalVisable}
                    onCancel={()=> this.setState({...this.state, 'modalVisable': false})}
                    width={800} okText="添加" onOk = {this.handleSubmit.bind(this)} ref="modal"
                >
                    <AdminProblemForm  tags={this.props.tags} ref="form" />
                </Modal>
            </div>
        );
    }
}