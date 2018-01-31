import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    getscrollpicture,
    addScrollPicture,
    updateScrollPicture
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
    message,
    Upload
} from 'antd';
import styles from './styles.scss';
import {
    toQuery,
    handleError
} from '../../../utils/utils';
import configs from '../../../constants/configs';

const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(state => ({
    news: state.news
}))
@CSSModules(styles)
export default class AdminPicture extends React.Component {
    static fillStore(redux, props) {
        redux.dispatch(getscrollpicture(toQuery({
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
            modalVisable: false,
            curNews: {
            },
            fileList: [{
            }]
        };
    }

    handleChange(type, value) {
        let _curNews = Object.assign({}, this.state.curNews);
        type === "active" 
            ? _curNews[type] = value
            : _curNews[type] = value.target.value;
        this.setState({
            ...this.state,
            curNews: _curNews
        });
    }

    handleModalShow(id) {
        let _curNews = {};
        this.props.news && this.props.news.picture.forEach((item) => {
            if(item.id === id) {
                _curNews = item;
            }
        });
        this.setState({
            ...this.state,
            modalVisable: true,
            curNews: _curNews,
            fileList: [{
                url: _curNews.picUrl && (configs.imgUrl + _curNews.picUrl) || configs.defaultImg,
                status: 'done'
            }]
        });
    }

    handleSubmit() {

        if(this.state.curNews.id) {
            this.props.dispatch(updateScrollPicture(this.state.curNews));
        } else {
            this.props.dispatch(addScrollPicture({
                ...this.state.curNews,
                picUrl: configs.defaultImg
            }));
        }
    }

    render() {
        let headers = {};
        if (!!localStorage.token) {
            var token = localStorage.token;
            headers = {
                'Authorization': `Bearer ${token}`
            };
        }
        const configsUrl = configs.baseUrl;
        let UploadSettings = {
            action: configsUrl + '/file.do',
            listType: 'picture-card',
            headers: headers,
            fileList: this.state.fileList,
            ref: 'scroll',
            onChange: (info) => {
                console.log('info', info);
                
                if(info.file.status === 'done' && info.file.response.code === "SUCCESS") {
                    let _fileList = Object.assign([], info.fileList);
                     _fileList.shift();
                     console.log('fileList', _fileList, info.file.response.data.file[0].url);
                    this.setState({
                        ...this.state,
                        curNews: {
                            ...this.state.curNews,
                            picUrl: info.file.response.data.file[0].url
                        },
                        fileList: _fileList
                    });
                } else if(info.file.status === 'error') {
                    message.error('上传失败');
                }
            }
        };

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
            dataIndex: 'newsTitle',
            key: 'newsTitle',
            render: (text, record) => (
                <a onClick={this.handleModalShow.bind(this, record.id)}>{record.newsTitle}</a>
            )
        }, {
            title: '显示',
            dataIndex: 'active',
            key: 'active',
            render: (text, record) => (
                <span>{record.active === 1 ? '是' : '否'}</span>
            )
        }];

        const news = this.props.news && this.props.news.picture;

        const dataSource = news && news.map(item => ({...item,
            key: item.id
        }));

        return (
            <div className="ant-layout-content" styleName="wrapper">

                <Button styleName="toolbar" size="large" onClick={this.handleModalShow.bind(this)}>
                    添加
                    <Icon type="plus-circle-o" />
                </Button>

                <Table columns={columns} dataSource={dataSource} pagination={false}/>
                <Modal title="轮播图" visible={this.state.modalVisable}
                    onCancel={()=> {this.setState({...this.state, 'modalVisable': false}); }}
                    width={800} okText="确定" onOk = {this.handleSubmit.bind(this)} ref="modal"
                >
                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="标题："
                        >
                            <Input value = {this.state.curNews && this.state.curNews.newsTitle} onChange={ this.handleChange.bind(this, 'newsTitle') } />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述："
                        >
                            <Input value = {this.state.curNews && this.state.curNews.newsDesc} onChange={ this.handleChange.bind(this, 'newsDesc') } />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="新闻链接："
                        >
                            <Input value = {this.state.curNews && this.state.curNews.newsUrl} onChange={ this.handleChange.bind(this, 'newsUrl') } />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="显示："
                        >
                            <Select value={this.state.curNews && this.state.curNews.active} styleName="select" onSelect={ this.handleChange.bind(this, 'active') }>
                                <Option value={1}>是</Option>
                                <Option value={0}>否</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="图片："
                        >
                            <Upload {...UploadSettings}>
                                <Icon type="plus" />
                                <div className="ant-upload-text">上传照片</div>
                            </Upload>

                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}