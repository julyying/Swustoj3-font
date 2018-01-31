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
import {
	getContestNews,
} from '../../actions/news';
import classNames from 'classnames';
@connect(state => ({
	news:state.news,
}))
@CSSModules(styles)
export default class ContestRegister extends React.Component {
	constructor(props){
		super(props);
		this.state={
			contestNews:'',
		}
	};
    componentDidMount(){
		this.props.dispatch(getContestNews(toQuery({
			page:1,
			rows:10,
			id:this.props.params.id
		}))).then(() => {
			if(!!this.props.news.contestNews){
				this.setState({
					contestNews:this.props.news.contestNews.pagingList[0],
				});
			}
		});
    };
	render(){
		let url=this.props.params.id;
		return(
			<div className="col-22 col-offset-1" styleName="article" ref="myRef">
				<div className="col-18 col-offset-3" styleName="news_content">
				   <div styleName="article_tittle">
				   {this.state.contestNews.title}
				   </div>
				   <div className="col-22 col-offset-1">
				   <div styleName="article_content" dangerouslySetInnerHTML={{__html: this.state.contestNews.description}}></div>
				   </div>
				   <div className="col-22 col-offset-1">
		     		   <Link to={`/register/reg/${url}`}><Button type="ghost" styleName="btn1">注册入口</Button></Link>
		     		   <Link to={`/register/list/${url}`}><Button type="ghost" styleName="btn2">比赛名单</Button></Link>
				   </div>
			    </div>
			</div>
			);
	};
}