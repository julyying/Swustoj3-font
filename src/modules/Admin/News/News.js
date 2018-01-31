import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    getNews
} from '../../../actions/news';
import CSSModules from 'react-css-modules';
import {
    Form,
    Button,
    Icon,
    Input,
    Select,
    Table,
    Modal,
    message
} from 'antd';
import styles from './styles.scss';
import {
    toQuery,
    handleError,
    timeFormat
} from '../../../utils/utils';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(state => ({
    news: state.news
}))
@CSSModules(styles)
export default class AdminNews extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getNews(toQuery({
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
        this.props.dispatch(getNews(toQuery(config)));
    }

    handleModalShow(id) {
        this.setState({
            ...this.state,
            modalVisable: true
        });
        // this.props.dispatch(getAbout(toQuery({
        //     ids: id,
        //     page: 1,
        //     rows: 1
        // })));
    }

    handleSubmit() {

    }

    handleAddNew() {}

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            key: 'title',
            render: (text, record) => (
                <a onClick={this.handleModalShow.bind(this, record.id)}>{record.title}</a>
            )
        }, {
            title: '浏览数',
            dataIndex: 'viewNum',
            key: 'viewNum'
        }, {
            title: '发布时间',
            key: 'pubTime',
            render: (text, record) => (
                <span>{timeFormat(record.pubTime)}</span>
            )
        }];

        let pageConfig = {
            rows: 10
        };

        pageConfig[this.state.searchType] = this.state.searchText;
        const news = this.props.news && this.props.news.news;

        const dataSource = news && news.map(item => ({...item,
            key: item.id
        }));

        const pagination = {
            total: this.props.news && this.props.news.total,
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