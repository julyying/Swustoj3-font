import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    hashHistory
} from 'react-router';
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    TimePicker,
    Switch,
    Radio,
    Cascader,
    Slider,
    Button,
    Col,
    Upload,
    Icon,
    Input,
    message,
    Table
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    addContestTeam,
} from '../../actions/news';
import {
    toQuery,
    timeFormat
} from '../../utils/utils';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;
@connect(state => ({
    news: state.news,
}))
@CSSModules(styles)
export default class ContestReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size1: 'M',
            size2: 'M',
            size3: 'M',
            sex1: '1',
            sex2: '1',
            sex3: '1',
            url: '',
        }
    };
    componentDidMount() {
        this.setState({
            url: this.props.params.id
        });
    };
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.warning('请确认填写无误！');
                return;
            }
            let config;
            if (!!values.realName3) {
                config = {
                    competitionTeam: {
                        teamName: values.teamName,
                        teacher:values.teacher,
                        competitionId: this.props.params.id,
                    },
                    members: [{
                        stuName: values.realName1,
                        size: this.state.size1,
                        phone: values.phone1,
                        stuClass: values.class1,
                        stuNum: values.studentId1,
                        sex: this.state.sex1,
                        college:values.college1,
                    }, {
                        stuName: values.realName2,
                        size: this.state.size2,
                        stuClass: values.class2,
                        stuNum: values.studentId2,
                        sex: this.state.sex2,
                        college:values.college2,
                    }, {
                        stuName: values.realName3,
                        size: this.state.size3,
                        stuClass: values.class3,
                        stuNum: values.studentId3,
                        sex: this.state.sex3,
                        college:values.college3,
                    }]
                };
            } else {
                config = {
                    competitionTeam: {
                        teamName: values.teamName,
                        competitionId: this.props.params.id,
                    },
                    members: [{
                        stuName: values.realName1,
                        size: this.state.size1,
                        phone: values.phone1,
                        stuClass: values.class1,
                        stuNum: values.studentId1,
                        sex: this.state.sex1,
                        college:values.college1,
                    }, {
                        stuName: values.realName2,
                        size: this.state.size2,
                        stuClass: values.class2,
                        stuNum: values.studentId2,
                        sex: this.state.sex2,
                        college:values.college2,
                    }, ]
                };
            }
            this.props.dispatch(addContestTeam(config)).then(() => {
                if (this.props.news.code === 'SUCCESS') {
                    message.success('添加比赛团队成功!');
                    hashHistory.push(`/register/list/${this.state.url}`);
                } else {
                    let code = this.props.news.code;
                    message.warning('哦哦～后端报错咯:' + code);
                }
            });
        });
    };
    handleSelectChange1(value) {
        this.setState({
            size1: value,
        });
    }
    handleSelectChange2(value) {
        this.setState({
            size2: value,
        });
    }
    handleSelectChange3(value) {
        this.setState({
            size3: value,
        });
    }
    handleSexChange1(value) {
        this.setState({
            sex1: value,
        });
    }
    handleSexChange2(value) {
        this.setState({
            sex2: value,
        });
    }
    handleSexChange3(value) {
        this.setState({
            sex3: value,
        });
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
            isFieldValidating
        } = this.props.form;
        const formItemLayout = {
            wrapperCol: {
                span: 22,
                offset: 2 
            },
        };
        const teamNameProps = getFieldProps('teamName', {
            rules: [{
                required: true,
                message: '请输入队名'
            }, {
                required: true,
                min: 1,
                message: '用户名至少为 1 个字符'
            }, {
                required: true,
                max: 15,
                message: '用户名至多为 15 个字符'
            }, {
                validator: this.userExists
            }],
        });
        const realnameProps1 = getFieldProps('realName1', {
            rules: [{
                required: true,
                min: 2,
                message: '真实姓名至少为 2 个字符'
            }, {
                required: true,
                max: 20,
                message: '用户名至多为 20 个字符'
            }],
        });
        const realnameProps2 = getFieldProps('realName2', {
            rules: [{
                required: true,
                min: 2,
                message: '真实姓名至少为 2 个字符'
            }, {
                required: true,
                max: 20,
                message: '用户名至多为 20 个字符'
            }],
        });
        const realnameProps3 = getFieldProps('realName3', {
            rules: [{
                min: 2,
                message: '真实姓名至少为 2 个字符'
            }, {
                max: 20,
                message: '用户名至多为 20 个字符'
            }],
        });
        const studentIdProps1 = getFieldProps('studentId1', {
            rules: [{
                required: true,
                message: '请输入学号'
            }, {
                required: true,
                min: 8,
                message: '学号至少为 8 个字符'
            }, {
                required: true,
                max: 10,
                message: '学号至多为 10 个字符'
            }],
            initialValue: this.state.studentId
        });
        const studentIdProps2 = getFieldProps('studentId2', {
            rules: [{
                required: true,
                message: '请输入学号'
            }, {
                required: true,
                min: 8,
                message: '学号至少为 8 个字符'
            }, {
                required: true,
                max: 10,
                message: '学号至多为 10 个字符'
            }],
            initialValue: this.state.studentId
        });
        const studentIdProps3 = getFieldProps('studentId3', {
            rules: [{
                min: 8,
                message: '学号至少为 8 个字符'
            }, {
                max: 10,
                message: '学号至多为 10 个字符'
            }],
            initialValue: this.state.studentId
        });
        const classProps1 = getFieldProps('class1', {
            rules: [{
                required: true,
                message: '请输入班级'
            }, ],
        });
        const classProps2 = getFieldProps('class2', {
            rules: [{
                required: true,
                message: '请输入班级'
            }, ],
        });
        const classProps3 = getFieldProps('class3', {});
        const teacherProps = getFieldProps('teacher', {});
        const collegeProps1 = getFieldProps('college1', {
            rules: [{
                required: true,
                message: '请输入学院/班级'
            }, ],
        });
        const collegeProps2 = getFieldProps('college2', {
            rules: [{
                required: true,
                message: '请输入学院/班级'
            }, ],
        });
        const collegeProps3 = getFieldProps('college3');
        const phoneProps1 = getFieldProps('phone1', {
            rules: [{
                required: true,
                message: '请填入手机号'
            }, {
                required: true,
                min: 11,
                message: '手机号为 11 位'
            }, {
                required: true,
                max: 11,
                message: '手机号为 11 位'
            }],
        });
        const columns = [{
          title: '成员',
          dataIndex: 'job',
          key: 'job',
          render:(text,record)=>{
            if(record.key==1){
                return <div><p style={{'float':'left','color':'red'}}>*</p>队长</div>
            }
            else if(record.key==2){
                return <div><p style={{'float':'left','color':'red'}}>*</p>队员1</div>
            }
            else if(record.key==3){
                return <div>队员3</div>
            }
          }
        }, {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          render: (text,record) => {
            if(record.key==1){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...realnameProps1} />
                    </FormItem>)
            }
            else if(record.key==2){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...realnameProps2} />
                    </FormItem>)
            }
            else if(record.key==3){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...realnameProps3} />
                    </FormItem>)
            }
          },
        }, {
          title: '学号',
          dataIndex: 'stuNum',
          key: 'stuNum', 
          render: (text,record) => {
            if(record.key==1){
                return(       
                    <FormItem {...formItemLayout}>
                        <Input {...studentIdProps1}/>
                    </FormItem>)
            }
            else if(record.key==2){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...studentIdProps2} />
                    </FormItem>)
            }
            else if(record.key==3){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...studentIdProps3} />
                    </FormItem>)
            }
          },
        }, {
          title: '班级',
          dataIndex: 'stuClass',
          key: 'stuClass',
          render: (text,record) => {
            if(record.key==1){
                return(       
                    <FormItem {...formItemLayout}>
                        <Input {...classProps1}/>
                    </FormItem>)
            }
            else if(record.key==2){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...classProps2} />
                    </FormItem>)
            }
            else if(record.key==3){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...classProps3} />
                    </FormItem>)
            }
          },
        }, {
          title: '学院/学校',
          dataIndex: 'stuCollege',
          key: 'stuCollege',
          render: (text,record) => {
            if(record.key==1){
                return(       
                    <FormItem {...formItemLayout}>
                        <Input {...collegeProps1}/>
                    </FormItem>)
            }
            else if(record.key==2){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...collegeProps2} />
                    </FormItem>)
            }
            else if(record.key==3){
                return(       
                    <FormItem {...formItemLayout} >
                        <Input {...collegeProps3} />
                    </FormItem>)
            }
          },
        }, {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          render: (text,record) => {
            if(record.key==1){
                return(       
                    <FormItem {...formItemLayout}>
                        <Select style={{ width: 50 }} defaultValue="男" onChange={this.handleSexChange1.bind(this)}>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>                            
                        </Select>
                    </FormItem>)
            }
            else  if(record.key==2){
                return(       
                    <FormItem {...formItemLayout}>
                        <Select style={{ width: 50 }} defaultValue="男" onChange={this.handleSexChange2.bind(this)}>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>                            
                        </Select>
                    </FormItem>)
            }
            else  if(record.key==3){
                return(       
                    <FormItem {...formItemLayout}>
                        <Select style={{ width: 50 }} defaultValue="男" onChange={this.handleSexChange3.bind(this)}>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>                            
                        </Select>
                    </FormItem>)
            }
          },
        }, {
          title: '衣服尺寸',
          dataIndex: 'size',
          key: 'size',
          render: (text,record) => {
            if(record.key==1){
                return(
                    <FormItem {...formItemLayout}>       
                        <Select style={{ width: 70 }} defaultValue="M" onChange={this.handleSelectChange1.bind(this)}>
                            <Select.Option value="S">S</Select.Option>
                            <Select.Option value="M">M</Select.Option>
                            <Select.Option value="L">L</Select.Option>
                            <Select.Option value="XL">XL</Select.Option>
                            <Select.Option value="XXL">XXL</Select.Option>
                            <Select.Option value="XXXL">XXXL</Select.Option>                                
                         </Select>
                     </FormItem>)
            }
            else if(record.key==2){
                return(
                    <FormItem {...formItemLayout}>       
                        <Select style={{ width: 70 }} defaultValue="M" onChange={this.handleSelectChange2.bind(this)}>
                            <Select.Option value="S">S</Select.Option>
                            <Select.Option value="M">M</Select.Option>
                            <Select.Option value="L">L</Select.Option>
                            <Select.Option value="XL">XL</Select.Option>
                            <Select.Option value="XXL">XXL</Select.Option>
                            <Select.Option value="XXXL">XXXL</Select.Option>                                
                         </Select>
                     </FormItem>)
            }
            else if(record.key==3){
                return(
                    <FormItem {...formItemLayout}>       
                        <Select style={{ width: 70 }} defaultValue="M" onChange={this.handleSelectChange3.bind(this)}>
                            <Select.Option value="S">S</Select.Option>
                            <Select.Option value="M">M</Select.Option>
                            <Select.Option value="L">L</Select.Option>
                            <Select.Option value="XL">XL</Select.Option>
                            <Select.Option value="XXL">XXL</Select.Option>
                            <Select.Option value="XXXL">XXXL</Select.Option>                                
                         </Select>
                     </FormItem>)
            }
          },
        }, {
          title: '联系方式',
          dataIndex: 'stuPhone',
          key: 'stuPhone',
          render: (text,record) => {
            if(record.key==1){
                return(       
                    <FormItem {...formItemLayout}>
                        <Input {...phoneProps1}/>
                    </FormItem>)
            }
            else{
                return <p>/</p>
            }
          },
        }];

        const data = [{
          key: '1',
        }, {
          key: '2',
        }, {
          key: '3',
        }];
        return (
            <div className="col-20 col-offset-2" styleName="reg" ref="myRef">
				<div className="col-20 col-offset-1" styleName="reg_content">
					<p styleName="reg_tip">组队信息</p>
					<Form inline form={this.props.form}>
				    	<div className="col-22 col-offset-1" styleName="reg_team">
				    		<FormItem label="队伍名:" {...formItemLayout} hasFeedback style={{'marginRight':250,'marginLeft':30}}>
      							<Input {...teamNameProps}/>
    						</FormItem>
                            <FormItem label="指导老师:" {...formItemLayout} hasFeedback>
                                <Input {...teacherProps}/>
                            </FormItem>
				    	</div>
				    	<div className="col-22 col-offset-1" styleName="reg_form">
                            <Table columns={columns} dataSource={data} pagination={false}/> 
				    	</div>
				    	<div className="col-3 col-offset-20" styleName="reg_submit">
					    	<FormItem>
				     		   <Button type="primary" htmlType='submit' onClick={this.handleSubmit.bind(this)}>提交</Button>
				     		</FormItem>
			     		</div>
				    </Form>
			    </div>
			</div>
        );
    };
}

ContestReg = createForm()(ContestReg);