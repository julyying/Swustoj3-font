import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Table,
    Modal,
    message,
    DatePicker,
    Switch, 
    Icon,
    Form,
    Button,
    Input,
    Select
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const rows = 10;
const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

@CSSModules(styles)
export default class AdminClasses extends React.Component {
    handleAddClass() {}

    render() {
        let pageConfig = {
            rows: 10
        };
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }];
        const dataSource = [];
        const pagination = {
            total: 10,
            onChange: function(cur) {
                this.setState({
                    ...this.state,
                    page: cur
                });
                pageConfig['page'] = cur;
                this.props.dispatch(getAbouts(toQuery(pageConfig)));
            }.bind(this)
        };
        return (
            <div className="ant-layout-content" styleName="wrapper">
                <Button styleName="toolbar" size="large" onClick={this.handleAddClass.bind(this)}>
                        添加
                    <Icon type="plus-circle-o" />
                </Button>
                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
        );
    }
}