import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import { Form, Input, Select, Checkbox, Radio, Button, Icon, Tooltip } from 'antd';
import Editor from '../Editor/Editor';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;

// 配置Form 数据格式不符合接口要求 做适配
const options = {
    mapPropsToFields: function(props) {
        let problem = props.problem || {};
        return {
            title: {
                value: problem.title || ''
            },
            timeLimit: {
                value: problem.timeLimit || ''
            },
            memoryLimit: {
                value: problem.memoryLimit || ''
            },
            type: {
                value: problem.type || ''
            },
            description: {
                value: problem.description || ''
            },
            input: {
                value: problem.input || ''
            },
            output: {
                value: problem.output || ''
            },
            sampleInput: {
                value: problem.sampleInput || ''
            },
            sampleOutput: {
                value: problem.sampleOutput || ''
            },
            frameSource: {
                value: problem.frameSource || ''
            },
            source: {
                value: problem.source || ''
            },
            tags: {
                value: problem.tags && problem.tags.split(',').map((item) => item.trim())
            }
        };
    },
    // onFieldsChange(props, fields) {
    //     console.log(props, fields);
    // }
};

class AdminProblemForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tags = this.props.tags.tagss;
        const tagsLength = this.props.tags.total;
        const { getFieldProps } = this.props.form;
        let children = [];
        for (let i = 0; i < tagsLength; i++) {
            children.push(<Option key={ tags[i].tagsId }>{ tags[i].name }</Option>);
        }

        return (
            <Form horizontal onSubmit={ this.onSubmit }>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                >
                    <Input  {...getFieldProps('title')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="时间限制(ms)"
                >
                    <Input {...getFieldProps('timeLimit')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="内存限制(kb)"
                >
                    <Input {...getFieldProps('memoryLimit')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<span>题目类型 <Tooltip title="实验和比赛题目不会显示在题目列表中"><Icon type="question-circle-o" /></Tooltip></span>}
                >
                    <RadioGroup {...getFieldProps('type')} >
                        <Radio value={1}>普通题目</Radio>
                        <Radio value={2}>实验题目</Radio>
                        <Radio value={3}>比赛题目</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="标签"
                >
                    <Select multiple
                        placeholder="请选择标签"
                        {...getFieldProps('tags')}
                    >
                        {children}
                    </Select>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="描述"
                >    
                    <Editor {...getFieldProps('description')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="输入"
                >    
                    <Editor {...getFieldProps('input')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="输出"
                >    
                    <Editor {...getFieldProps('output')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="输入样例"
                >    
                    <Input type="textarea" rows="5" {...getFieldProps('sampleInput')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="输出样例"
                >    
                    <Input type="textarea" rows="5" {...getFieldProps('sampleOutput')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={<span>框架代码 <Tooltip title="默认显示在提交框中的代码 建议只在实验类型的题目中 给出部分代码"><Icon type="question-circle-o" /></Tooltip></span>}
                >    
                    <Input type="textarea" rows="5" {...getFieldProps('frameSource')} />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="题目来源"
                >    
                    <Input {...getFieldProps('source')} />
                </FormItem>

            </Form>
        );
    }
}

export default createForm(options)(AdminProblemForm);