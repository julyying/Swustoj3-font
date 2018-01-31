import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Link
} from 'react-router';
import {
    Button,
    Form,
    Input,
    Icon,
    message
} from 'antd';
import {
    getUser,
    updataUser
} from '../../actions/users';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery
} from '../../utils/utils';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;
@connect(state => ({
    user: state.user
}))
@CSSModules(styles)
export default class ProfileInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            username: undefined,
            email: undefined,
            school: undefined,
            institution: undefined,
            studentClass: undefined,
            phoneNumber: undefined,
            qq: undefined,
            studentId: undefined,
            sign: undefined,
            realname: undefined
        }
    };

    componentDidMount() {
        if (!!localStorage.userId) {
            this.setState({
                userId: localStorage.userId
            });
            this.props.dispatch(getUser(toQuery({
                ids: localStorage.userId,
                page: 1,
                rows: 1
            }))).then(() => {
                //debugger;
                var user = this.props.user.data;
                if (!!user) {

                    if (!!user.username) {
                        this.setState({
                            username: user.username
                        });
                    }
                    if (!!user.realName) {
                        this.setState({
                            realname: user.realName
                        });
                    }
                    if (!!user.email) {
                        this.setState({
                            email: user.email
                        });
                    }
                    if (!!user.studentId) {
                        this.setState({
                            studentId: user.studentId
                        });
                    }
                    if (!!user.qq) {
                        this.setState({
                            qq: user.qq
                        });
                    }
                    if (!!user.school) {
                        this.setState({
                            school: user.school
                        });
                    }
                    if (!!user.institution) {
                        this.setState({
                            institution: user.institution
                        });
                    }
                    if (!!user.studentClass) {
                        this.setState({
                            studentClass: user.studentClass
                        });
                    }
                    if (!!user.phoneNumber) {
                        this.setState({
                            phoneNumber: user.phoneNumber
                        });
                    }
                    if (!!user.sign) {
                        this.setState({
                            sign: user.sign
                        });
                    }
                }

            });
        }
    };
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    };
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.warning('请确认填写无误！');
                return;
            }

            let config = {
                username: values.name,
                email: values.email,
                school: values.school,
                institution: values.institution,
                studentClass: values.class,
                phoneNumber: values.phone,
                qq: values.qq,
                studentId: values.studentId,
                sign: values.textarea,
                realName: values.real,
            };
            this.props.dispatch(updataUser(config)).then(() => {
                if (!!this.props.user.code && this.props.user.code != 'SUCCESS') {
                    var code = this.props.user.code;
                    var warning = '';
                    message.warning('哦哦～后端报错咯:' + code);
                };
                if (!!this.props.user.code) {
                    if (this.props.user.code == 'SUCCESS') {
                        message.success('基本信息更新成功');
                    } else {
                        message.error('后台小哥报错咯' + code);
                    }
                }
            });
        });
    };
    render() {

        const {
            getFieldProps,
            getFieldError,
            isFieldValidating
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };
        const nameProps = getFieldProps('name', {
            rules: [{
                required: true,
                message: '请输入用户名'
            }, {
                min: 8,
                message: '用户名至少为 5 个字符'
            }, {
                max: 10,
                message: '用户名至多为 10 个字符'
            }, {
                validator: this.userExists
            }],
            initialValue: this.state.username
        });
        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [{
                    required: true,
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
            initialValue: this.state.email
        });

        let schoolProps = getFieldProps('school', {
            rules: [{
                min: 2,
                message: '学校名称至少为两个字符'
            }],
            initialValue: this.state.school
        });

        const institutionProps = getFieldProps('institution', {
            initialValue: this.state.institution
        });
        const classProps = getFieldProps('class', {
            initialValue: this.state.studentClass
        });
        const phoneProps = getFieldProps('phone', {
            rules: [{
                pattern: /^1\d{10}$/,
                message: '请输入正确手机号'
            }],
            initialValue: this.state.phoneNumber
        });
        const qqProps = getFieldProps('qq', {
            rules: [{
                pattern: /^\d{5,10}$/,
                message: '请填入正确QQ号'
            }],
            initialValue: this.state.qq
        });
        const studentIdProps = getFieldProps('studentId', {
            rules: [{
                required: true,
                message: '请输入学号'
            }, {
                min: 8,
                message: '学号至少为 8 个字符'
            }, {
                max: 10,
                message: '学号至多为 10 个字符'
            }],
            initialValue: this.state.studentId
        });
        const textareaProps = getFieldProps('textarea', {
            initialValue: this.state.sign
        });
        const realnameProps = getFieldProps('real', {
            rules: [{
                required: true,
                message: '请输入真实姓名'
            }],
            initialValue: this.state.realname
        });
        return (
            <div>
			 	<Form horizontal form={this.props.form}>
                    <FormItem {...formItemLayout} label="userName"  hasFeedback
                      help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')} >
                        <Input  {...nameProps} placeholder="用户名" />
                    </FormItem>

                     <FormItem {...formItemLayout} label="realName" hasFeedback >
                        <Input {...realnameProps} placeholder="真实姓名" />
                    </FormItem>

                    <FormItem {...formItemLayout} label="Email"  hasFeedback >
                        <Input {...emailProps} type="email" placeholder="email" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Student ID" hasFeedback >
                        <Input {...studentIdProps} placeholder="学号" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="School"hasFeedback >
                        <Input {...schoolProps} placeholder="学校名称"  />
                    </FormItem>
                    <FormItem  {...formItemLayout} label="Institution" hasFeedback >
                        <Input  {...institutionProps} placeholder="学院" />
                    </FormItem>
                    <FormItem  {...formItemLayout} label="Class"  hasFeedback >
                        <Input  {...classProps} placeholder="班级" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Phone" hasFeedback >
                        <Input {...phoneProps} placeholder="电话号码" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="QQ" hasFeedback>
                        <Input  {...qqProps} placeholder="QQ" />
                    </FormItem>
                    
                    <FormItem {...formItemLayout} label="Maxim" >
                        <Input {...textareaProps} type="textarea" placeholder="格言" id="textarea" name="textarea" />
                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>
			</div>
        );
    };
}

ProfileInfo = createForm()(ProfileInfo);