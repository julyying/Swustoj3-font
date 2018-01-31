import React, {
    PropTypes
} from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
var jwtDecode = require('jwt-decode');
import GetBackPw from './GetBackPw';
import {
    Alert,
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal,
    Dropdown,
    Row,
    Col
} from 'antd';
import reactMixin from 'react-mixin';
import customStyles from './custom.css';
import {
    userRegister,
    userLogin
} from '../../actions/users';
import {
    problemToHeader,
    PWchangeToHeader,
} from '../../actions/jumpPage';
import {
    toQuery,
    encodePS
} from '../../utils/utils';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
let jwtExpire;
@connect(state => ({
    user: state.user,
    code: state.code,
    params: state.params,
}))
@CSSModules(styles)
export default class Header extends React.Component {
        static contextTypes = {
            route: React.PropTypes.object
        };
        constructor(props) {
            super(props);
            this.state = {
                current: '.$index',
                modalVisible1: false, //登录注册
                modalVisible2: false, //找回密码
                action: 'login',
                hasLogined: false,
                userNickName: '',
                isLoginT: true,
                isReginT: false,
                userId: null,
                warningL: '',
                warningR: '',
                roleId: 5,
            };

        };
        setModalVisible1(value) {
            this.setState({
                modalVisible1: value
            });
        };
        setModalVisible2(value) {
            this.setState({
                modalVisible2: value
            });
        };
        handleClick(e) {
            if (e.key == ".$register") {
                this.setState({
                    current: '.$register'
                });
                this.setModalVisible1(true);
            } else {
                this.setState({
                    current: e.key
                });
            }
        };
        handleLossPw(e) {
            this.setModalVisible2(true);
            this.setModalVisible1(false);
        }
        componentWillMount() {
            if (!!localStorage.userId) {
                let token = jwtDecode(localStorage.token);
                if (token.exp * 1000 > Date.parse(new Date())) {
                    this.setState({
                        ...this.state,
                        hasLogined: true,
                        userNickName: localStorage.userNickName,
                        userId: localStorage.userId,
                        roleId: localStorage.roleId,
                    });
                    this.handleJwtExpire();
                } else {
                    localStorage.userId = '';
                    localStorage.userNickName = '';
                    localStorage.removeItem('token');
                }
            }

        };
        handleJwtExpire() {
            if (!!jwtExpire) {
                clearTimeout(jwtExpire);
            }
            if (!!localStorage.token) {
                let token = jwtDecode(localStorage.token);
                let time = token.exp * 1000 - Date.parse(new Date());

                jwtExpire = setTimeout(() => {
                    this.logout();
                }, time);
            }
        };
        componentWillUnmount() {
            // 如果存在jwtExpire，则使用clearTimeout清空,避免内存泄漏。
            jwtExpire && clearTimeout(jwtExpire);
        }
        componentDidUpdate() {
            if (!!this.props.params.isLogin && this.props.params.isLogin.isLogin === false) {
                this.setModalVisible1(true);
                this.props.dispatch(problemToHeader({
                    isLogin: true
                })).then(() => {});
            }
            if (!!this.props.params.changePW && this.props.params.changePW.isChangePW === true) {
                this.logout();
                this.props.dispatch(PWchangeToHeader({
                    isChangePW: false
                })).then(() => {});
            }
        }
        handleSubmit(e) {
            e.preventDefault();
            this.props.form.validateFields((errors, values) => {
                if (!!errors) {
                    message.warning('请确认填写无误！');
                    return;
                }
                var config = values;
                if (this.state.action == 'login') {

                    var configLg = {
                        username: config.userNamelg || '',
                        password: encodePS(config.passWdlg) || '',
                    }

                    this.props.dispatch(userLogin(toQuery(configLg))).then(
                        () => {
                            var code = this.props.user.code;
                            var warning = '';
                            if (!!code) {
                                if (code == 'LOGIN_SUCCESS') {
                                    //debugger;
                                    this.setState({
                                        userNickName: this.props.user.data.username,
                                        userId: this.props.user.data.userId,
                                        roleId: this.props.user.data.roleId,
                                    });
                                    localStorage.userNickName = this.props.user.data.username;
                                    localStorage.userId = this.props.user.data.userId;
                                    localStorage.roleId = this.props.user.data.roleId;
                                    message.success("登录成功！");
                                    this.setModalVisible1(false);
                                    this.setState({
                                        hasLogined: true
                                    });
                                    this.handleJwtExpire();
                                } else {
                                    if (code == 'PWD_ERROR') {
                                        warning = '密码错误';
                                    } else if (code == 'USER_NOT_EXIST') {
                                        warning = '用户不存在';
                                    } else {
                                        message.warning('哦哦～后端报错咯' + code);
                                        return;
                                    }
                                }
                            }
                            this.setState({
                                warningL: warning,
                            });
                        }
                    );

                } else if (this.state.action == 'register') {
                    var configForm = {
                        username: config.userName || '',
                        realName: config.realName || '',
                        studentId: config.studentId || '',
                        email: config.email || '',
                        password: encodePS(config.passWord) || '',
                    };
                    this.props.dispatch(userRegister(configForm)).then(() => {

                        var code = this.props.user.code;
                        var warning = '';
                        if (!!code) {
                            if (code == 'SUCCESS') {
                                localStorage.userNickName = this.props.user.data.username;
                                localStorage.userId = this.props.user.data.userId;
                                localStorage.roleId = this.props.user.data.roleId;
                                this.setState({
                                    ...this.state,
                                    hasLogined: true,
                                    userNickName: localStorage.userNickName,
                                    userId: localStorage.userId,
                                    roleId: localStorage.roleId,
                                });
                                message.success("注册成功！");
                                this.setModalVisible1(false);
                            } else {
                                if (code == 'USER_EXISTED_ERROR') {
                                    warning = '用户已存在';
                                } else {
                                    message.warning('哦哦～后端报错咯:' + code);
                                    return;
                                }
                            }
                        }
                        this.setState({
                            warningR: warning,
                        });
                    });
                }
            });
        };
        callbackKey(key) {
            if (key == '.$1') {
                this.setState({
                    action: 'login',
                    isReginT: false,
                    isLoginT: true
                });
            } else if (key == '.$2') {
                this.setState({
                    action: 'register',
                    isLoginT: false,
                    isReginT: true
                });
            }
        };
        logout(e) {
            localStorage.userId = '';
            localStorage.userNickName = '';
            localStorage.roleId = 5;
            this.setState({
                hasLogined: false,
                roleId: 5
            });
            localStorage.removeItem('token');
            location.reload();
        };
        noop(e) {
            return false;
        };

