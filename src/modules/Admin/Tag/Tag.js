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
    getAdminTags,
    getAdminTag
} from '../../../actions/tags';
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
    tags: state.tags,
    tag: state.tag
}))
@CSSModules(styles)
export default class AdminTag extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getAdminTags(toQuery({
            page: 1,
            rows: 10
        })));
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'ids',
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
        this.props.dispatch(getAdminTags(toQuery(config)));
    }

    handleModalShow(tagId) {
        console.log('tagid', tagId);
        this.setState({
            ...this.state,
            modalVisable: true
        });
        this.props.dispatch(getAdminTag(toQuery({
            tagsIds: tagId,
            page: 1,
            rows: 1
        })));
    }

    handleSubmit() {

        // addProblem(formData).then((res) => {
        //     handleError(res.data, () => {
        //         message.success('添加题目成功！');
        //         this.refs.modal.destroy();
        //     });
        // });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const columns = [{
            title: 'ID',
            dataIndex: 'tagsId',
            key: 'tagsId',
        }, {
            title: '标签名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <a onClick={this.handleModalShow.bind(this, record.tagsId)}>{record.name}</a>
            )
        }];

        let pageConfig = {
            rows: rows
        };
        pageConfig[this.state.searchType] = this.state.searchText;
        const tags = this.props.tags && this.props.tags.tagss;
        const dataSource = tags && tags.map(item => ({...item,
            key: item.tagsId
        }));
        const pagination = {
            total: this.props.tags.total,
            onChange: function(cur) {
                this.setState({
                    ...this.state,
                    page: cur
                });
                pageConfig['page'] = cur;
                this.props.dispatch(getAdminTags(toQuery(pageConfig)));
            }.bind(this)
        };
        return (
            <div className="ant-layout-content" styleName="wrapper">


                <InputGroup styleName="searchbar">
                    <div styleName="wrapper">
                        <Select defaultValue="tagsIds" styleName="select" onSelect={ this.handleSearchType.bind(this) }>
                            <Option value="tagsIds">标签ID</Option>
                            <Option value="tagsName">标签名</Option>
                        </Select>
                    </div>
                    <Input styleName="input" onChange={ this.handleSearchText.bind(this) } onPressEnter={ this.handleSearch.bind(this) } />
                    <div styleName="wrapper">
                        <Button icon="search" styleName="btn" onClick={ this.handleSearch.bind(this) } />
                    </div>
                </InputGroup>

                
                <Button styleName="toolbar" size="large" onClick={this.handleModalShow.bind(this)}>
                    添加
                    <Icon type="plus-circle-o" />
                </Button>

                <Table columns={columns} dataSource={dataSource} pagination={pagination} />
                <Modal title="标签" visible={this.state.modalVisable}
                    onCancel={()=> this.setState({...this.state, 'modalVisable': false})}
                    width={800} okText="修改" onOk = {this.handleSubmit.bind(this)} ref="modal"
                >
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="标签名："
                        >
                            <Input defaultValue = {this.props.tag && this.props.tag.tag.name} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}