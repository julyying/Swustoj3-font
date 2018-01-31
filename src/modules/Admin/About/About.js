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
    message
} from 'antd';
import {
    getAbout
} from '../../../actions/about';
import {
    getAbouts
} from '../../../actions/abouts';
import CSSModules from 'react-css-modules';
import {
    Form,
    Button,
    Icon,
    Input,
    Select
} from 'antd';
import styles from './styles.scss';
import {
    toQuery,
    handleError
} from '../../../utils/utils';

import Editor from '../../../components/Editor/Editor';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const rows = 10;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(state => ({
    about: state.about,
    abouts: state.abouts
}))
@CSSModules(styles)
export default class AdminAbout extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getAbouts(toQuery({
            rows: 10,
            page: 1
        })));
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'aboutName',
            page: 1,
            selectedKeys: '',
            modalVisable: false
        };
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
        this.props.dispatch(getAbouts(toQuery(config)));
    }

    handleModalShow(id) {
        this.setState({
            ...this.state,
            modalVisable: true
        });
        this.props.dispatch(getAbout(toQuery({
            ids: id,
            page: 1,
            rows: 1
        })));
    }

    handleSubmit() {
        const form = this.refs.form;
        let formData = form.getFieldsValue();
        // 处理editor 因为editor为Simditor封装 
        // 无法直接触发onChange事件(会造成循环更新)
        // 故在此同步富文本编辑器的内容到需要提交的表单中
        for (let name in form.fields) {
            if (!(form.fields[name].instance instanceof Editor)) continue;
            formData[name] = form.fields[name].instance.value;
        }
        formData['tags'] = formData['tags'] && formData['tags'].join(',') || '';

        addProblem(formData).then((res) => {
            handleError(res.data, () => {
                message.success('添加题目成功！');
                this.refs.modal.destroy();
            });
        });
    }

    handleAddNew() {}

    render() {
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
        };
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            dataIndex: 'aboutTitle',
            key: 'aboutTitle',
            render: (text, record) => (
                <a onClick={this.handleModalShow.bind(this, record.id)}>{record.aboutTitle}</a>
            )
        }];

        let pageConfig = {
            rows: rows
        };
        pageConfig[this.state.searchType] = this.state.searchText;
        const abouts = this.props.abouts && this.props.abouts.about;

        const dataSource = abouts && abouts.map(item => ({...item,
            key: item.id
        }));

        const pagination = {
            total: this.props.abouts.total,
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


                <InputGroup styleName="searchbar">
                    <div styleName="wrapper">
                        <Select defaultValue="aboutName" styleName="select" onSelect={ this.handleSearchType.bind(this) }>
                            <Option value="aboutName">标题</Option>
                        </Select>
                    </div>
                    <Input styleName="input" onChange={ this.handleSearchText.bind(this) } onPressEnter={ this.handleSearch.bind(this) } />
                    <div styleName="wrapper">
                        <Button icon="search" styleName="btn" onClick={ this.handleSearch.bind(this) } />
                    </div>
                </InputGroup>

                <Button styleName="toolbar" size="large" onClick={this.handleAddNew.bind(this)}>
                    添加
                    <Icon type="plus-circle-o" />
                </Button>

                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
                <Modal title="修改标签" visible={this.state.modalVisable}
                    onCancel={()=> {this.setState({...this.state, 'modalVisable': false}); }}
                    width={800} okText="修改" onOk = {this.handleSubmit.bind(this)} ref="modal"
                >
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="标题："
                        >
                            <Input value = {this.props.about && this.props.about.aboutTitle} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}