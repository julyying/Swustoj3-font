import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getProblem, updateProblem } from '../../../../actions/problems';
import { getTags } from '../../../../actions/tags';
import CSSModules from 'react-css-modules';
import { Button, Icon } from 'antd';
import styles from './styles.scss';
import Editor from '../../../../components/Editor/Editor';
import { toQuery } from '../../../../utils/utils';
import AdminProblemForm from '../../../../components/AdminProblemForm/AdminProblemForm';

const ButtonGroup = Button.Group;

@connect(state => ({
  problem: state.problem,
  tags: state.tags
}))
@CSSModules(styles)
export default class AdminProblemEdit extends React.Component {

    static fillStore(redux, props) {
        redux.dispatch(getProblem(props.params.id));
        // redux.dispatch(getTags());
    };

    onSubmit() {
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
        formData['id'] = this.props.params.id;
        this.props.dispatch(updateProblem(formData));
    }

    render() {
        return (
            <div className="ant-layout-content" styleName="wrapper">
                <ButtonGroup styleName="toolbar" size="large">
                    <Button onClick={ this.onSubmit.bind(this) }>
                        提交
                        <Icon type="check" />
                    </Button>
                </ButtonGroup>
                {
                        this.props.problem
                            ? <AdminProblemForm problem={ this.props.problem }  tags={this.props.tags} ref="form"/>
                            : null
                }
            </div>
        );
    }
}