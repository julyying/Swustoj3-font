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
import {
	hashHistory
} from 'react-router';
import {
	PWchangeToHeader
} from '../../actions/jumpPage';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
import {
	toQuery,
	encodePS
} from '../../utils/utils';
const createForm = Form.create;
const FormItem = Form.Item;
@connect(state => ({
	profile: state.profile,
	params: state.params,
}))
@CSSModules(styles)
export default class PwChange extends React.Component {
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
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				message.warning('请确认填写无误！');
				return;
			}

			var newPassword = encodePS(values.newPassword);

			this.props.dispatch(updataPassword(newPassword)).then(() => {
				if (!!this.props.profile.code && this.props.profile.code != 'SUCCESS') {
	                var code = this.props.profile.code;
	                var warning = '';
	                message.warning('哦哦～后端报错咯:' + code);
	            };
				if (this.props.profile.code === 'SUCCESS') {
					message.success('密码修改成功，去登录吧～');
					hashHistory.push(`/`);
					this.props.dispatch(PWchangeToHeader({
						isChangePW:true
					})).then(() => {
					});
				} else {
					message.warning('哦哦～后端报错咯:' + this.props.profile.code);
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
				span: 7
			},
		};
		const newPasswdProps = getFieldProps('newPassword', {
			rules: [{
				required: true,
				whitespace: true,
				message: '请填写密码'
			}, {
				validator: this.checkPass1.bind(this)
			}],
		});
		const rePasswdProps = getFieldProps('rePassWd', {
			rules: [{
				required: true,
				whitespace: true,
				message: '请再次输入密码',
			}, {
				validator: this.checkPass2.bind(this)
			}],
		});

		return (
			<div styleName='pwChange' className="col-22 col-offset-1">
			 	<Form horizontal  form={this.props.form}>
                    <FormItem {...formItemLayout} label="新密码" hasFeedback>
                        <Input type="password" placeholder="请输入您的密码" {...newPasswdProps} autoComplete="off" onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                        <Input type="password" placeholder="请再次输入您的密码" {...rePasswdProps} autoComplete="off" onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" htmlType='submit' onClick={this.handleSubmit.bind(this)}>修改</Button>
                    </FormItem>
                </Form>
			</div>
		);
	};
}
PwChange = createForm()(PwChange);