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
import {
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
    getBackPassword
} from '../../actions/profile';
import {
    toQuery
} from '../../utils/utils';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
@connect(state => ({
    profile: state.profile
}))
@CSSModules(styles)
export default class GetBackPw extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.warning('请确认填写无误！');
                return;
            }
            this.props.dispatch(getBackPassword(toQuery({
                username: values.userName
            }))).then(() => {
                if (!!this.props.profile.code) {
                    var code = this.props.profile.code;
                    if (code == 'EMAIL_IS_ILLEGAL') {
                        message.error('邮箱非法哦～请联系管理员修改');
                    } else if (code == 'SUCCESS') {
                        message.success('邮件已发送～请去邮箱查看！');
                    } else {
                        message.error('后台小哥报错咯：' + code);
                    }
                }
            });
        });
    };
    render() {
        let {
            getFieldProps,
            isFieldValidating,
            getFieldError
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 17
            },
        };
        const userNameProps = getFieldProps('userName', {
            rules: [{
                required: true,
                message: '请输入用户名',
            }]
        });
        return (
            <Form inline onSubmit={this.handleSubmit.bind(this)}>
                <FormItem {...formItemLayout} label="账户">
                  <Input placeholder="请输入用户名"
                    {...userNameProps }
                  />
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit">发送邮箱</Button>
                </FormItem>
            </Form>
        );
    };
}
GetBackPw = createForm()(GetBackPw);