        checkPass(rule, value, callback) {
            const {
                validateFields
            } = this.props.form;
            if (value) {
                validateFields(['rePassWd'], {
                    force: true
                });
            }
            callback();
        };
        checkPass2(rule, value, callback) {
            const {
                getFieldValue
            } = this.props.form;
            if (value && value !== getFieldValue('passWord')) {

                callback('两次输入密码不一致！');
            } else {
                callback();
            }
        };
        
        menuDown() {
             if (!!this.state.userNickName) {
                if (this.state.roleId == 1 || this.state.roleId == 2 || this.state.roleId == 3){
                    return (
                        <Menu >
                            <Menu.Item key="1">
                                <Link to="/admin/user" >
                                    <Button type="dashed" htmlType="button">后台</Button>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/profile/problems" >
                                    <Button type="dashed" htmlType="button">个人中心</Button>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3"><Link to='/' ><Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button></Link></Menu.Item>
                        </Menu>
                    )
                }
            }
            return (
                <Menu >
                    <Menu.Item key="1">
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/profile/problems" >
                            <Button type="dashed" htmlType="button">个人中心</Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3"><Link to='/' ><Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button></Link></Menu.Item>
                </Menu>
            )
        };
        render() {


            let {
                getFieldProps,
                isFieldValidating,
                getFieldError
            } = this.props.form;
            const usernameLogin = getFieldProps('userNamelg', {
                rules: [{
                    required: this.state.isLoginT,
                    message: '用户名不能为空'
                }],
            });
            const passwordLogin = getFieldProps('passWdlg', {
                rules: [{
                    required: this.state.isLoginT,
                    message: '密码不能为空'
                }],
            });
            const usernameProps = getFieldProps('userName', {

                rules: [{
                    required: this.state.isReginT,
                    message: '请输入用户名'
                }, {
                    min: 4,
                    message: '用户名至少为 4 个字符'
                }, {
                    max: 12,
                    message: '用户名至多为 12 个字符'
                }],
            });
            const realnameProps = getFieldProps('realName', {
                rules: [{
                    required: this.state.isReginT,
                    message: '请输入真实姓名'
                }, {
                    min: 2,
                    message: '真实姓名至少为 2 个字符'
                }, {
                    max: 20,
                    message: '用户名至多为 20 个字符'
                }],
            });
            const studentIdProps = getFieldProps('studentId', {
                rules: [{
                    required: this.state.isReginT,
                    message: '请输入学号'
                }, {
                    min: 8,
                    message: '学号至少为 8 个字符'
                }, {
                    max: 10,
                    message: '学号至多为 10 个字符'
                }],
            });
            const emailProps = getFieldProps('email', {
                validate: [{
                    rules: [{
                        required: this.state.isReginT,
                        message: '请输入邮箱地址'
                    }, ],
                    trigger: 'onBlur',
                }, {
                    rules: [{
                        type: 'email',
                        message: '请输入正确的邮箱地址'
                    }, ],
                    trigger: ['onBlur', 'onChange'],
                }],
            });
            const passwdProps = getFieldProps('passWord', {
                rules: [{
                    required: this.state.isReginT,
                    whitespace: true,
                    message: '请填写密码'
                }, {
                    validator: this.checkPass.bind(this)
                }],
            });
            const rePasswdProps = getFieldProps('rePassWd', {
                rules: [{
                    required: this.state.isReginT,
                    whitespace: true,
                    message: '请再次输入密码',
                }, {
                    validator: this.checkPass2.bind(this)
                }],
            });
            const formItemLayout = {
                labelCol: {
                    span: 7
                },
                wrapperCol: {
                    span: 12
                },
            };
            const isActive = this.props.router.isActive;
            const userShow = this.state.hasLogined ?
                <Menu.Item key="logout" class="register" styleName="user">
                <Dropdown overlay={this.menuDown()}>
                    <Button type="ghost" style={{ marginLeft: 8 }} htmlType="button">{this.state.userNickName}<Icon type="down" /></Button>
                </Dropdown>
            </Menu.Item> :

                <Menu.Item key="register" class="register" styleName="user">

                <Icon type="appstore"/>注册/登录 
            </Menu.Item>;
            /*const profile = () => {
                if (!!this.state.userNickName) {
                    return ( < Menu.Item key = 'profile' styleName="size"
                        className = {
                            classNames({
                                'active': isActive('/profile/problems', true) ||
                                    isActive('/profile/contests', true) || isActive('/profile/collect', true) || isActive('/profile/tags', true) ||
                                    isActive('/profile/road', true) || isActive('/profile/discuss', true) || isActive('/profile/inf', true) ||
                                    isActive('/profile/changePW', true)
                            })}>
                        <Link to="/profile/problems">个人中心</Link> 
                        </Menu.Item>);
                    }
                };*/
           const profile = () => {
                if (!!this.state.userNickName) {
                    return ( <Menu.Item key = 'profile' styleName="size"
                        className = {
                            classNames({
                                'active': isActive('/profile/problems', true) ||
                                    isActive('/profile/contests', true) || isActive('/profile/collect', true) || isActive('/profile/tags', true) ||
                                    isActive('/profile/road', true) || isActive('/profile/discuss', true) || isActive('/profile/inf', true) ||
                                    isActive('/profile/changePW', true)
                            })
                        } >
                        <Link to="/profile/problems">个人中心</Link> </Menu.Item>);
                    }
                };

                const warning = (type) => {
                    if (type == 'login') {
                        if (!!this.state.warningL) {
                            return (
                                <div styleName='warning'>   
                        <Alert message={this.state.warningL} type="error" />
                    </div>
                            );
                        }
                    } else {
                        if (!!this.state.warningR) {
                            return (
                                <div styleName='warning'>   
                        <Alert message={this.state.warningR} type="error" />
                    </div>
                            );
                        }
                    }
                };
                return (
                <nav>   
                <Menu mode="horizontal" styleName="navbar" ref="navbar" onClick={this.handleClick.bind(this)} style={customStyles} selectedKeys={[this.state.current]}>
                     {/*<Menu.Item key='index'  styleName="logo" >
                        <Link to="/">SWUST OJ</Link>
                    </Menu.Item> */}
                    <Menu.Item key='main' styleName="shouye" className={classNames({'active': isActive('/', true)})}>
                        <Link to="/">首页</Link>
                    </Menu.Item>
                    <Menu.Item key='problems' styleName="size" className={classNames({'active': isActive('/problems', true)})}>
                        <Link to="/problems">题目</Link>
                    </Menu.Item>
                    <Menu.Item key='status' styleName="size" className={classNames({'active':isActive('/status',true)})}>
                        <Link to='/status'>状态</Link>
                    </Menu.Item>
                    <Menu.Item key='ranklist' styleName="size" className={classNames({'active':isActive('/ranklist',true)})}>
                        <Link to='/ranklist'>排名</Link>
                    </Menu.Item>
                    <Menu.Item key='contests' styleName="size" className={classNames({'active': isActive('/contests', true)})}>
                        <Link to="/contests">比赛</Link>
                    </Menu.Item>
                    <Menu.Item key='tags' styleName="size" className={classNames({'active': isActive('/tags', true)})}>
                        <Link to="/tags">标签</Link>  
                    </Menu.Item>
                    <Menu.Item key='online' styleName="size" className={classNames({'active': isActive('/online', true)})}>
                        <Link to="/online">在线</Link>
                    </Menu.Item>
                    {profile()}
                    <Menu.Item key='about' styleName="size" className={classNames({'active': isActive('/about', true)})}>
                        <Link to="/about">关于</Link>
                    </Menu.Item>
                    {userShow}
                </Menu>  
                <Modal footer={null} visible={this.state.modalVisible1} wrapClassName='vertical-center-modal'    onOk={()=>this.setModalVisible1(false)} onCancel={()=>this.setModalVisible1(false)} okText='关闭'>
                    <Tabs type="card" onChange={this.callbackKey.bind(this)}>
                        <TabPane tab="登录" key="1" >
                            <Form horizontal >
                                <FormItem {...formItemLayout} label="用户名" hasFeedback>
                                    <Input placeholder="请输入您的用户名" {...usernameLogin} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="密码" hasFeedback>
                                    <Input type="password" placeholder="请输入您的密码" {...passwordLogin} />
                                </FormItem>
                                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                                    <Button type="primary" htmlType='submit' onClick={this.handleSubmit.bind(this)}>登录</Button>
                                </FormItem>
                            </Form>
                            {warning('login')}
                            <div styleName='getPw'>
                                <div styleName='lossPw' onClick={this.handleLossPw.bind(this)}> 忘记密码？</div>
                            </div>
                        </TabPane>
                        <TabPane tab="注册" key="2" >
                            <Form horizontal form={this.props.form}>
                                <FormItem {...formItemLayout} label="用户名" hasFeedback help={isFieldValidating('userName') ? '校验中...' : (getFieldError('userName') || []).join(', ')}>
                                    <Input placeholder="请输入您的昵称"{...usernameProps }  />
                                </FormItem>
                                <FormItem {...formItemLayout} label="真实姓名" hasFeedback >
                                    <Input placeholder="请输入您的真实姓名"{...realnameProps }  />
                                </FormItem>
                                <FormItem  {...formItemLayout} label="学号" hasFeedback>
                                    <Input placeholder="请输入您的学号" {...studentIdProps} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                                    <Input  placeholder="请输入您的邮箱" {...emailProps} type="email"  />
                                </FormItem>
                                <FormItem {...formItemLayout} label="密码" hasFeedback>
                                    <Input type="password" placeholder="请输入您的密码" {...passwdProps} autoComplete="off" onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                                    <Input type="password" placeholder="请再次输入您的密码" {...rePasswdProps} autoComplete="off" onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop} />
                                </FormItem>
                                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                                    <Button type="primary" htmlType='submit' onClick={this.handleSubmit.bind(this)}>注册</Button>
                                </FormItem>
                            </Form>
                            {warning('register')}
                        </TabPane>
                        
                    </Tabs>
                </Modal>
                <Modal title="找回密码" visible={this.state.modalVisible2}  wrapClassName='vertical-center-modal'    onOk={()=>this.setModalVisible2(false)} onCancel={()=>this.setModalVisible2(false)} okText='关闭'>
                    <GetBackPw />
                </Modal>
            </nav>

                );
            }
        }
        Header = Form.create({})(Header);