import React from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    Table
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
    toQuery,
    timeFormat
} from '../../utils/utils';
import {
    getNews
} from '../../actions/news';
import classNames from 'classnames';
const rows = 10;
@CSSModules(styles)
@connect(state => ({
    news: state.news
}))
export default class News extends React.Component {
    constructor() {
        super();
        this.state = {
            total: ''
        };
    };
    componentDidMount() {
        this.props.dispatch(getNews(toQuery({
            rows: 10,
            page: 1,
        }))).then(() => {
            //debugger;
            this.setState({
                total: this.props.news.total
            })
        });
    }
    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (<Link to={`/article/${record.id}`}>{record.id}</Link>)
        }, {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (<Link to={`/article/${record.id}`}>{record.title}</Link>)
        }, {
            title: '发布人',
            dataIndex: 'publisher',
            key: 'publisher'
        }, {
            title: '发布时间',
            dataIndex: 'pubTime',
            key: 'pubTime',
            render: (pubTime) => (
                <span>{timeFormat(pubTime)}</span>
            )
        }];
        let pageConfig = {
            rows: rows,
            page: 1
        };
        const pagination = {
            total: this.state.total,
            onChange: function(cur) {
                pageConfig.page = cur;
                this.props.dispatch(getNews(toQuery(pageConfig)));
            }.bind(this)
        };
        let data = [];
        if (!!this.props.news.news) {
            data = this.props.news.news.map(item => ({...item,
                key: item.id
            }));
        }
        return (
            <div className="col-22 col-offset-1" styleName="news_top">		    
		       <Table columns={columns} dataSource={data} pagination={pagination}/>		   
			</div>
        );
    };
}