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
    Form,
    Button,
    Icon,
    Input,
    Select
} from 'antd';
import {
    getUsers
} from '../../../../actions/ranklist';
import {
    updataUser,
    getUser
} from '../../../../actions/users';
import {
    getRoles
} from '../../../../actions/roles';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery,
    handleError
} from '../../../../utils/utils';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const rows = 10;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(state => ({
    users: state.users,
    roles: state.roles,
    user: state.user
}))
@CSSModules(styles)
export default class AdminUserList extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getUsers(toQuery({
            rows: rows,
            page: 1
        })));
        redux.dispatch(getRoles());
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'ids',
            page: 1,
            selectedKeys: '',
            modalVisable: false,
            userData: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        this.setState({
            ...this.state,
            userData: {
                role: nextProps.user && nextProps.user.data && nextProps.user.data.role || null
            }
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
            rows: rows,
            page: this.state.page
        };
        if (!!this.state.searchText) {
            config[this.state.searchType] = this.state.searchText;
        }
        this.props.dispatch(getUsers(toQuery(config)));
    }

    handleModalShow(userId) {
        this.setState({
            ...this.state,
            modalVisable: true
        });
        this.props.dispatch(getUser(toQuery({
            ids: userId,
            page: 1,
            rows: 1
        })));
    }

    handleChange(type, value) {
        let _userData = Object.assign({}, this.state.userData);
        if(type === 'password') {
            value = value.target.value
        }
        _userData[type] = value;
        this.setState({
            ...this.state,
            userData: {
                ..._userData
            }
        });
    }

    handleSubmit() {

        console.log('user', this.state.userData);
        this.props.dispatch(updataUser(toQuery(this.state.userData)));
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
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => (
                <a onClick={this.handleModalShow.bind(this, record.id)}>{record.username}</a>
            )
        }, {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName'
        }, {
            title: '角色',
            dataIndex: 'role',
            key: 'role'
        }];
        let pageConfig = {
            rows: rows
        };
        pageConfig[this.state.searchType] = this.state.searchText;
        const users = this.props.users;
        const dataSource = users && users.users.map(item => ({...item,
            key: item.id
        }));
        const pagination = {
            total: this.props.users.total,
            onChange: function(cur) {
                this.setState({
                    ...this.state,
                    page: cur
                });
                pageConfig['page'] = cur;
                this.props.dispatch(getUsers(toQuery(pageConfig)));
            }.bind(this)
        };
        let roles = [];
        let rolesLength = this.props.roles && this.props.roles.total;
        for(let i = 0; i < rolesLength; i++) {
            roles.push(<Option key={this.props.roles.pagingList[i].id} value={this.props.roles.pagingList[i].name}>{this.props.roles.pagingList[i].name}</Option>);
        }
        return (
            <div className="ant-layout-content" styleName="wrapper">


                <InputGroup styleName="searchbar">
                    <div styleName="wrapper">
                        <Select defaultValue="ids" styleName="select" onSelect={ this.handleSearchType.bind(this) }>
                            <Option value="ids">用户ID</Option>
                            <Option value="username">用户名</Option>
                        </Select>
                    </div>
                    <Input styleName="input" onChange={ this.handleSearchText.bind(this) } onPressEnter={ this.handleSearch.bind(this) } />
                    <div styleName="wrapper">
                        <Button icon="search" styleName="btn" onClick={ this.handleSearch.bind(this) } />
                    </div>
                </InputGroup>

                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
                <Modal title="修改用户" visible={this.state.modalVisable}
                    onCancel={()=> this.setState({...this.state, 'modalVisable': false})}
                    width={800} okText="修改" onOk = {this.handleSubmit.bind(this)} ref="modal"
                >
                    <Form horizontal ref="form">
                        <FormItem
                          {...formItemLayout}
                          label="用户角色："
                        >
                          <Select value={this.state.userData && this.state.userData.role} onChange={this.handleChange.bind(this, 'role')} placeholder="请选择用户角色">
                            { roles }
                          </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="用户密码："
                        >
                            <Input  type="password" onChange={this.handleChange.bind(this, 'password')} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}