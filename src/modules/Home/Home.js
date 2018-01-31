import React, {
	PropTypes
} from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Carousel,
	Tabs,
	Icon,
	Button,
	Table,
	Col,
	Row
} from 'antd';
import {
	getNews,
	getscrollpicture,
	getNewestNewsroll
} from '../../actions/news';
import {
	getUsers,
	getUsersByTime
} from '../../actions/ranklist';
import {
	getDaySubmit,
	getAllSubmit,
	getAllProblem,
	getallusernum,
	getonlinenum
} from '../../actions/status';
import customStyles from './custom.css';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../utils/utils';
import configsSource from '../../constants/configsSource';
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

//const rows = 10;
const baseUrl = configsSource.baseUrl;

@connect(state => ({
	users: state.users,
	status: state.status,
	news: state.news
}))
@CSSModules(styles)
export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			value:4,
			timeType: '',
			daysubmit: 0,
			dayacnum: 0,
			allsubmit: 0,
			allproblem: 0,
			newestNews:'',
			onlinenum:0,
			allusernum:0,
			 isMounted: false,
			 btn1: 'ghost',
			btn2: 'ghost',
			btn3: 'ghost',
			btn4: 'primary',
		}
	};

	componentDidMount() {
		//debugger;
		this.state.isMounted = true;

		let configs = {
			timeType: 1,
			rows: 10,
			page: 1,
		}
		this.props.dispatch(getUsersByTime(toQuery(configs)));
		this.props.dispatch(getDaySubmit(toQuery({
			status: 1
		}))).then(() => {

			if (!!this.props.status.data) {
				if (this.state.isMounted) {
					this.setState({
						dayacnum: this.props.status.data
					});
				}

			}
		});
		this.props.dispatch(getDaySubmit(toQuery({
			status: 0
		}))).then(() => {
			//debugger;
			if (!!this.props.status.data) {
				if (this.state.isMounted) {
					this.setState({
						daysubmit: this.props.status.data
					});
				}

			}
		});
		this.props.dispatch(getAllSubmit(toQuery({
			status: ''
		}))).then(() => {
			//debugger;
			if (!!this.props.status.data) {
				if (this.state.isMounted) {
					this.setState({
						allsubmit: this.props.status.data
					});
				}

			}

		});
		this.props.dispatch(getallusernum(toQuery({
			status: ''
		}))).then(() => {
			//debugger;
			if (!!this.props.status.data) {
				if (this.state.isMounted) {
					this.setState({
						allusernum: this.props.status.data.obj
					});
				}

			}

		});
		this.props.dispatch(getonlinenum(toQuery({}))).then(() => {
			//debugger;
			if (!!this.props.status.data) {
				if (this.state.isMounted) {
					this.setState({
						onlinenum: this.props.status.data
					});
				}

			}
		});
		this.props.dispatch(getAllProblem(toQuery({
			status: ''
		}))).then(() => {
			//debugger;
			if (!!this.props.status.data) {
				if (this.state.isMounted) {
					this.setState({
						allproblem: this.props.status.data
					});
				}

			}

		});
		this.props.dispatch(getNews(toQuery({
			rows: 3,
			page: 1,
			isFilterHtmlTag: true
		}))).then(() => {});
		this.props.dispatch(getscrollpicture(toQuery({
			rows: 3,
			page: 1,
			active: 1
		})));
	};
	componentWillUnmount() {
		this.state.isMounted = false
	}
	handleChooseTime(value) {
		value = value.substr(2);
		this.setState({
			...this.state,
			timeType: value,
		});
		let config = {
			timeType: value,
			rows: 10,
			page: 1,
		}

		if (!!value) {
			this.props.dispatch(getUsersByTime(toQuery(config)));
		} else {
			let config = {
				rows: 10,
				page: 1,
				sortByAcNum: true,
			}
			this.props.dispatch(getUsers(toQuery(config)));
		}
		this.setState({
			btn1: 'ghost',
			btn2: 'ghost',
			btn3: 'ghost',
			btn4: 'ghost',
		});
		if (value === 1) {
			this.setState({
				btn1: 'primary',
			});
		} else if (value === 2) {
			this.setState({
				btn2: 'primary',
			});
		} else if (value === 3) {
			this.setState({
				btn3: 'primary',
			});
		} else {
			this.setState({
				btn4: 'primary',
			});
		}
	}
	render() {
		const columns = [{
			title: '排名',
			dataIndex: 'rank',
			key: 'rank',

		}, {
			title: '头像',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (text, record) => ( < img styleName = 'facePhoto'
				src = {
					baseUrl + record.avatar
				}
				alt = "头像" / >
			)
		}, {
			title: '用户名',
			dataIndex: 'username',
			key: 'username',
			render: (text, record) => (<Link to={`/ranklist/${record.id}/${record.username}`}>{record.username}</Link>)

		}, {
			title: 'AC数',
			dataIndex: 'acNum',
			key: 'acNum',
		}];

		let Road = () => {
			if (!!this.props.news.news) {
				let road = [];
				this.props.news.news.map((item, index) => {
					var str = item.content;
					str = str.replace(/&nbsp;/g, '');
					road.push(
						<div styleName="news_num" key={index+1}>
				    	 	<div styleName="tittle"><Link to={`/article/${item.id}`}>{item.title}</Link></div>
				    	 	<div styleName='pic'><img src = {item.picUrl}/></div>
				    	 	<div styleName="content"><p>{str}</p></div>
				        </div>
					);
				});
				return (
					<div>
        				{road}
        			</div>

				);
			}
		};
		let road = [];
		if (!!this.props.news.picture) {

			this.props.news.picture.map((item, index) => {
				var str = item.newsDesc;
				str = str.replace(/&nbsp;/g, '');
				str = str.substr(0, 200) + '...';
				road.push(
					<div styleName="lunbo" key={index}>
    				 	<img src={baseUrl + item.picUrl} />
    					 <div styleName="carousel-caption">
    						 <p styleName="content"><a href={item.newsUrl}>{item.newsTitle}</a></p>
    						 <p styleName="content">{str}</p>
						 </div>
					 </div>
				)
			});
		};

		const dataSource = this.props.users.users.map(item => ({...item,
			key: item.id
		}));
		return (
			<div className="col-22 col-offset-1">

	           {/* <div styleName="home_top">
	            </div>*/}
                <Carousel autoplay >

				  {road}

				</Carousel>
				<div styleName="conformation">
					<div className="col-3" styleName="status">
						<p styleName="icon"><Icon type="user"  /></p>
						<p styleName="num">{this.state.onlinenum}</p><br/>
						<p styleName="tit">在线人数</p>
					</div>
					<div className="col-3 col-offset-1" styleName="status">
						<p styleName="icon"><Icon type="line-chart" /></p>
						<p styleName="num">{this.state.daysubmit}</p><br/>
						<p styleName="tit">日提交量</p>
					</div>
					<div className="col-3 col-offset-1" styleName="status">
						<p styleName="icon"><Icon type="edit" /></p>
						<p styleName="num">{this.state.dayacnum}</p><br/>
						<p styleName="tit">今日AC数</p>
					</div>
					<div className="col-3 col-offset-1" styleName="status">
						<p styleName="icon"><Icon type="team" /></p>
						<p styleName="num">{this.state.allusernum}</p><br/>
						<p styleName="tit">用户总数</p>
					</div>
					<div className="col-3 col-offset-1" styleName="status">
						<p styleName="icon"><Icon type="folder" /></p>
						<p styleName="num">{this.state.allproblem}</p><br/>
						<p styleName="tit">题目总数</p>
					</div>
					<div className="col-3 col-offset-1" styleName="status">
						<p styleName="icon"><Icon type="file-text" /></p>
						<p styleName="num">{parseInt(this.state.allsubmit/1000)}k</p><br/>
						<p styleName="tit">总提交量</p>
					</div>
				</div> 

				<div className="col-11" styleName="news">

				     {Road()}	     				     

				     <Link to="/news"><Button type="primary" className="col-4 col-offset-20">更多&nbsp;&nbsp;<span><Icon type="double-right" /></span></Button>	</Link>		     

				</div>

				<div className="col-12 col-offset-1" styleName="ranking"> 
					    <Tabs  type="card" onChange={this.handleChooseTime.bind(this)} defaultActiveKey=".$1">
						    <TabPane tab="日" key="1"><Table columns={columns} dataSource={dataSource} pagination={false} size="small" styleName="top" /></TabPane>
						    <TabPane tab="周" key="2"><Table columns={columns} dataSource={dataSource} pagination={false} size="small" styleName="top" /></TabPane>
						    <TabPane tab="月" key="3"><Table columns={columns} dataSource={dataSource} pagination={false} size="small" styleName="top" /></TabPane>
						    <TabPane tab="所有" key=""><Table columns={columns} dataSource={dataSource} pagination={false} size="small" styleName="top" /></TabPane>
						</Tabs>
				</div>


			</div>
		);
	}
}