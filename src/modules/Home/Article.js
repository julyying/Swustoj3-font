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
	Tag,
	Col,
	Row,
	Menu,
	Breadcrumb,
	Icon,
	Tabs,
	Button
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery,
	timeFormat
} from '../../utils/utils';
import classNames from 'classnames';
import {
	getNews
} from '../../actions/news';
import {
	ArticleToRegister
} from '../../actions/jumpPage';
@connect(state => ({
	news:state.news,
	params2:state.params
}))
@CSSModules(styles)
export default class News extends React.Component {
	constructor(props){
		super(props);
		this.state={
			news:'',
			new:'',
		}
	};
    componentDidMount(){
		this.props.dispatch(getNews(toQuery({
			rows: 10,
			page: 1,
		}))).then(() => {
			this.setState({
				news:this.props.news.news
			});
		});

		this.props.dispatch(getNews(toQuery({
			rows: 1,
			page: 1,
			id:this.props.params.id
		}))).then(() => {
			//debugger;
			this.setState({
				new:this.props.news.news[0]
			});
		});
    };
    handleClick(url){
    	hashHistory.push(`/article/${url}`);
    	this.props.dispatch(getNews(toQuery({
			rows: 1,
			page: 1,
			id:url
		}))).then(() => {
			//debugger;
			this.setState({
				new:this.props.news.news[0]
			});
		});
    }
    componentWillUnmount(){
    }
	render(){
		let rightNews=[];
		if (!!this.state.news) {
			this.state.news.map((item, index) => {
				rightNews.push(
					<Link key={index}>
							<p styleName="list_margin" onClick={this.handleClick.bind(this,item.id)}>
								<Icon type="arrow-right" />{item.title}
							</p>
				    </Link>
				);
			});
		}
		return(
			<div className="col-22 col-offset-1" styleName="article" ref="myRef">
				<div className="col-18" styleName="news_content">
				   <div styleName="article_tittle">
				   {this.state.new.title}
				   </div>
				  
				   <div className="col-8 " styleName="article_status">Publisher : <span>{this.state.new.publisher}</span></div>
				   <div className="col-8 " styleName="article_status">Time:<span>{timeFormat(this.state.new.pubTime)}</span></div>
				   <div className="col-8 " styleName="article_status">Pv:<span>{this.state.new.viewNum}</span></div>
				   <div className="col-22 col-offset-1">
				   <div styleName="article_content" dangerouslySetInnerHTML={{__html: this.state.new.content}}></div>
				   </div>
				   <div className="col-2 col-offset-21" styleName="go_back">
		     		   <Link to="/news"><Button type="primary">返回</Button></Link>
				   </div>
			   </div>

			    <div className="col-5 col-offset-1">
			        <div styleName="right_tittle">
			            <p styleName="tittle">最新信息</p>
			        </div>
			        <div styleName="news_list">
			            {rightNews}
			        </div>
			    </div>
			</div>
			);
	};
}