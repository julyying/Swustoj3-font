import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Icon,
	Form,
	Input,
	Button,
	message
} from 'antd';
import {
	updataPassword
} from '../../actions/profile';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
import {
	getBackPassword
} from '../../actions/profile';
import {
	toQuery
} from '../../utils/utils';
const createForm = Form.create;
const FormItem = Form.Item;
@connect(state => ({
	profile: state.profile
}))
@CSSModules(styles)
export default class ProfileChangePW extends React.Component {
	constructor() {
		super();
	};
	componentDidMount() {

	};
	noop(e) {
		return false;
	};
	checkPass1(rule, value, callback) {
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
		if (value && value !== getFieldValue('newPassword')) {

			callback('两次输入密码不一致！');
		} else {
			callback();
		}
	};
	handleSubmit(e) {
		e.preventDefault();

		if (!!localStorage.userNickName) {
			this.props.dispatch(getBackPassword(toQuery({
				username: localStorage.userNickName
			}))).then(() => {
				if (!!this.props.profile.code) {
					var code = this.props.profile.code;
					if (code == 'EMAIL_IS_ILLEGAL') {
						message.error('邮箱非法哦～请去修改邮箱地址！');
					} else if (code == 'SUCCESS') {
						message.success('请去邮箱查看邮件吧～');
					} else {
						message.error('后台小哥报错咯' + code);
					}
				}
			});
		}
	};
	render() {

		return (
			<div styleName='profileChangePW'>
			 	<Form horizontal  form={this.props.form}>
                    <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                        发送邮件验证身份？<Button type="primary" htmlType='submit' onClick={this.handleSubmit.bind(this)}>发送</Button>
                    </FormItem>
                </Form>
			</div>
		);
	};
}
ProfileChangePW = createForm()(ProfileChangePW);